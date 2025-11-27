// components/ProductDetail/ProductInfo.jsx
import React from 'react';
import { StarIcon } from '@/components/icons/StarIcon';
import { formatPrice, calculateDiscountedPrice } from '@/utils/formatPrice';
import styles from '@/pages/ProductDetailPage.module.css';
import userAvatarImg1 from '@/assets/images/user-profile-1.jpg';

export const ProductInfo = ({ product }) => {
  const firstOptionPrice = product?.discountedPrice || product.options?.[0]?.optionPrice;
  const discountedPrice = calculateDiscountedPrice(firstOptionPrice, product?.discount);

  return (
    <div className={styles.info}>
      <div className={styles.brand}>
        {/* 판매자 정보 */}
        <div className={styles.brand1}>
          <img className={styles.brandChild} src={product?.userImage || userAvatarImg1} alt={product.marketName} />
          <div className={styles.div1}>{product.marketName}</div>
        </div>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.kg}>{product?.productName || product?.itemName}</div>
        <div className={styles.starParent}>
          <StarIcon />
          <div className={styles.div2}>0.0</div>
          <div className={styles.div2}>(0)</div>
        </div>
        <div className={styles.price}>
          {product.discount >= 0 && <b className={styles.b}>{product.discount}%</b>}
          <b className={styles.b1}>{formatPrice(discountedPrice) || 0}원</b>
        </div>
        {product.discount >= 0 && <div className={styles.div4}>{formatPrice(firstOptionPrice)}원</div>}
      </div>

      <ProductDetailList product={product} />
    </div>
  );
};

const ProductDetailList = ({ product }) => (
  <div className='p-4 rounded-2xl border border-gray-200 flex flex-col gap-4'>
    <div className='grid grid-cols-[100px_1fr] gap-4'>
      <div className='text-gray-500 text-sm font-medium leading-tight'>농부</div>
      <div className='text-gray-900 text-sm font-normal leading-tight'>{product.farmerName} 농부</div>
    </div>
    <div className='grid grid-cols-[100px_1fr] gap-4'>
      <div className='text-gray-500 text-sm font-medium leading-tight'>경력</div>
      <div className='text-gray-900 text-sm font-normal leading-tight'>{product.career}</div>
    </div>
    <div className='grid grid-cols-[100px_1fr] gap-4'>
      <div className='text-gray-500 text-sm font-medium leading-tight'>재배방식</div>
      <div className='text-gray-900 text-sm font-normal leading-tight'>{product.cultivationMethod || '유기농'}</div>
    </div>
  </div>
);
