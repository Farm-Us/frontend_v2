import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// 컴포넌트 임포트
import CategoryChips from '@/components/chips/CategoryChips.jsx';
import MainBanner from '@/components/banner/MainBanner.jsx';
// 더미 데이터 임포트
import { mainBannerImage, userAvatarImg } from '../../data.js';
import { interestProducts, seasonalProducts, farmerStories } from '@/data.js';
// 섹션 컴포넌트 임포트
import ProductRecommendationSection from './commerce/ProductRecommendationSection';
import SeasonalFoodSection from './commerce/SeasonalFoodSection.jsx';
import StorySection from './commerce/StorySection.jsx';
import { useUserInfo } from '../../hooks/useUserInfo.js';
// import { useCategoryCall } from '../../hooks/useProduct.js';
// import FloatButton from '../../components/button/FloatButton.jsx';

// --- 메인 페이지 컴포넌트 ---
export default function MainPage() {
  // TODO: 접속과 동시에 유저데이터 localstorage 삽입
  const { initializeUser } = useUserInfo();
  // 불러오는지 확인

  // 칩 선택
  const [activeChip, setActiveChip] = useState('베스트');

  useEffect(() => {
    initializeUser();
  }, []);
  // 카테고리 칩 데이터
  const categories = ['베스트', '과일', '채소', '축산', '수산', '김치/젓갈', '쌀/잡곡'];
  const recommendCategories = ['추천', '수박', '옥수수', '최근 본 상품'];

  return (
    <div className='relative'>
      <main className='px-4 py-6 space-y-10 bg-white'>
        <CategoryChips categories={categories} activeChip={activeChip} setActiveChip={setActiveChip} />
        <MainBanner mainBannerImg={mainBannerImage} userAvatarImg={userAvatarImg} />

        {/* 사용자의 관심있는 상품 영역 */}
        <ProductRecommendationSection
          userName={'김준식'}
          tabs={recommendCategories}
          interestProducts={interestProducts}
        />
        {/* 7월 인기 제철음식 섹션 */}
        <SeasonalFoodSection seasonalProducts={seasonalProducts} title='10월 인기 제철음식' />

        {/* 농부의 이야기 섹션 */}
        <StorySection farmerStories={farmerStories} />
        {/* <FloatButton href={'/register-product'} />  */}
      </main>
    </div>
  );
}
