// pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductHeader } from '@/components/ProductDetail/ProductHeader';
import { ProductInfo } from '@/components/ProductDetail/ProductInfo';
import { ProductDetailContent } from '@/components/ProductDetail/ProductDetailContent';
import { ProductActions } from '@/components/ProductDetail/ProductActions';
import styles from './ProductDetailPage.module.css';
import PaymentBottomSheet from '../components/payments/PaymentBottomSheet';
import { useProductDetail } from '../hooks/useProduct';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading: loading, error } = useProductDetail(id);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleBack = () => navigate(-1);

  const handleAddToCart = () => {
    // 장바구니 추가 로직
    console.log('장바구니에 추가');
  };

  const handleBuyNow = () => {
    // 바로구매 로직
    console.log('바로구매');
    // TODO: 구매 옵션 모달 열기
    setIsSelectOpen(true);
  };

  const handleToggleWishlist = () => {
    // 찜하기 토글 로직
    console.log('찜하기 토글');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !product) {
    return <div>{error || '상품을 찾을 수 없습니다.'}</div>;
  }

  return (
    <div className={`${styles.div} h-full pb-20`}>
      <ProductHeader onBack={handleBack} />

      <img className={styles.imgIcon} src={product?.thumbnailImageUrl} alt={product.productName} />

      <div className={styles.infoAndTab}>
        <ProductInfo product={product} />
      </div>

      <ProductDetailContent details={product?.details} />
      {isSelectOpen && <PaymentBottomSheet setIsSelectOpen={setIsSelectOpen} />}
      <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onToggleWishlist={handleToggleWishlist} />
    </div>
  );
}
