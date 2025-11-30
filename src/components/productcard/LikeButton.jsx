// src/components/ProductCard/LikeButton.jsx
import React, { useState } from 'react';
import HeartIcon from '../../assets/icons/heart.svg?react';

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => setIsLiked(!isLiked);

  return (
    <button onClick={handleLikeClick} className='absolute top-2 right-2 bg-black bg-opacity-30 rounded-full p-1'>
      <HeartIcon
        className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-white'}`}
        fill={isLiked ? 'currentColor' : 'none'}
      />
    </button>
  );
}
