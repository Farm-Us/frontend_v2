import React from 'react';

const HeartIcon = ({ filled = false }) => (
  <svg
    className={`w-6 h-6 ${filled ? 'text-red-500' : 'text-white'}`}
    fill={filled ? 'currentColor' : 'none'}
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z'></path>
  </svg>
);

export default function StoryCard({ story }) {
  return (
    <div className='flex-shrink-0 w-full sm:w-72'>
      <div className='relative'>
        <img src={story.image} alt={story.title} className='w-full h-48 object-cover rounded-lg bg-gray-200' />
        <button className='absolute top-3 right-3 bg-black bg-opacity-30 rounded-full p-1'>
          <HeartIcon />
        </button>
      </div>
      <div className='mt-3'>
        <p className='font-bold text-gray-800 text-lg line-clamp-1'>{story.title || story.content}</p>
        <div className='flex items-center text-sm text-gray-500 mt-2'>
          <img src={story.user.avatar} alt={story.user.name} className='w-6 h-6 rounded-full mr-2' />
          <span>{story.user.name}</span>
          <span className='mx-2'>·</span>
          <span>{story.time}</span>
        </div>
      </div>
    </div>
  );
}
