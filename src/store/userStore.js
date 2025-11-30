import { create } from 'zustand';

// localStorage 키
const SELLER_MODE_KEY = 'farm-us-seller-mode';

// Zustand 스토어 생성
export const useUserStore = create((set) => ({
  // --- 유저정보 ---
  producerId: 1,
  userImage: null,
  userName: '',
  marketName: '',
  farmerName: '',
  career: '',
  isSeller: false,
  role: 'PRODUCER', // 'PRODUCER' 또는 'CONSUMER'
  email: 'provider123@naver.com',

  // --- 액션 함수들 ---
  setUser: (data) =>
    set({
      userImage: data.userImage,
      userName: data?.userName,
      isSeller: false,
    }),
  setSeller: (data) =>
    set({
      userImage: data.userImage,
      userName: data?.userName,
      marketName: data?.marketName,
      farmerName: data?.farmerName,
      career: data?.career,
      isSeller: true,
    }),

  // --- 판매자 모드 전환 ---
  toggleSellerMode: (isSeller) => {
    // localStorage에 저장
    localStorage.setItem(SELLER_MODE_KEY, JSON.stringify(isSeller));
    set({ isSeller });
  },

  // --- localStorage에서 판매자 모드 복원 ---
  initializeSellerMode: () => {
    try {
      const saved = localStorage.getItem(SELLER_MODE_KEY);
      if (saved !== null) {
        const isSeller = JSON.parse(saved);
        set({ isSeller });
      }
    } catch (error) {
      console.error('❌ 판매자 모드 복원 실패:', error);
    }
  },
}));
