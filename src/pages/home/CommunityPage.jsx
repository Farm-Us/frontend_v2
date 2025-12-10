// src/pages/CommunityPage.jsx

import React, { useState } from 'react';

// --- components ---
import CommunityPost from '../../components/community/CommunityPost';
import CommunityPostSkeleton from '../../components/community/CommunityPostSkeleton';
import WriteButton from '@/components/button/WriteButton';

// --- 임시 목 데이터 ---
import { farmerStories } from '@/data';
import { useUserCheck } from '../../hooks/useUserInfo';
import { useCommunityPosts } from '../../hooks/useCommunityPosts';

// const filterCategories = ['전체', '공예품', '농산물', '수산물', '농장체험', '축산업'];

export default function CommunityPage() {
  // 카테고리 내용 호출
  const { fetchedPosts: filteredPosts, loading } = useCommunityPosts({ pageParam: 0 });
  // TODO: 댓글 기능 추가 시, 댓글, 좋아요 등 상태를 전역으로 관리 필요
  

  const { isSeller } = useUserCheck();
  console.log('isSeller:', isSeller);

  // 게시물
  return (
    <div className='relative '>
      {/* 게시물 목록 */}
      <div className='flex flex-col w-full items-start bg-white'>
        {loading ? (
          // 로딩 중 스켈레톤 표시
          Array.from({ length: 3 }).map((_, index) => <CommunityPostSkeleton key={index} />)
        ) : filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts?.map((post) => (
            <CommunityPost
              key={post?.postId}
              post={post}
              mode='view'
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
