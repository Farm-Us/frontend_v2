import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SellerMarketPage.module.css';
import DefaultImage from '@/assets/images/UserProfile.jpg';

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
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({
    marketName: '내 마켓', // 기본값
    profileImage: DefaultImage, // 기본값
  });

  useEffect(() => {
    // localStorage에서 상품 목록을 불러옵니다.
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);

    // 가장 최근에 등록된 상품의 정보로 프로필을 설정합니다.
    if (storedProducts.length > 0) {
      const latestProduct = storedProducts[0];
      setProfile({
        marketName: latestProduct.marketName,
        profileImage: DefaultImage,
      });
    }
  }, []);

  return (
    <div className={styles.div}>
      {/* --- 상단 헤더 --- */}
      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.headerButton}>
          <ChevronLeftIcon />
        </button>
        <div className={styles.div1}>{profile.marketName}</div>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* --- 프로필 정보 --- */}
      <div className={styles.profileSection}>
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
        {products.length > 0 ? (
          products.map((product) => (
            // 각 상품 카드를 클릭하면 상세 페이지로 이동합니다.
            <Link key={product.id} to={`/product-detail/${product.id}`} className={styles.card}>
              <img
                className={styles.imgIcon1}
                src={product.mainImage || 'https://placehold.co/92x92'}
                alt={product.productName}
              />
              <div className={styles.info}>
                <b className={styles.kg}>{product.productName}</b>
                <div className={styles.price}>
                  {product.discount && <div className={styles.div10}>{product.discount}%</div>}
                  <div className={styles.div7}>
                    {product.options?.[0]?.price
                      ? `${new Intl.NumberFormat('ko-KR').format(
                          product.options[0].price * (1 - (product.discount || 0) / 100)
                        )}원`
                      : ''}
                  </div>
                </div>
              </div>
            </Link>
          ))
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
