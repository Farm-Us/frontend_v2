// src/App.jsx

/**
 * App.jsx
 * 프로젝트의 모든 페이지 경로를 설정하고 관리하는 최상위 라우팅 파일입니다.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- 레이아웃 컴포넌트 ---
import Layout from './components/Layout';
import FormLayout from './components/FormLayout';
import ScrollToTop from './components/ScrollToTop'; // 추가

// --- 페이지 컴포넌트 (모든 페이지 import) ---
import MainPage from './pages/home/MainPage';
import CommunityPage from './pages/home/CommunityPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import SellerMyPage from './pages/SellerMyPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import ProductDetailRegistrationPage from './pages/ProductDetailRegistrationPage';
import ProductPreviewPage from './pages/ProductPreviewPage';
import SellerMarketPage from './pages/SellerMarketPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductRegistrationConfirmation from './pages/ProductRegistrationConfirmation';
import CartPage from './pages/CartPage';
import OrderCompletePage from './pages/OrderCompletePage';
import NotFoundPage from './pages/NotFoundPage';

// --- 커뮤니티 글쓰기 페이지 ---
import CommunityWritePage from './pages/community/CommunityWritePage';
import CommunityWriteImagePage from './pages/community/CommunityWriteImagePage';
import CommunityWriteTagPage from './pages/community/CommunityWriteTagPage';
import CommunityWriteConfirmPage from './pages/community/CommunityWriteConfirmPage';
import CommunityDetailPage from './pages/community/CommunityDetailPage';

// --- 목데이터 초기화 ---
import { user, seller } from './data';
import { useUserStore } from './store/userStore';

function AppContent() {
  const { setUser, initializeSellerMode } = useUserStore();

  useEffect(() => {
    // 앱 시작 시 기본 유저 목데이터 초기화
    setUser(user);

    // localStorage에서 판매자 모드 복원
    initializeSellerMode();
  }, [setUser, initializeSellerMode]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 그룹 1: 메인 앱 화면 (하단 탭 바가 있는 레이아웃) */}
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/community' element={<CommunityPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/seller-mypage' element={<SellerMyPage />} />
          <Route path='/seller-market' element={<SellerMarketPage />} />
          <Route path='/product-detail/:id' element={<ProductDetailPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/order-complete' element={<OrderCompletePage />} />
        </Route>

        {/* 그룹 2: 폼 전용 레이아웃 */}
        <Route element={<FormLayout />}>
          {/* 상품 등록 관련 */}
          <Route path='/register-product' element={<ProductRegistrationPage />} />
          <Route path='/register-product/detail' element={<ProductDetailRegistrationPage />} />
          <Route path='/product-detail/preview' element={<ProductPreviewPage />} />
          <Route path='/product-registration-confirmation' element={<ProductRegistrationConfirmation />} />

          {/* ✨ [수정] 커뮤니티 글쓰기 6단계에 해당하는 전체 경로 재정의 */}
          <Route path='/community/write' element={<CommunityWritePage />} />
          <Route path='/community/write-image' element={<CommunityWriteImagePage />} />
          <Route path='/community/write-tag' element={<CommunityWriteTagPage />} />
          <Route path='/community/write-confirm' element={<CommunityWriteConfirmPage />} />
          <Route path='/community/:id' element={<CommunityDetailPage />} />
        </Route>

        {/* 그룹 3: 독립적인 전체 화면 페이지 */}
        <Route path='/login' element={<LoginPage />} />
        {/* 🆕 404 페이지 - 모든 정의되지 않은 경로를 처리 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
