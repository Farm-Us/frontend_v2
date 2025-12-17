// components/ProductDetail/ProductDetailContent.jsx
import React from 'react';
import styles from '@/pages/ProductDetailPage.module.css';

export const ProductDetailContent = ({ details }) => {
  return (
    <div className={styles.detailContent}>
      {details?.map((detail, index) => (
        <div key={index} className={styles.contents}>
          <b className={` text-center text-[#095235] text-2xl font-bold leading-8 `}>{detail?.title}</b>
          <div className={`text-center text-[##3B4149] text-base font-medium leading-6 `}>{detail?.content}</div>
          {detail?.image ? (
            <img className={styles.contentsChild} src={detail?.image} alt={detail?.title} />
          ) : (
            <div className={'w-full h-[375px] bg-gray-100 rounded p-4'}>이미지가 없습니다.</div>
          )}
        </div>
      ))}
    </div>
  );
};
