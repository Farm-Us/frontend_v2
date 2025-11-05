import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './WriteButton.module.css';
import { WriteIcon } from '../Icons';

const WriteButton = ({ to = '/community/write' }) => {
  return (
    <NavLink to={to} className={styles.writeButton}>
      <WriteIcon />
    </NavLink>
  );
};

export default WriteButton;
