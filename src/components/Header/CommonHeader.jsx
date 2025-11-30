import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, XIcon } from '../Icons';

export default function CommonHeader({ leftButton = 'prev', rightButton = '', title = '' }) {
  const navigate = useNavigate();
  // 왼쪽 버튼 눌렸을 떄
  const handleLeftButtonClick = () => {
    navigate(-1);
    // if (leftButton === 'prev' && leftButton === 'close') {
    // navigate(-1);
    // }
    // return;
  };
  return (
    <header className='flex items-center justify-between px-4 h-[54px] flex-shrink-0'>
      {/* 왼쪽 버튼 */}
      <button
        type='button'
        onClick={handleLeftButtonClick}
        className='flex items-center gap-1 p-1 bg-none border-none cursor-pointer'>
        {leftButton === 'prev' && <ChevronLeftIcon />}
        {leftButton === 'close' && <XIcon />}
      </button>

      {/* 헤더 타이틀 */}
      <h1 className='text-lg font-semibold text-gray-800'>{title}</h1>

      {/* 완료 버튼 */}
      {rightButton ? (
        <button
          type='submit'
          disabled={!isValid}
          className={`text-base font-semibold ${
            isValid ? 'text-green-500 cursor-pointer' : 'text-gray-400'
          } bg-none border-none`}>
          올리기
        </button>
      ) : (
        <div></div>
      )}
    </header>
  );
}
