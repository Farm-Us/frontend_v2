import React from 'react';

export default function CommunityPostSkeleton() {
  return (
    <div className='w-full border-b border-gray-200 p-4 animate-pulse'>
      {/* 사용자 정보 스켈레톤 */}
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
        <div className='flex-1'>
          <div className='w-24 h-4 bg-gray-300 rounded mb-2'></div>
          <div className='w-16 h-3 bg-gray-200 rounded'></div>
        </div>
      </div>

      {/* 제목 스켈레톤 */}
      <div className='mb-3'>
        <div className='w-full h-5 bg-gray-300 rounded mb-2'></div>
        <div className='w-4/5 h-5 bg-gray-300 rounded'></div>
      </div>

      {/* 이미지 스켈레톤 */}
      <div className='w-full h-48 bg-gray-300 rounded-lg mb-3'></div>

      {/* 인터렉션 바 스켈레톤 */}
      <div className='flex gap-8 pt-3'>
        <div className='w-12 h-6 bg-gray-300 rounded'></div>
        <div className='w-12 h-6 bg-gray-300 rounded'></div>
        <div className='w-12 h-6 bg-gray-300 rounded'></div>
      </div>
    </div>
  );
}
