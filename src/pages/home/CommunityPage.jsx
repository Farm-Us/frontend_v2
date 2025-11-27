// src/pages/CommunityPage.jsx

import React, { useState } from 'react';

// --- components ---
import CommunityPost from '../../components/community/CommunityPost';
import WriteButton from '@/components/button/WriteButton';

// --- 임시 목 데이터 ---
import { farmerStories } from '@/data';
import { useUserCheck } from '../../hooks/useUserInfo';
import { useCommunityPosts } from '../../hooks/useCommunityPosts';

// const filterCategories = ['전체', '공예품', '농산물', '수산물', '농장체험', '축산업'];

export default function CommunityPage() {
  // 카테고리 내용 호출
  const { fetchedPosts: filteredPosts } = useCommunityPosts({ pageParam: 0 });
  console.log(filteredPosts);
  // TODO: 물품 호출(필요시)

  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const { isSeller } = useUserCheck();

  // 게시물
  // const filteredPosts = allPosts;
  // console.log(filteredPosts);
  return (
    <div className='relative '>
      {/* 게시물 목록 */}
      <div className='flex flex-col w-full items-start bg-white'>
        {filteredPosts ? (
          filteredPosts?.map((post) => (
            <CommunityPost
              key={post?.postId}
              post={post}
              activeTooltipId={activeTooltipId}
              setActiveTooltipId={setActiveTooltipId}
            />
          ))
        ) : (
          <p className='p-4'>커뮤니티 글이 없습니다.</p>
        )}
      </div>

      {/* 플로트 버튼 */}
      {isSeller && <WriteButton />}
    </div>
  );
}
