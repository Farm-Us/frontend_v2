import React, { useMemo } from 'react';
import TaggedProductCard from './TaggedProductCard';
import styles from './TaggedProductsList.module.css';

/**
 * 태그된 상품 목록 표시 컴포넌트 (가로 스크롤)
 */
export default function TaggedProductsList({ taggedProductIds = [], products = [], onRemoveTag }) {
  // taggedProductIds가 이제 객체 배열이므로 직접 사용
  const taggedProducts = Array.isArray(taggedProductIds) ? taggedProductIds : [];

  if (taggedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {taggedProducts.map((product) => (
          <div key={product.id || product.itemId} className={styles.productItem}>
            <TaggedProductCard
              product={product}
              onRemove={() => onRemoveTag && onRemoveTag(product.id || product.itemId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
