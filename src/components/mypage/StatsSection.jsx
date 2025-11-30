// components/mypage/StatsSection.jsx
import React from 'react';

export default function StatsSection({ stats }) {
  return (
    <div className='mt-6 flex justify-around text-center'>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className='flex flex-col items-center'>
            <span className='text-xl font-bold text-gray-800'>{stat.value}</span>
            <span className='text-sm text-gray-500 mt-1'>{stat.label}</span>
          </div>
          {index < stats.length - 1 && <div className='w-px bg-gray-200 h-8 self-center'></div>}
        </React.Fragment>
      ))}
    </div>
  );
}
