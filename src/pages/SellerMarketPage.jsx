import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './SellerMarketPage.module.css';
import DefaultImage from '@/assets/images/UserProfile.jpg';
import { itemApi } from '../services/itemApi';

// 아이콘 컴포넌트
const ChevronLeftIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M15 18L9 12L15 6' stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
const PlusIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 5V19M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

export default function SellerMarketPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    marketName: '내 마켓', // 기본값
    profileImage: DefaultImage, // 기본값
  });

  // 무한 스크롤을 위한 Intersection Observer
  const observerTarget = useRef(null);

  // 무한 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['sellerProducts', 1],
    queryFn: ({ pageParam = 0 }) => itemApi.getItemsProducer(1, { page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 비어있지 않고, 더 가져올 데이터가 있으면 다음 페이지 번호 반환
      if (lastPage.content && lastPage.content.length > 0 && !lastPage.last) {
        return allPages.length;
      }
      return undefined;
    },
    enabled: true,
  });

  // Intersection Observer 콜백
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Intersection Observer 설정
  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0.5 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  // 모든 페이지의 상품을 하나의 배열로 합치기
  const products = data?.pages.flatMap((page) => page.content) || [];

  return (
    <div className={styles.div}>
      {/* --- 상단 헤더 --- */}
      <div className={`${styles.header}`}>
        <button onClick={() => navigate(-1)} className={styles.headerButton}>
          <ChevronLeftIcon />
        </button>
        <div className={styles.div1}>{profile.marketName}</div>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* --- 프로필 정보 --- */}
      <div className={`${styles.profileSection} px-[24px] pb-[24px] pt-[24px]`}>
        <img className={styles.profileImage} src={profile.profileImage} alt='프로필 이미지' />
        <div className={styles.marketName}>{profile.marketName}</div>
        <div className={styles.marketIntro}>딸기에 진심인 {profile.marketName}입니다.</div>
        <button className={styles.editProfileButton}>프로필 편집</button>
      </div>

      {/* --- 판매 상품 탭 --- */}
      <div className={styles.tabGroup}>
        <div className={styles.tabActive}>판매 상품</div>
        <div className={styles.tabInactive}>게시글</div>
      </div>

      {/* --- 상품 목록 --- */}
      <div className={styles.productList}>
        {isLoading ? (
          <div className={styles.loadingMessage}>로딩 중...</div>
        ) : isError ? (
          <div className={styles.emptyMessage}>상품을 불러오는데 실패했습니다.</div>
        ) : products.length > 0 ? (
          <>
            {products.map((product) => (
              <Link key={product.itemId} to={`/product-detail/${product.itemId}`} className={styles.card}>
                <img
                  className={styles.imgIcon1}
                  src={product.thumbnailImageUrl || 'https://placehold.co/92x92'}
                  alt={product.productName || product.itemName}
                />
                <div className={styles.info}>
                  <b className={`${styles.kg}`}>{product.productName || product.itemName}</b>
                  <div className={styles.price}>
                    {product.discountRate > '0' && <div className={styles.div10}>{product.discountRate}%</div>}
                    <div className={styles.div7}>{Number(product?.discountedPrice).toLocaleString()}원</div>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* 무한 스크롤 트리거 */}
            <div ref={observerTarget} className={styles.observerTarget}>
              {isFetchingNextPage && <div className={styles.loadingMore}>더 불러오는 중...</div>}
            </div>
          </>
        ) : (
          <div className={styles.emptyMessage}>
            등록된 상품이 없습니다. <br /> '+' 버튼을 눌러 상품을 추가해보세요.
          </div>
        )}
      </div>

      {/* 상품 등록 버튼 (Floating) */}
      <button onClick={() => navigate('/register-product')} className={styles.floatingButton}>
        <PlusIcon />
      </button>
    </div>
  );
}
