// src/components/ProductCard/RankBadge.jsx
import React from 'react';

export default function RankBadge({ rank }) {
  return (
    <div className='absolute top-0 left-0 bg-black bg-opacity-60 text-white text-sm font-bold px-3 py-1 rounded-tl-lg rounded-br-lg'>
      {rank}
    </div>
  );
}
