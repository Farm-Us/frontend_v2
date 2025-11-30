// src/components/community/LinkedProductCard.jsx

import React from 'react';

const LinkedProductCard = ({ product, onClick }) => {
  const discountPrice = (discountRate, price) => {
    if (!discountRate) return price.toLocaleString();
    const discount = price * (1 - discountRate / 100);
    return discount.toLocaleString();
  };

  return (
    <button
      onClick={onClick}
      className='w-64 bg-white rounded border border-gray-200 flex justify-start items-center gap-2 overflow-hidden hover:shadow-sm transition-shadow flex-shrink-0'>
      <img className='w-14 h-14 object-cover' src={product?.thumbnailUrl} alt={product?.name} />
      <div className='flex-1 inline-flex flex-col justify-center items-start p-2'>
        <div className="self-stretch text-neutral-900 text-xs font-medium font-['Pretendard'] leading-none text-left line-clamp-2">
          {product?.name}
        </div>
        <div className='self-stretch inline-flex justify-start items-center gap-0.5 mt-1'>
          {product?.discountRate && (
            <span className="text-red-500 text-sm font-semibold font-['Pretendard'] leading-tight">
              {product?.discountRate}%
            </span>
          )}
          <span className="text-neutral-900 text-sm font-semibold font-['Pretendard'] leading-tight">
            {discountPrice(product?.discountRate, product?.price)}원
          </span>
        </div>
      </div>
    </button>
  );
};

export default LinkedProductCard;
