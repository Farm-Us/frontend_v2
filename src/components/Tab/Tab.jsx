import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Tab.module.css';

const Tab = ({ to, children, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? `${styles.tab} ${styles.active}` : styles.tab)}
      {...props}>
      {children}
    </NavLink>
  );
};

export default Tab;
