// src/components/community/CommunityPost.jsx
import React, { useState } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostImageWithTags from './PostImageWithTag';
import PostInteractionBar from '@/components/social/PostInteractionBar';
import LinkedProductList from './LinkedProductList';
import { useNavigate } from 'react-router-dom';
import { seller } from '../../data';
import CommentBottomSheet from '../modal/CommentBottomSheet';
import { set } from 'react-hook-form';

export default function CommunityPost({ post, mode='view' }) {
  // 게시글 작성자 정보 검색하는 API가 없어서 그냥 목데이터 호출
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const navigate = useNavigate();
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // API 호출
  };

  const handleComment = () => {
    // 댓글 창 열기
    // CommentBottomSheet 열기
    console.log('댓글 클릭');
    setIsCommentOpen(true);
  };

  const handleShare = () => {
    // 북마크 기능
    console.log('북마크 클릭');
  };

  const onProductClick = (id) => {
    // 상품 디테일로 이동
    console.log('클릭한 상품', id);
    navigate(`/product-detail/${id}`);
  };

  return (
    <article className='w-full py-6'>
      {/* <PostHeader user={post.user} /> */}
      <PostHeader user={seller} />

      <div onClick={() => navigate(`/community/${post?.postId}`)} className='hover:cursor-pointer'>
        <p className='px-4 mb-3 text-[16px] font-semibold'>{post?.title}</p>
        <PostContent content={post?.content} />
      </div>

      {/* 이미지 추가 */}
      {post?.mediaUrls && post?.mediaUrls.length > 0 && <PostImageWithTags post={post} mode={mode} />}

      {/* 상품 데이터 */}
      {Array.isArray(post?.items) && post?.items.length > 0 && (
        <div className='hover:cursor-pointer'>
          <LinkedProductList products={post?.items} onProductClick={onProductClick} />
        </div>
      )}

      {/* 인터랙션 바 추가 */}
      <PostInteractionBar
        likeCount={likeCount}
        commentCount={post?.commentCount || 0}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        isLiked={isLiked}
      />

      {/* 코멘트 바텀 시트 */}
      <CommentBottomSheet 
        isOpen={isCommentOpen}
        postId={post?.postId} 
        onClose={() => setIsCommentOpen(false)} 
      />
    </article>
  );
}
