// src/pages/CommunityPage.jsx

import React, { useState, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

// --- components ---
import CommunityPost from '../../components/community/CommunityPost';
import CommunityPostSkeleton from '../../components/community/CommunityPostSkeleton';
import WriteButton from '@/components/button/WriteButton';

// --- 임시 목 데이터 ---
import { farmerStories } from '@/data';
import { useUserCheck } from '../../hooks/useUserInfo';
import { communityApi } from '@/services/communityApi';

// const filterCategories = ['전체', '공예품', '농산물', '수산물', '농장체험', '축산업'];

export default function CommunityPage() {
  const { isSeller } = useUserCheck();
  const observerTarget = useRef(null);

  // useInfiniteQuery로 무한스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['communityPosts'],
    queryFn: ({ pageParam = 0 }) =>
      communityApi.getPosts({
        page: pageParam,
        size: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content && lastPage.content.length > 0 && !lastPage.last) {
        return allPages.length;
      }
      return undefined;
    },
    staleTime: 10000 * 60 * 5,
  });

  // Intersection Observer 설정
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  React.useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  // 페이지별 데이터를 평탄화
  const posts = data?.pages.flatMap((page) => page.content) || [];

  // 게시물
  return (
    <div className='relative '>
      {/* 게시물 목록 */}
      <div className='flex flex-col w-full items-start bg-white'>
        {isLoading ? (
          // 로딩 중 스켈레톤 표시
          Array.from({ length: 3 }).map((_, index) => <CommunityPostSkeleton key={index} />)
        ) : isError ? (
          <p className='p-4'>오류가 발생했습니다.</p>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <CommunityPost key={post?.postId} post={post} mode='view' />
            ))}
            {isFetchingNextPage && (
              <div className='p-4 text-center text-gray-500'>로딩 중...</div>
            )}
            <div ref={observerTarget} className='h-5' />
          </>
        ) : (
          <p className='p-4'>커뮤니티 글이 없습니다.</p>
        )}
      </div>

      {/* 플로트 버튼 */}
      {isSeller && <WriteButton />}
    </div>
  );
}
