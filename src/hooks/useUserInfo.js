// 유저의 정보를 불러오는 훅
import { useEffect, useState } from 'react';
import { seller, user } from '../data';
import { useUserStore } from '../store/userStore';

export const useUserInfo = () => {
  // zustand 호출
  const userStore = useUserStore();

  // 일반 유저 - 목데이터
  const guestAuth = () => {
    userStore.setUser(user);
  };

  // seller 유저 - 목데이터
  const sellerAuth = () => {
    userStore.setSeller(seller);
  };

  // 로컬스토리지 체크 후 자동 로그인 (목데이터)
  const initializeUser = () => {
    // 목데이터로 일반 유저로 초기화
    guestAuth();
  };

  return { guestAuth, sellerAuth, initializeUser };
};

export const useUserCheck = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [user, setUser] = useState(null);

  // 추가적인 유저 정보 확인 로직 필요 시 여기에 추가
  // TODO: 실제 로그인 시스템 구현 시 서버에서 유저 상태 확인

  return { isSeller, user };
};
