import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductHeader } from '@/components/ProductDetail/ProductHeader';
import { ProductInfo } from '@/components/ProductDetail/ProductInfo';
import { ProductDetailContent } from '@/components/ProductDetail/ProductDetailContent';
import styles from './ProductDetailPage.module.css';
import useProductStore from '../store/productStore';

export default function ProductPreviewPage() {
  const navigate = useNavigate();
  const product = useProductStore.getState();

  const handleBack = () => navigate(-1);

  // ProductInfo 컴포넌트에서 사용할 수 있도록 데이터 형식 맞추기
  const formattedProduct = {
    ...product,
    thumbnailImageUrl: product.mainImage,
    productName: product.productName,
    itemName: product.productName,
    options: product.options?.map(opt => ({
      ...opt,
      optionPrice: opt.price
    })),
  };

  return (
    <div className={`${styles.div} h-full pb-20`}>
      <ProductHeader onBack={handleBack} title="미리보기" />

      <img className={styles.imgIcon} src={product?.mainImage || 'https://placehold.co/375x375?text=Image'} alt={product.productName} />

      <div className={styles.infoAndTab}>
        <ProductInfo product={formattedProduct} isPreview={true} />
      </div>

      <ProductDetailContent details={product?.details} />
    </div>
  );
}
