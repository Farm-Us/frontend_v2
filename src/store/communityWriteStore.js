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
  taggedProducts: [],
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
      const isAlreadyTagged = state.taggedProducts.some((p) => p === product.id);
      console.log('zustand에서 태그 관련: ', product);
      if (isAlreadyTagged) {
        return { taggedProducts: [...state.taggedProducts] };
      } else {
        return { taggedProducts: [...state.taggedProducts, product?.id] };
      }
    }),

  // 폼 입력
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),

  // 초기화
  reset: () =>
    set({
      title: '',
      content: '',
      images: [],
      taggedProducts: [],
    }),
}));

export default useCommunityWriteStore;
