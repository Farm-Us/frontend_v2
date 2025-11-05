// src/components/community/ProductTagButton.jsx

import React from 'react';
// icon
import Tag from '@/assets/icons/tag.svg?react';

export default function ProductTagButton({ tag, onClick }) {
  return (
    <button
      onClick={onClick}
      className='absolute w-6 h-6 bg-black rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow'
      style={{ bottom: `${15}px`, left: `${19}px` }}>
      <Tag />
    </button>
  );
}
