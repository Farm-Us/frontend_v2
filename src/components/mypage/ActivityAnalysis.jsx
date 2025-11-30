// components/mypage/ActivityAnalysis.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../Icons';
// import { ChevronRightIcon } from '../Icons';

const StatBar = ({ day, value, maxValue }) => {
  const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div className='flex flex-col items-center justify-end h-full gap-2'>
      <span className='text-xs text-gray-800'>{value}</span>
      <div
        className={`w-full rounded-t ${value > 0 ? 'bg-green-500' : 'bg-gray-200'}`}
        style={{ height: `${heightPercentage}%`, minHeight: '4px' }}></div>
      <span className='text-xs text-gray-500'>{day}</span>
    </div>
  );
};

export default function ActivityAnalysis({ activityData, linkTo }) {
  const maxValue = Math.max(...Object.values(activityData));
  const total = Object.values(activityData).reduce((sum, value) => sum + value, 0);

  return (
    <div className='p-5 bg-white'>
      <Link to={linkTo || '#'} className='flex justify-between items-center'>
        <h3 className='text-base font-bold text-gray-900'>활동분석</h3>
        <ChevronRightIcon />
      </Link>
      <div className='mt-4'>
        <p className='text-base '>프로필 열람수</p>
        <div className='mt-4 h-28 grid grid-cols-7 gap-3'>
          {Object.entries(activityData).map(([day, value]) => (
            <StatBar key={day} day={day} value={value} maxValue={maxValue} />
          ))}
        </div>
      </div>
    </div>
  );
}
