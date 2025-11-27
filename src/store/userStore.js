import { create } from 'zustand';

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
}));
