// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import ShoppingCartIcon from '@/assets/icons/shopping-cart.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import { SearchIcon } from '../Icons';
import styles from './Header.module.css';
import { useUserCheck } from '../../hooks/useUserInfo';

export default function Header() {
  const { isSeller } = useUserCheck();

  return (
    <header className='bg-white px-4 py-3 flex justify-between items-center '>
      {/* 로고 클릭 시 홈으로 이동하는 기능 추가 */}
      <Link to='/'>
        <Logo className='h-6 w-[86px]' />
      </Link>

      <div className='flex items-center space-x-4'>
        {/* 검색 아이콘 가져오기 */}
        <button className={styles.searchButton}>
          <SearchIcon />
        </button>
        {/* 장바구니 버튼은 아직 기능이 없으므로 button 태그 유지 */}
        <button aria-label='장바구니 보기'>
          <ShoppingCartIcon className='w-6 h-6 text-gray-800 hover:text-green-600' />
        </button>
        {/* 사용자 아이콘 클릭 시 마이페이지로 이동하도록 Link로 변경 */}
        <Link to={isSeller ? '/seller-mypage' : '/mypage'} aria-label='내 정보 보기'>
          <UserIcon className='w-6 h-6 text-gray-800 hover:text-green-600' />
        </Link>
      </div>
    </header>
  );
}
