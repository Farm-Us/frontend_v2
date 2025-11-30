// components/mypage/MarketLinkCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, UserIcon } from '../Icons';

export default function MarketLinkCard({ to, title, subtitle, icon: Icon = UserIcon }) {
  return (
    <Link to={to} className='mt-6 flex p-3 bg-gray-100 rounded-lg justify-between items-center'>
      <div className='flex items-center space-x-3'>
        <div className='bg-green-100 p-1.5 rounded-full'>
          <Icon className='w-5 h-5 text-green-600' />
        </div>
        <div>
          <p className='text-base font-semibold text-gray-800'>{title}</p>
          <p className='text-sm text-gray-600'>{subtitle}</p>
        </div>
      </div>
      <ChevronRightIcon />
    </Link>
  );
}
