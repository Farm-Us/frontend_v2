import clsx from 'clsx';
import React from 'react';

export default function CustomButton({ children = '다음', disabled = false, onClick, className = '', ...props }) {
  return (
    <button
      className={clsx(
        // 피그마 기본 스타일 (컨테이너)
        'w-full h-12 px-4 py-3 rounded-2xl inline-flex justify-center items-center',
        'transition-all duration-200', // 부드러운 전환 효과

        // disabled 상태에 따른 조건부 스타일
        {
          // 활성 상태
          'bg-green-500 text-white hover:bg-green-700 hover:text-gray-200 active:bg-Brand-Primary-pressed cursor-pointer':
            !disabled,
          // 비활성 상태
          'bg-green-50 text-gray-200 cursor-not-allowed opacity-60': disabled,
        },

        // 추가 className
        className
      )}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}>
      <div
        className={clsx(
          // 피그마 텍스트 스타일
          "justify-start text-base font-semibold font-['Pretendard'] leading-normal",

          // 텍스트 색상 (disabled 상태별)
          {
            'text-Base-white': !disabled,
            'text-gray-500': disabled,
          }
        )}>
        {children}
      </div>
    </button>
  );
}
