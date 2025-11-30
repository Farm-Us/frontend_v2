// src/components/social/PostInteractionBar.jsx

import React from 'react';
import InteractionButton from './InteractionButton';
import { InteractHeartIcon, CommentIcon, BookmarkIcon } from '../Icons';

const PostInteractionBar = ({ likeCount = 33, commentCount = 3, onLike, onComment, onShare, isLiked = false }) => {
  return (
    <div className='self-stretch w-full px-5 py-3 grid grid-cols-3 items-center'>
      {/* 좌측 인터랙션 버튼들 */}
      <div className='flex justify-start items-center gap-3.5'>
        {/* 좋아요 */}
        <InteractionButton
          icon={<InteractHeartIcon filled={isLiked} />}
          count={likeCount}
          onClick={onLike}
          active={isLiked}
        />

        {/* 댓글 */}
        <InteractionButton icon={<CommentIcon />} count={commentCount} onClick={onComment} />
      </div>

      {/* 중간 공간 */}
      <div></div>

      {/* 북마크 버튼 - 오른쪽 정렬 */}
      <div className='flex justify-end'>
        <button onClick={onShare} className='w-6 h-6 relative overflow-hidden hover:opacity-70 transition-opacity'>
          <BookmarkIcon />
        </button>
      </div>
    </div>
  );
};

export default PostInteractionBar;
