import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- hook ---
import { fetchById, useCommunityPosts } from '@/hooks/useCommunityPosts';

// --- 컴포넌트 ---
import CommonHeader from '@/components/Header/CommonHeader';
import ImageCarousel from '@/components/carousel/ImageCarousel';
import LinkedProductList from '@/components/community/LinkedProductList';
import PostInteractionBar from '@/components/social/PostInteractionBar';

export default function CommunityDetailPage() {
  const { id } = useParams();
  const { data: post, isLoading, error } = fetchById(id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    // 댓글 창 열기
  };

  const handleShare = () => {
    // 북마크 기능
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='w-full w-max-[480px]'>
        <CommonHeader />
        <div className='flex justify-center items-center h-screen'>
          <p className='text-gray-500'>로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='w-full w-max-[480px]'>
        <CommonHeader />
        <div className='flex justify-center items-center h-screen'>
          <p className='text-red-500'>포스트를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 데이터 없음
  if (!post) {
    return (
      <div className='w-full w-max-[480px]'>
        <CommonHeader />
        <div className='flex justify-center items-center h-screen'>
          <p className='text-gray-500'>포스트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full w-max-[480px]'>
      {/* 헤더  */}
      <CommonHeader />
      <main>
        {/* title */}
        <div className='w-full py-2 border-b'>
          <div className='px-6 py-4 flex justify-start items-center gap-1'>
            <h2 className='text-gray-800 text-mb font-semibold leading-snug'>{post?.title}</h2>
          </div>
        </div>
        <div className='py-4 flex flex-col justify-start items-start w-full'>
          {/* images */}
          {post?.mediaUrls && post?.mediaUrls.length > 0 && <ImageCarousel images={post?.mediaUrls} mode='read' />}

          {/* 상품 연결 */}
          {post?.items?.length > 0 && (
            <LinkedProductList products={post?.items} onProductClick={(id) => navigate(`/product-detail/${id}`)} />
          )}

          {/* 내용 */}
          <div className='px-5 w-full h-[264px] '>
            <p className='whitespace-pre-wrap text-gray-800 text-mb leading-relaxed'>{post?.content}</p>
          </div>
        </div>
      </main>

      {/* 인터렉션 바 추가 */}
      <PostInteractionBar
        likeCount={likeCount}
        commentCount={post?.commentCount || 0}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        isLiked={isLiked}
      />
    </div>
  );
}
