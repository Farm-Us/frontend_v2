// src/pages/community/CommunityWriteTagPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useCommunityWriteStore from '../../store/communityWriteStore';
import { itemApi } from '../../services/itemApi';
import { useUserStore } from '../../store/userStore';
import styles from './CommunityWriteTagPage.module.css';

// 아이콘 컴포넌트
import { XIcon } from '@/components/Icons';
import ProductCardRevers from '../../components/productcard/ProductCardRevers';

const CheckIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <path d='M20 6L9 17l-5-5' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

/**
 * 커뮤니티 포스트 작성 시 상품 태그 페이지
 * 판매자가 등록한 상품 목록 중 포스트에 태그할 상품 선택
 */
export default function CommunityWriteTagPage() {
  const navigate = useNavigate();
  const { taggedProducts, toggleProductTag } = useCommunityWriteStore();
  const producerId = useUserStore((state) => state.producerId);

  // 판매자의 상품 목록 조회
  const {
    data: myProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-products', producerId],
    queryFn: () => itemApi.getItemsProducer(producerId),
    select: (response) => response?.data?.content || [],
    enabled: !!producerId,
    staleTime: 5 * 60 * 1000,
  });

  // 상품 선택/해제 핸들러
  const handleToggleProduct = (product) => {
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
        <div className={styles.nextButton}></div>
      </header>

      <main className={styles.content}>
        {/* 로딩 상태 */}
        {isLoading && (
          <div className={`${styles.infoText} flex flex-col justify-center items-center h-full w-full`}>
            <span>상품을 불러오는 중...</span>
          </div>
        )}

        {/* 에러 상태 */}
        {error && (
          <div className={`${styles.infoText} flex flex-col justify-center items-center h-full w-full`}>
            <span>상품을 불러올 수 없습니다.</span>
          </div>
        )}

        {/* 상품 목록 */}
        {!isLoading && !error && myProducts.length > 0 ? (
          myProducts.map((product) => (
            <ProductCardRevers
              key={product.id}
              itemName={product.itemName || product.name}
              itemPrice={product?.itemPrice || product?.price}
              rating={product?.rating}
              reviews={product?.reviews || 0}
              image={product?.mainImage || product?.image}
              isSelected={taggedProducts?.includes(product.id)}
              onSelect={() => handleToggleProduct(product)}
            />
          ))
        ) : !isLoading && !error ? (
          <div className={`${styles.infoText} flex flex-col justify-center items-center h-full w-full`}>
            <span>등록한 상품이 없습니다.</span>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>상품을 먼저 등록해주세요.</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
