// src/pages/community/CommunityWriteTagPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCommunityWriteStore from '../../store/communityWriteStore';
import styles from './CommunityWriteTagPage.module.css';

// 아이콘 컴포넌트 (기존과 동일)
import { XIcon } from '@/components/Icons';
import ProductCardRevers from '../../components/productcard/ProductCardRevers';

const CheckIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <path d='M20 6L9 17l-5-5' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export default function CommunityWriteTagPage() {
  const navigate = useNavigate();

  const { taggedProducts, toggleProductTag } = useCommunityWriteStore();

  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 등록된 상품 목록을 불러옵니다.
    // TODO: 실제 API 연동 시 이 부분 수정 필요
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // console.log(storedProducts);
    setMyProducts(storedProducts);
  }, []);

  const toggleSelected = (product) => {
    toggleProductTag(product);
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.iconButton}>
          <XIcon />
        </button>
        <h1 className={styles.headerTitle}>상품 추가</h1>
        {/* 빈값 */}
        <div className='{styles.nextButton}'></div>
      </header>

      <main className={styles.content}>
        {/* 상품 카드 필요 */}
        {myProducts.length > 0 ? (
          myProducts.map((product) => (
            <ProductCardRevers
              key={product.id}
              name={product.name || product.productName}
              price={product?.price}
              rating={product?.priceRating}
              reviews={product?.reviews || 0}
              image={product?.image || product?.mainImage}
              onSelect={() => toggleSelected(product)}
            />
          ))
        ) : (
          <div className={`${styles.infoText} flex flex-col justify-center items-center h-full w-full`}>
            <span>상품이 없습니다.</span>
          </div>
        )}
      </main>
    </div>
  );
}
