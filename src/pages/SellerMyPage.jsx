// src/pages/SellerMyPage.jsx
import React from 'react';
import ProfileSection from '@/components/mypage/ProfileSection';
import StatsSection from '@/components/mypage/StatsSection';
import MarketLinkCard from '@/components/mypage/MarketLinkCard';
import ActivityAnalysis from '@/components/mypage/ActivityAnalysis';
import MenuList from '@/components/mypage/MenuList';

export default function SellerMyPage() {
  const activityData = {
    월: 132,
    화: 0,
    수: 0,
    목: 0,
    금: 0,
    토: 0,
    일: 0,
  };

  const statsData = [
    { label: '리뷰 평점', value: '0' },
    { label: '리뷰수', value: '0' },
    { label: '팔로워', value: '0' },
  ];

  // const commerceMenuItems = [
  //   { path: '/register-product', label: '상품 등록하기' },
  //   { path: '/seller-mypage/products', label: '나의 상품 관리', count: 0 },
  //   { path: '/seller-mypage/product-inquiries', label: '상품 문의 관리', count: 0 },
  //   { path: '/seller-mypage/reviews', label: '리뷰' },
  // ];
  const commerceMenuItems = [
    { path: '/register-product', label: '상품 등록하기' },
    { path: '', label: '나의 상품 관리', count: 0 },
    { path: '', label: '상품 문의 관리', count: 0 },
    { path: '', label: '리뷰' },
  ];

  // const communityMenuItems = [
  //   { path: '/seller-mypage/posts', label: '작성 글', count: 0 },
  //   { path: '/seller-mypage/comments', label: '댓글', count: 0 },
  // ];
  const communityMenuItems = [
    { path: '', label: '작성 글', count: 0 },
    { path: '', label: '댓글', count: 0 },
  ];

  return (
    <div className='w-full bg-gray-100 h-full overflow-y-auto'>
      {/* 상단 프로필 섹션 */}
      <div className='w-full bg-white pt-4 px-5 pb-6'>
        <ProfileSection type='seller' />
        <StatsSection stats={statsData} />
        <MarketLinkCard to='/seller-market' title='개인 마켓으로 가기' subtitle='농장 기본 정보' />
      </div>

      <div className='h-3 bg-gray-100'></div>

      {/* 활동 분석 */}
      <ActivityAnalysis activityData={activityData} linkTo='#' />

      <div className='h-3 bg-gray-100'></div>

      {/* 커머스 메뉴 */}
      <MenuList title='커머스' menuItems={commerceMenuItems} />

      <div className='h-3 bg-gray-100'></div>

      {/* 커뮤니티 메뉴 */}
      <div className='pb-4'>
        <MenuList title='커뮤니티' menuItems={communityMenuItems} />
      </div>
    </div>
  );
}
