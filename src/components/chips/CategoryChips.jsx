import React from 'react';
import useDragScroll from '@/hooks/useDragScroll.js';

// 1. 카테고리 칩
function CategoryChips({ categories, activeChip, setActiveChip }) {
  const { scrollRef, dragHandlers, isDragging } = useDragScroll();

  return (
    <div
      // className='flex space-x-2 overflow-x-auto pb-2 -mb-2'
      ref={scrollRef}
      className={`flex space-x-2 overflow-x-auto pb-2 -mb-8 hide-scrollbar ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      {...dragHandlers}
      style={{ userSelect: 'none' }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveChip(category)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium ${
            activeChip === category
              ? 'bg-green-100 text-green-500 border border-green-500'
              : 'border border-gray-100 text-gray-700'
          }`}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
