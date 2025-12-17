// components/ProductDetail/ProductHeader.jsx
import React from 'react';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductHeader = ({ onBack, title = '상세 페이지' }) => (
  <div className={styles.header}>
    <button onClick={onBack} className={styles.headerButton}>
      <ChevronLeftIcon />
    </button>
    <div className={styles.div26}>{title}</div>
    <div style={{ width: '24px' }}></div>
  </div>
);
