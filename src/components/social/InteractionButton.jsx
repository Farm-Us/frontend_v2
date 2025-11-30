// src/components/social/InteractionButton.jsx

import React from 'react';

const InteractionButton = ({ icon, count, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className='flex justify-start items-center gap-2 hover:opacity-70 transition-opacity pr-3'>
      {/* 아이콘 */}
      <div className='w-6 h-6 relative overflow-hidden'>{icon}</div>

      {/* 카운트 */}
      <div
        className={` justify-start text-sm font-normal font-['Pretendard'] leading-tight ${
          active ? 'text-red-500' : 'text-neutral-600'
        }`}>
        {count}
      </div>
    </button>
  );
};

export default InteractionButton;
