// src/components/community/PostImageWithTags.jsx

import React from 'react';
// components
import ProductTagButton from './ProductTagButton';
import ImageCarousel from '../carousel/ImageCarousel';

export default function PostImageWithTags({ post }) {
  return (
    <div className='relative w-full h-[375px] bg-gray-100'>
      {/* <img src={post?.mediaUrls[0]} alt='게시물 이미지' className='w-full h-full object-cover' /> */}
      <ImageCarousel images={post?.mediaUrls || []} />

      {post?.tags?.map((tag, index) => (
        <div key={index}>
          <ProductTagButton tag={tag} onClick={() => {}} />
        </div>
      ))}
    </div>
  );
}
