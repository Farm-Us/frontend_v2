import React from 'react';
import { ChevronRightIcon } from './Icons.jsx';

// children 이라는 특별한 prop을 사용해서 어떤 내용이든 감쌀 수 있는 만능 섹션 컴포넌트입니다.
export default function Section({ title, showMore = false, children }) {
  return (
    <section>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
        {showMore && (
          <button className='flex items-center text-sm text-gray-500 font-medium'>
            <span>더보기</span>
            <ChevronRightIcon />
          </button>
        )}
      </div>
      {/* 이 컴포넌트로 감싸진 내용이 여기에 표시됩니다. */}
      <div className='mt-4'>{children}</div>
    </section>
  );
}
