// src/pages/CommunityPage.jsx

import React, { useState } from 'react';

// --- components ---
import OutlineCategoryChips from '../../components/chips/OutlineCategoryChips';
import CommunityPost from '../../components/community/CommunityPost';
import WriteButton from '@/components/button/WriteButton';

// --- 임시 목 데이터 ---
import { farmerStories } from '@/data';
import { useUserCheck } from '../../hooks/useUserInfo';

// const filterCategories = ['전체', '공예품', '농산물', '수산물', '농장체험', '축산업'];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const { isSeller } = useUserCheck();

  // 필터링된 게시물
  const filteredPosts = farmerStories?.filter((post) => activeFilter === '전체' || post.category === activeFilter);

  return (
    <div className='relative '>
      {/* 카테고리 필터 */}
      {/* <div className='flex w-full items-center gap-2 px-4 py-2 overflow-x-auto bg-white sticky top-0 z-10'>
        <OutlineCategoryChips
          categories={filterCategories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div> */}

      {/* 게시물 목록 */}
      <div className='flex flex-col w-full items-start bg-white'>
        {filteredPosts &&
          filteredPosts?.map((post) => (
            <CommunityPost
              key={post.id}
              post={post}
              activeTooltipId={activeTooltipId}
              setActiveTooltipId={setActiveTooltipId}
            />
          ))}
      </div>

      {/* 플로트 버튼 */}
      {isSeller && <WriteButton />}
    </div>
  );
}
