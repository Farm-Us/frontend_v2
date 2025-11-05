import React from 'react';
import styles from './MyPageHeader.module.css';
import { SettingsIcon } from '../Icons';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@/assets/icons/home.svg?react';

export default function MyPageHeader() {
  const location = useLocation();
  const isMyPage = location.pathname.includes('seller-mypage');

  return (
    <header className={`${styles.header} ${isMyPage ? '' : styles.mypageColor}`}>
      <h1 className={styles.title}>마이페이지</h1>

      <div className={styles.iconWrapperRight}>
        <Link to={'/'}>
          <HomeIcon />
        </Link>
        <SettingsIcon />
      </div>
    </header>
  );
}
