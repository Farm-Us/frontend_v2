// src/components/community/PostHeader.jsx

import React, { useState } from 'react';

export default function PostHeader({ user }) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // TODO: 실제 팔로우/언팔로우 API 호출
  };

  return (
    <div className='flex items-center justify-between px-4 pb-3'>
      <div className='flex items-center gap-3'>
        {/* <img src={user.avatar} alt={user.name} className='w-8 h-8 rounded-full object-cover' /> */}
        <img src={user.userImage} alt={user.userName} className='w-8 h-8 rounded-full object-cover' />
        <span className='font-medium text-base text-gray-800'>{user.userName}</span>
      </div>
      <button
        onClick={handleFollowClick}
        className={`px-4 py-1 text-sm font-semibold transition-colors ${
          isFollowing ? 'text-gray-500 hover:text-gray-700' : 'text-green-500 hover:text-green-700'
        }`}>
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </div>
  );
}
