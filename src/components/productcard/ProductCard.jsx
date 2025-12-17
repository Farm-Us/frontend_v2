/** src/components/ProductCard/ProductCard.jsx
 * 상품 카드 컴포넌트
 * @param {product, type, size} 상품 정보와 카드 타입 유형(small, ranked, none), 크기(default, large)
 * @returns
 */
import React from 'react';
import RankBadge from './RankBadge';
import Rating from './Rating';
import LikeButton from './LikeButton';
export default function ProductCard({ product, type = 'small', size = 'default' }) {
  // size에 따른 크기 설정
  const getSizeClasses = () => {
    if (size === 'large') {
      return {
        cardSize: 'w-full',
        imageSize: 'h-48'
      };
    }
    // default size
    return {
      cardSize: type === 'ranked' ? 'w-40' : 'w-36',
      imageSize: type === 'ranked' ? 'h-40' : 'h-36'
    };
  };

  const { cardSize, imageSize } = getSizeClasses();

  return (
    <div className={`flex-shrink-0 ${cardSize} `}>
      <div className='relative'>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full ${imageSize} object-cover rounded-lg bg-gray-200`}
        />

        {type === 'ranked' && product.rank && <RankBadge rank={product.rank} />}
        {type === 'small' && <LikeButton />}
      </div>

      <div className='mt-2'>
        <p className='text-sm text-gray-700 font-medium truncate'>{product.itemName || product.name}</p>

        <div className='flex items-center mt-1'>
          <span className='text-red-500 font-bold'>{product.discount}</span>
          <span className='text-gray-900 font-bold ml-2'>{product.price}</span>
        </div>

        {type === 'ranked' && product.rating && <Rating rating={product.rating} reviews={product.reviews} />}
      </div>
    </div>
  );
}
