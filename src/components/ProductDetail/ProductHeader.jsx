// components/ProductDetail/ProductHeader.jsx
import React from 'react';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductHeader = ({ onBack }) => (
  <div className={styles.header}>
    <button onClick={onBack} className={styles.headerButton}>
      <ChevronLeftIcon />
    </button>
    <div className={styles.div26}>상품 상세</div>
    <div style={{ width: '24px' }}></div>
  </div>
);
