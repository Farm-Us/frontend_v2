// src/components/ProductCard/Rating.jsx
import React from 'react';
import StarIcon from '@/assets/icons/star.svg?react';

export default function Rating({ rating, reviews }) {
  return (
    <div className='flex items-center text-xs text-gray-500 mt-1'>
      <StarIcon className='w-4 h-4 text-yellow-400' />
      <span className='ml-1 font-bold'>{rating}</span>
      <span className='ml-1'>({reviews})</span>
    </div>
  );
}
