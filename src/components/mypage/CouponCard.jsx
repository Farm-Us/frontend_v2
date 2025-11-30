import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CouponIcon } from '../Icons';

export default function CouponCard({ count = 0 }) {
  return (
    <Link
      // to='/mypage/coupons'
      className='flex p-4 mt-[-40px] mx-4 bg-white rounded-xl shadow-md justify-between items-center z-10 relative'>
      <div className='flex items-center space-x-3'>
        <CouponIcon />
        <span className='text-base font-medium text-gray-900'>쿠폰함</span>
        <span className='text-mb font-semibold text-green-500'>{count}</span>
      </div>
      <div className='flex items-center'>
        <ChevronRightIcon />
      </div>
    </Link>
  );
}
