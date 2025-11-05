// components/FormGuideCard.jsx
import React, { useState } from 'react';
import ChevronBottom from '@/assets/icons/chevron-bottom.svg?react';
import ChevronUp from '@/assets/icons/chevron-up.svg?react';

export default function FormGuideCard({
  title = '이런 사진이 좋아요!',
  guidelines = [
    '저화질, 초점이 나간 이미지는 피해주세요',
    '상품을 잘 나타내는 직관적인 이미지를 선택해주세요',
    '배경은 너무 어둡지 않게 촬영해주세요',
  ],
  exampleImages = [],
  className = '',
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const GuideCard = ({ showExample = false }) => (
    <div className='w-full p-2 bg-gray-50 rounded-lg flex flex-col gap-2'>
      {/* 예시 이미지 영역 */}
      {showExample && (
        <div className='w-full h-full bg-gray-100 rounded overflow-hidden'>
          {exampleImages.length > 0 ? (
            <div className='w-full h-full'>
              {exampleImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt || `예시 이미지 ${index + 1}`}
                  className='w-full h-full object-cover '
                />
              ))}
            </div>
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <span className='text-gray-500 text-xs text-center'>예시 이미지가 준비중입니다</span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      <div className='w-full p-2 bg-gray-50 rounded-lg flex flex-col gap-2'>
        {/* 헤더 */}
        <div className='flex justify-start items-center gap-2 flex-wrap'>
          <div className='px-2 py-1 bg-green-500 rounded flex justify-center items-center gap-1 flex-shrink-0'>
            <span className='text-white text-xs font-semibold  leading-tight'>추천</span>
          </div>
          <h3 className='text-green-500 text-mb font-semibold  leading-snug flex-1'>{title}</h3>
        </div>
        {/* 가이드라인 */}
        <ul className='text-gray-1000 text-sm font-normal leading-snug w-full space-y-2 list-disc list-inside'>
          {/* {guidelines.join('\n')} */}
          {guidelines &&
            guidelines.map((value, index) => {
              const lines = value.split('\n');
              return (
                <li key={`li-${index}`}>
                  {lines[0]}
                  {lines.slice(1).map((line, lineIndex) => (
                    <div key={`lines-${lineIndex}`} className='text-gray-500 ml-5 mt-1'>
                      {line}
                    </div>
                  ))}
                </li>
              );
            })}
        </ul>

        {exampleImages.length > 0 && (
          <>
            {/* 토글 버튼 */}
            <div className='flex justify-end'>
              <button
                className='flex items-center cursor-pointer hover:opacity-80 transition-opacity gap-1'
                onClick={toggleExpanded}>
                <span className='text-gray-500 text-xs sm:text-sm font-normal leading-tight'>
                  {isExpanded ? '접기' : '예시 이미지 보기'}
                </span>
                {isExpanded ? <ChevronUp className='w-4 h-4' /> : <ChevronBottom className='w-4 h-4' />}
              </button>
            </div>
            {isExpanded && <GuideCard showExample={true} />}
          </>
        )}
      </div>
    </div>
  );
}
