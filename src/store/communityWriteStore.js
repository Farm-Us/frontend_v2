// src/store/communityWriteStore.js

import { create } from 'zustand';

// 이미지 파일을 Base64로 변환하는 헬퍼 함수
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const useCommunityWriteStore = create((set) => ({
  title: '',
  content: '',
  images: [],
  taggedProducts: [], // 상품 ID 배열
  taggedProductsData: [], // 실제 상품 데이터 배열
  // category: '공예품',

  setData: (data) => set((state) => ({ ...state, ...data })),

  // ✨ [수정] 비동기 처리가 완료된 후 state를 업데이트하도록 수정
  addImages: async (files) => {
    const imageFiles = Array.from(files);
    if (imageFiles.length === 0) return;

    const currentImages = useCommunityWriteStore.getState().images;
    if (currentImages.length + imageFiles.length > 10) {
      alert('이미지는 최대 10장까지 첨부할 수 있습니다.');
      return;
    }

    // 이미지 용량 제한 (1MB)
    for (let file of imageFiles) {
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 하나의 용량은 최대 1MB까지 허용됩니다.');
        return;
      }
    }

    // Base64 변환을 먼저 완료
    const base64Images = await Promise.all(imageFiles.map((file) => toBase64(file)));

    // 변환된 데이터를 state에 저장
    set((state) => ({ images: [...state.images, ...base64Images] }));
  },

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),

  toggleProductTag: (product) =>
    set((state) => {
      const productId = product?.id || product?.itemId || product;
      const isAlreadyTagged = state.taggedProducts.some((p) => p.id === productId);

      console.log('🏷️ 상품 태그 토글:', {
        productId,
        productName: product?.itemName || product?.name,
        isAlreadyTagged,
        currentTagsCount: state.taggedProducts.length,
      });

      let newTaggedProducts;
      let newTaggedProductsData;

      if (isAlreadyTagged) {
        // 이미 태그된 경우 제거
        newTaggedProducts = state.taggedProducts.filter((p) => p.id !== productId);
        newTaggedProductsData = state.taggedProductsData.filter((p) => p.id !== productId);
        console.log('❌ 상품 태그 제거:', newTaggedProducts.length);
      } else {
        // 태그되지 않은 경우 추가
        // 정규화된 상품 객체 생성
        const normalizedProduct = {
          ...product,
          id: productId, // id 필드 확보
        };
        newTaggedProducts = [...state.taggedProducts, normalizedProduct];
        newTaggedProductsData = [...state.taggedProductsData, normalizedProduct];
        console.log('✅ 상품 태그 추가:', newTaggedProducts.length);
      }

      return {
        taggedProducts: newTaggedProducts,
        taggedProductsData: newTaggedProductsData,
      };
    }),

  // 폼 입력
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),

  // 현재 상태 조회 (디버깅용)
  getPostData: () => {
    const state = useCommunityWriteStore.getState();
    return {
      title: state.title,
      content: state.content,
      itemIds: state.taggedProducts, // 이 형식이 API에 전송됨
      imagesCount: state.images.length,
    };
  },

  // 초기화
  reset: () =>
    set({
      title: '',
      content: '',
      images: [],
      taggedProducts: [],
      taggedProductsData: [],
    }),
}));

export default useCommunityWriteStore;
