import React from 'react';
import styles from './TaggedProductCard.module.css';

/**
 * 커뮤니티 글쓰기에서 태그된 상품 표시 컴포넌트
 * Figma 디자인: node-id=1024-3799
 */
export default function TaggedProductCard({ product, onRemove }) {
  const imageSrc = product?.mainImage || product?.image || product?.thumbnailImageUrl || 'https://placehold.co/56x56';
  const productName = product?.itemName || product?.name || '상품명';
  const productPrice = product?.itemPrice || product?.price || product?.discountedPrice || 0;

  return (
    <div className={styles.card}>
      {/* 상품 이미지 */}
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={productName} className={styles.image} />
      </div>

      {/* 상품 정보 */}
      <div className={styles.info}>
        <div className={styles.nameWrapper}>
          <p className={styles.productName}>{productName}</p>
        </div>
        <div className={styles.priceWrapper}>
          <span className={styles.productPrice}>{productPrice?.toLocaleString()}원</span>
        </div>
      </div>

      {/* 제거 버튼 */}
      {onRemove && (
        <button type='button' onClick={onRemove} className={styles.removeButton} aria-label='상품 태그 제거'>
          ✕
        </button>
      )}
    </div>
  );
}
