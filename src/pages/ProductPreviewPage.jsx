import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductDetailPage.module.css'; // 상세 페이지 스타일 재사용
import useProductStore from '../store/productStore';

// 아이콘
const ChevronLeftIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M15 18L9 12L15 6' stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);
const StarIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='#FFC700' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
      fill='#FFC700'
    />
  </svg>
);

export default function ProductPreviewPage() {
  const navigate = useNavigate();
  // Zustand 스토어에서 현재 데이터 가져오기
  const product = useProductStore.getState();

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '가격 정보 없음';
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const firstOptionPrice = product.options[0]?.price;
  const discountedPrice =
    product.discount && firstOptionPrice
      ? Math.round(firstOptionPrice * (1 - product.discount / 100))
      : firstOptionPrice;

  return (
    <div className={styles.div}>
      {/* 메인 이미지 */}
      <img
        className={styles.imgIcon}
        src={product.mainImage || 'https://placehold.co/375x375?text=Image'}
        alt='대표 이미지'
      />

      {/* 헤더 */}
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.headerButton}>
          <ChevronLeftIcon />
        </button>
        <div className={styles.div26}>미리보기</div>
        <div style={{ width: '24px' }}></div> {/* 오른쪽 공간 맞춤용 */}
      </div>

      {/* 상품 정보 */}
      <div className={styles.infoAndTab}>
        <div className={styles.info}>
          <div className={styles.brand}>
            <div className={styles.brand1}>
              <img
                className={styles.brandChild}
                src={product.mainImage || 'https://placehold.co/28x28'}
                alt='농장 프로필'
              />
              <div className={styles.div1}>{product.marketName}</div>
            </div>
          </div>
          <div className={styles.productInfo}>
            <div className={styles.kg}>{product.productName || '상품명'}</div>
            <div className={styles.starParent}>
              <StarIcon />
              <div className={styles.div2}>0.0</div>
              <div className={styles.div2}>(0)</div>
            </div>
            <div className={styles.price}>
              {product.discount && <b className={styles.b}>{product.discount}%</b>}
              <b className={styles.b1}>{formatPrice(discountedPrice)}원</b>
            </div>
            {product.discount && <div className={styles.div4}>{formatPrice(firstOptionPrice)}원</div>}
          </div>
          {/* 농부 정보 */}
          <div className={styles.listParent}>
            <div className={styles.list}>
              <div className={styles.div5}>농부</div>
              <div className={styles.cj}>{product.farmerName}</div>
            </div>
            <div className={styles.list}>
              <div className={styles.div5}>경력</div>
              <div className={styles.cj}>{product.career}</div>
            </div>
            <div className={styles.list}>
              <div className={styles.div5}>재배방식</div>
              <div className={styles.cj}>{product.cultivationMethod}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 설명 및 이미지 */}
      <div className={styles.detailContent}>
        {product.details.map(
          (detail, index) =>
            detail.title &&
            detail.content && (
              <div key={index} className={styles.contents}>
                {detail.image && <img className={styles.contentsChild} src={detail.image} alt={detail.title} />}
                <b className={styles.b2}>{detail.title}</b>
                <div className={styles.div22}>{detail.content}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
