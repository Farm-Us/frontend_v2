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
import { useCart } from '../hooks/useCart';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading: loading, error } = useProductDetail(id);
  const { addToCart } = useCart();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'cart' 또는 'payment'
  const [activeTab, setActiveTab] = useState('detail'); // 'detail' 또는 'review'

  const handleBack = () => navigate(-1);

  const handleAddToCart = () => {
    setActionType('cart');
    setIsSelectOpen(true);
  };

  const handleBuyNow = () => {
    setActionType('payment');
    setIsSelectOpen(true);
  };

  const handleConfirmOption = (selectedOption) => {
    if (actionType === 'cart') {
      // 장바구니에만 저장
      addToCart({
        id: product?.categoryId,
        sellerName: product?.sellerName || '새벽들딸기농원',
        productName: product?.productName,
        image: product?.thumbnailImageUrl,
        optionId: selectedOption?.id,
        optionValue: selectedOption?.optionValue,
        price: selectedOption?.optionPrice,
        quantity: 1,
      });
    } else if (actionType === 'payment') {
      // 장바구니에 저장 후 결제 페이지로 이동
      addToCart({
        id: product?.categoryId,
        sellerName: product?.sellerName || '새벽들딸기농원',
        productName: product?.productName,
        image: product?.thumbnailImageUrl,
        optionId: selectedOption?.id,
        optionValue: selectedOption?.optionValue,
        price: selectedOption?.optionPrice,
        quantity: 1,
      });
      navigate('/cart');
    }
  };

  const handleToggleWishlist = () => {
    // 찜하기 토글 로직
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

      {/* 상세, 후기 탭 */}
      <div className={`${styles.tabContainer}`}>
        <button
          className={`${styles.tabButton} ${activeTab === 'detail' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('detail')}>
          상세
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'review' ? styles.tabActive : ''}`}
          // onClick={() =>  setActiveTab('review')}>
          >
          후기 <span className='text-[#6A7685] text-xs font-medium leading-4'>0</span>
        </button>
      </div>


      <ProductDetailContent details={product?.details} />
      {isSelectOpen && (
        <PaymentBottomSheet
          options={product?.options}
          setIsSelectOpen={setIsSelectOpen}
          buttonLabel={actionType === 'cart' ? '담기' : '결제하기'}
          productId={product?.id}
          onConfirm={handleConfirmOption}
        />
      )}
      <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onToggleWishlist={handleToggleWishlist} />
    </div>
  );
}
