import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 파일(이미지)을 Base64 문자열로 변환하는 헬퍼 함수
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Zustand 스토어 생성
const useProductStore = create(
  persist(
    (set, get) => ({
      // --- 기본 정보 ---
      productName: '',
      mainImage: null,
      category: '',
      marketName: '새벽들딸기농원',
      farmerName: '김준식',
      career: '',
      cultivationMethod: '',

      // --- 상세 정보 (4가지 주제) ---
      details: [
        // 재배환경 소개
        {
          id: 1,
          title: '',
          content: '',
          image: null,
          placeholder: {
            title: '우리 상품이 자라는 곳이에요',
            content: '충남 논산의 기름진 땅에서, 따스한 햇살을 받으며 자랍니다.',
          },
        },
        // 재배 방식/철학
        {
          id: 2,
          title: '',
          content: '',
          image: null,
          placeholder: {
            title: '이렇게 정성껏 키우고 있어요',
            content: '농약 대신 천연 미생물을 사용하고, 매일 새벽 밭을 살피며 최상의 상태를 유지합니다.',
          },
        },
        // 선별 및 관리 방식
        {
          id: 3,
          title: '',
          content: '',
          image: null,
          placeholder: {
            title: '하나하나 꼼꼼히 살펴요',
            content: '당일 수확한 딸기 중 가장 신선하고 상태 좋은 것들만 직접 손으로 선별합니다.',
          },
        },
        // 포장 및 배송 안내
        {
          id: 4,
          title: '',
          content: '',
          image: null,
          placeholder: {
            title: '안전하게 포장해 보내드려요',
            content: '아이스팩과 완충재로 이중 포장하여, 집에서도 밭에서 막 딴 것처럼 받아보실 수 있습니다.',
          },
        },
      ],

      // --- 가격 및 옵션 ---
      options: [{ name: '', value: '', price: '' }],
      discount: '',

      // --- 액션 함수들 ---
      setData: (data) =>
        set((state) => {
          // 변경된 필드만 반영(shallow 비교)
          const newState = { ...state, ...data };
          // if (!isEqual(state, newState)) return newState;
          if (JSON.stringify(state) !== JSON.stringify(newState)) return newState;
          return state;
        }),
      setMainImage: async (file) => {
        // if (file) set({ mainImage: await toBase64(file) });
        if (!file) return;
        const base64 = await toBase64(file);
        const current = get().mainImage;
        if (current !== base64) set({ mainImage: base64 });
      },
      setDetailField: (index, field, value) =>
        set((state) => {
          const newDetails = [...state.details];
          if (newDetails[index][field] === value) return state; // 변화 없으면 skip
          newDetails[index][field] = value;
          return { details: newDetails };
        }),
      setDetailImage: async (index, file) => {
        if (!file) return;
        const base64Image = await toBase64(file);
        set((state) => {
          const newDetails = [...state.details];
          if (newDetails[index].image === base64Image) return state;
          newDetails[index].image = base64Image;
          return { details: newDetails };
        });
      },
      addOption: () => set((state) => ({ options: [...state.options, { name: '', value: '', price: '' }] })),
      updateOption: (index, field, value) =>
        set((state) => {
          const newOptions = [...state.options];
          newOptions[index][field] = value;
          return { options: newOptions };
        }),
      removeOption: (index) => set((state) => ({ options: state.options.filter((_, i) => i !== index) })),
      reset: () =>
        set({
          productName: '',
          mainImage: null,
          category: '',
          career: '',
          cultivationMethod: '',
          details: [
            {
              id: 1,
              title: '',
              content: '',
              image: null,
              placeholder: {
                title: '우리 상품이 자라는 곳이에요',
                content: '충남 논산의 기름진 땅에서, 따스한 햇살을 받으며 자랍니다.',
              },
            },
            {
              id: 2,
              title: '',
              content: '',
              image: null,
              placeholder: {
                title: '이렇게 정성껏 키우고 있어요',
                content: '농약 대신 천연 미생물을 사용하고, 매일 새벽 밭을 살피며 최상의 상태를 유지합니다.',
              },
            },
            {
              id: 3,
              title: '',
              content: '',
              image: null,
              placeholder: {
                title: '하나하나 꼼꼼히 살펴요',
                content: '당일 수확한 딸기 중 가장 신선하고 상태 좋은 것들만 직접 손으로 선별합니다.',
              },
            },
            {
              id: 4,
              title: '',
              content: '',
              image: null,
              placeholder: {
                title: '안전하게 포장해 보내드려요',
                content: '아이스팩과 완충재로 이중 포장하여, 집에서도 밭에서 막 딴 것처럼 받아보실 수 있습니다.',
              },
            },
          ],
          options: [{ name: '', value: '', price: '' }],
          discount: '',
        }),
    }),
    { name: 'product-storage' }
  )
);

export default useProductStore;
