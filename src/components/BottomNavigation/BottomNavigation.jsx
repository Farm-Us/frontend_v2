import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BottomNavigation.module.css';
import { CommunityIcon, HomeIcon, MyPageIcon } from '../Icons';

const BottomNavigation = () => {
  const navItems = [
    { to: '/', icon: HomeIcon, label: '홈' },
    { to: '/community', icon: CommunityIcon, label: '커뮤니티' },
    { to: '/mypage', icon: MyPageIcon, label: '마이페이지' },
  ];

  return (
    <nav className={styles.navBar}>
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={styles.navLink}>
          {({ isActive }) => (
            <>
              <Icon isActive={isActive} />
              <span className={isActive ? styles.activeLabel : styles.label}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;
