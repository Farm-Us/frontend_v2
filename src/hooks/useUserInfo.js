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
  // Zustand 스토어에서 직접 유저 정보 조회 (구독)
  const userState = useUserStore();
  const { isSeller, userName, marketName, userImage, farmerName, career } = userState;

  // Zustand 스토어의 데이터를 객체로 반환
  const user = {
    isSeller,
    userName,
    marketName,
    userImage,
    farmerName,
    career,
  };

  return { isSeller, user, userState };
};
