import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OrderCompletePage.module.css';
import { useCart } from '@/hooks/useCart';

export default function OrderCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalPrice, clearCart } = useCart();
  const hasInitialized = useRef(false);
  const [orderInfo, setOrderInfo] = useState({
    orderNumber: '',
    orderDate: '',
    totalPrice: 0,
    shippingInfo: {
      name: '홍길동',
      address: '서울시 강남구 테헤란로 123, 403호',
      phone: '010-1234-5678',
    },
  });

  // 페이지 로드 시 주문 정보 생성 (한 번만 실행)
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // location.state에서 totalPrice 받기, 없으면 getTotalPrice() 사용
    const totalPrice = location.state?.totalPrice || getTotalPrice();
    const now = new Date();
    const orderNumber = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    const orderDate = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(
      now.getDate()
    ).padStart(2, '0')}일`;

    setOrderInfo((prev) => ({
      ...prev,
      orderNumber,
      orderDate,
      totalPrice,
    }));

    // 주문 완료 후 장바구니 비우기
    clearCart();
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>주문완료</h1>
      </header>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          {/* Success Icon */}
          <div className={styles.iconWrapper}>
            <div className={styles.checkIcon}>
              <svg width='59' height='59' viewBox='0 0 59 59' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='29.5' cy='29.5' r='29.5' fill='#15c47e' />
                <path
                  d='M23 29L27.5 33.5L36.5 24.5'
                  stroke='white'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div className={styles.messageSection}>
            <h2 className={styles.mainTitle}>주문이 완료되었어요!</h2>
            <p className={styles.subtitle}>
              구매해주셔서 감사합니다.
              <br />
              상품 준비가 완료되면 알려드릴게요.
            </p>
          </div>

          {/* Order Info Card */}
          <div className={styles.orderCard}>
            <div className={styles.cardTitle}>
              <h3 className={styles.cardTitleText}>주문 정보</h3>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>주문번호</span>
                <span className={styles.infoValue}>{orderInfo.orderNumber}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>주문일자</span>
                <span className={styles.infoValue}>{orderInfo.orderDate}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>총 결재금액</span>
                <span className={styles.totalPrice}>{orderInfo.totalPrice.toLocaleString()}원</span>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.shippingSection}>
              <p className={styles.shippingLabel}>배송정보</p>
              <p className={styles.shippingName}>{orderInfo.shippingInfo.name}</p>
              <p className={styles.shippingAddress}>{orderInfo.shippingInfo.address}</p>
              <p className={styles.shippingPhone}>{orderInfo.shippingInfo.phone}</p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className={styles.buttonWrapper}>
          <button className={styles.homeButton} onClick={handleGoHome}>
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
