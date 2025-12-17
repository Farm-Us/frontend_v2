import { create } from 'zustand';

// localStorage 키
const SELLER_MODE_KEY = 'farm-us-seller-mode';

// localStorage에서 초기 isSeller 값 가져오기
const getInitialSellerMode = () => {
  try {
    const saved = localStorage.getItem(SELLER_MODE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('❌ 판매자 모드 복원 실패:', error);
  }
  return false; // 기본값
};

// Zustand 스토어 생성
export const useUserStore = create((set) => ({
  // --- 유저정보 ---
  producerId: 1,
  userImage: null,
  userName: '',
  marketName: '',
  farmerName: '',
  career: '',
  isSeller: getInitialSellerMode(), // localStorage에서 초기값 로드
  role: 'PRODUCER', // 'PRODUCER' 또는 'CONSUMER'
  email: 'provider123@naver.com',

  // --- 액션 함수들 ---
  setUser: (data) => {
    set({
      userImage: data.userImage,
      userName: data?.userName,
      // isSeller는 변경하지 않음 (localStorage 값 유지)
    });
  },
  setSeller: (data) => {
    set({
      userImage: data.userImage,
      userName: data?.userName,
      marketName: data?.marketName,
      farmerName: data?.farmerName,
      career: data?.career,
      // isSeller는 변경하지 않음 (localStorage 값 유지)
    });
  },

  // --- 판매자 모드 전환 ---
  toggleSellerMode: (isSeller) => {
    // localStorage에 저장
    localStorage.setItem(SELLER_MODE_KEY, JSON.stringify(isSeller));
    set({ isSeller });
  },
}));
