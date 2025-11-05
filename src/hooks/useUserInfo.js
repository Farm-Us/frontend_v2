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
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // 로컬스토리지에 데이터가 없으면 일반 유저로 설정
      guestAuth();
    }
  };

  return { guestAuth, sellerAuth, initializeUser };
};

export const useUserCheck = () => {
  const [isSeller, setIsSeller] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.state.isSeller ?? false;
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData?.state || null;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        try {
          const updatedUser = JSON.parse(e.newValue);
          setIsSeller(updatedUser?.isSeller ?? false);
          setUser(updatedUser || null);
        } catch {
          setIsSeller(false);
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { isSeller, user };
};
