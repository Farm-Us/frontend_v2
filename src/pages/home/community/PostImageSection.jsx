import React from 'react';
import TagMarker from '@/components/marker/TagMarker';

export default function PostImageSection({ post, activeTooltipId, setActiveTooltipId }) {
  return (
    <div className='relative w-full h-[375px] bg-gray-100'>
      <img src={post.mediaUrls[0]} alt='게시물 이미지' className='w-full h-full object-cover' />

      {post.tags &&
        post.tags.map((tag, index) => (
          <TagMarker
            key={index}
            tag={tag}
            post={post}
            activeTooltipId={activeTooltipId}
            setActiveTooltipId={setActiveTooltipId}
          />
        ))}
    </div>
  );
}
