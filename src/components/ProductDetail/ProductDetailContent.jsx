// components/ProductDetail/ProductDetailContent.jsx
import React from 'react';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductDetailContent = ({ details }) => (
  <div className={styles.detailContent}>
    {details?.map(
      (detail, index) =>
        detail.title &&
        detail.content &&
        detail.image && (
          <div key={index} className={styles.contents}>
            <img className={styles.contentsChild} src={detail.image} alt={detail.title} />
            <b className={styles.b2}>{detail.title}</b>
            <div className={styles.div22}>{detail.content}</div>
          </div>
        )
    )}
  </div>
);
