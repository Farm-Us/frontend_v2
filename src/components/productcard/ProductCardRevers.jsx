import React from 'react';
import { StarIcon } from '../Icons';

export default function ProductCardRevers({
  itemName = '[사전구매] 무농약 따스한 햇살담은 딸기 1kg',
  itemPrice = 15000,
  discount = 10,
  rating = 0.0,
  reviews = 0,
  image = 'https://placehold.co/80x80',
  isSelected = false,
  onSelect,
}) {
  const discountPrice = (discount, price) => {
    if (discount > 0) {
      const discounted = price - (price * discount) / 100;
      return Math.round(discounted).toLocaleString();
    } else return price.toLocaleString();
  };
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-3 px-3 gap-3'>
      {/* --- 상품 정보 영역 --- */}
      <div className='flex items-center gap-3 w-full sm:w-auto'>
        {/* 이미지 */}
        <img src={image} alt={itemName} className='w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0' />

        {/* 텍스트 정보 */}
        <div className='flex flex-col justify-between flex-1 min-w-0'>
          <div className='text-gray-700 text-sm font-bold line-clamp-2'>{itemName}</div>

          <div className='flex gap-1 text-gray-900 text-base font-semibold mt-1'>
            {discount > 0 && <span className='text-red-500 mr-1'>{discount}%</span>}
            <span>{discountPrice(discount, itemPrice)}원</span>
          </div>

          <div className='flex items-center gap-1 mt-1'>
            {/* 간단한 별 모양 대신 사각형 아이콘 대체 */}
            {/* <div className='w-3 h-3 bg-gray-500 rounded-sm' /> */}
            <StarIcon className='w-3 h-3 bg-gray-500' />
            <span className='text-gray-500 text-xs font-medium'>{rating}</span>
            <span className='text-gray-500 text-xs font-medium'>({reviews})</span>
          </div>
        </div>
      </div>

      {/* --- 선택 버튼 --- */}
      <button
        onClick={() => {
          console.log('✅ 상품 선택 클릭:', { itemName, itemPrice, isSelected });
          onSelect();
        }}
        className={`self-end sm:self-center px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
          isSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500 hover:bg-green-200'
        }`}>
        {isSelected ? '✓ 선택됨' : '선택'}
      </button>
    </div>
  );
}
