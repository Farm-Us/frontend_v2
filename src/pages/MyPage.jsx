import React from 'react';
import { Link } from 'react-router-dom';
import ProfileSection from '@/components/mypage/ProfileSection';
import CouponCard from '@/components/mypage/CouponCard';
import OrdersSection from '@/components/mypage/OrdersSection';
import MenuList from '@/components/mypage/MenuList';

export default function MyPage() {
  return (
    <div className='w-full bg-white h-full overflow-y-auto '>
      <div className='w-full h-[208px] bg-[#e8f9f2] px-5 flex flex-col justify-center gap-20'>
        <ProfileSection />
        <CouponCard count={0} />
      </div>
      <OrdersSection />
      <MenuList menuItems={menuItems} />
    </div>
  );
}

// const menuItems = [
//   { path: '/mypage/orders', label: '주문배송내역 조회' },
//   { path: '/mypage/likes', label: '좋아요' },
//   { path: '/mypage/bookmarks', label: '북마크' },
//   { path: '/mypage/reviews', label: '나의 리뷰' },
// ];
const menuItems = [
  { path: '', label: '주문배송내역 조회' },
  { path: '', label: '좋아요' },
  { path: '', label: '북마크' },
  { path: '', label: '나의 리뷰' },
];
