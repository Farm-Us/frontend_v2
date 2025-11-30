// components/ProductDetail/ProductActions.jsx
import React from 'react';
import { HeartIcon } from '@/components/icons/HeartIcon';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductActions = ({ onAddToCart, onBuyNow, onToggleWishlist }) => (
  <div className={styles.bottomButton}>
    <button className={styles.heartButton} onClick={onToggleWishlist}>
      <HeartIcon />
    </button>
    <div className={styles.buttonGroup}>
      <button className={styles.button} onClick={onAddToCart}>
        장바구니
      </button>
      <button className={styles.button1} onClick={onBuyNow}>
        바로구매
      </button>
    </div>
  </div>
);
