// components/ProductDetail/ProductDetailContent.jsx
import React from 'react';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductDetailContent = ({ details }) => {
  return (
    <div className={styles.detailContent}>
      {details?.map((detail, index) => (
        <div key={index} className={styles.contents}>
          {detail?.image ? (
            <img className={styles.contentsChild} src={detail?.image} alt={detail?.title} />
          ) : (
            <div className={'w-full h-[200px] bg-gray-100 rounded p-4'}>이미지가 없습니다.</div>
          )}
          <b className={styles.b2}>{detail?.title}</b>
          <div className={styles.div22}>{detail?.content}</div>
        </div>
      ))}
    </div>
  );
};
