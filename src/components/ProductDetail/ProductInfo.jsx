// components/ProductDetail/ProductInfo.jsx
import React from 'react';
import { StarIcon } from '@/components/icons/StarIcon';
import { formatPrice, calculateDiscountedPrice } from '@/utils/formatPrice';
import styles from '@/pages/ProductDetailPage.module.css';
import userAvatarImg1 from '@/assets/images/user-profile-1.jpg';
import ChevronButtonRight from '@/assets/icons/chevron-right.svg?react';
import { useNavigate } from 'react-router-dom';

export const ProductInfo = ({ product, isPreview = false }) => {
  const firstOptionPrice = product?.discountedPrice || product.options?.[0]?.optionPrice;
  const discountedPrice = calculateDiscountedPrice(firstOptionPrice, product?.discount);
  const navigate = useNavigate();
  return (
    <div className={styles.info}>
      <div className={styles.brand}>
        {/* 판매자 정보 */}
        <div className={`w-full justify-between ${styles.brand1}`}>
          <div className={styles.brand1}>
            <img className={styles.brandChild} src={userAvatarImg1 || product?.userImage} alt={product.marketName} />
            <div className={styles.div1}>{product.marketName}</div>
          </div>
          {/* chevron-right.svg 추가 하기 
          미리보기에서는 안보이게 해야함 */}

          {!isPreview && (<button
            className='flex items-center justify-center p-2'
            onClick={() => navigate(`/seller-market`)}
          >
            <ChevronButtonRight />
          </button>
          )}
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
          {product.discount > 0 && <b className={styles.b}>{product.discount || product?.discoundRate}%</b>}
          <b className={styles.b1}>{formatPrice(discountedPrice) || 0}원</b>
        </div>
        {product.discount > 0 && <div className={styles.div4}>{formatPrice(firstOptionPrice)}원</div>}
      </div>

      <ProductDetailList product={product} />
      <ProductShippingInfo />
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
      <div className='text-gray-900 text-sm font-normal leading-tight'>{product.farmingOption || '유기농'}</div>
    </div>
  </div>
);

const ProductShippingInfo = () => {
  // 현재 날짜 + 3일 계산
  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3);
    
    const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    const day = String(deliveryDate.getDate()).padStart(2, '0');
    
    return `${month}/${day}`;
  };

  return (
    <div className='p-4 rounded-2xl border border-gray-200 flex flex-col gap-4'>
      <div className='grid grid-cols-[100px_1fr] gap-4'>
        <div className='text-gray-500 text-sm font-medium leading-tight'>배송</div>
        <div className='text-gray-900 text-sm font-normal leading-tight flex flex-col items-start gap-1'>
          <p>{getDeliveryDate()} 도착 예정</p>
          <p>무료배송 · 결제 3일 이내 출고 · CJ대한통운</p>
        </div>
      </div>
      <div className='grid grid-cols-[100px_1fr] gap-4'>
        <div className='text-gray-500 text-sm font-medium leading-tight'>적립</div>
        <div className='text-gray-900 text-sm font-normal leading-tight'>최대 2,500원 적립</div>
      </div>
    </div>
  );
};
