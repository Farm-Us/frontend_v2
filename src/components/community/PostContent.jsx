// src/components/community/PostContent.jsx

import React from 'react';

export default function PostContent({ content }) {
  return (
    <div className='w-full px-4 mb-3'>
      <p className='text-gray-800 text-sm leading-relaxed whitespace-pre-wrap'>{content}</p>
    </div>
  );
}
