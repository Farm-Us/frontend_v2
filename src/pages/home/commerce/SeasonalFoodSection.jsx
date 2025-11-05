import React from 'react';
import Section from '@/components/Section.jsx';
import ProductCard from '@/components/productcard/ProductCard.jsx';
import useDragScroll from '@/hooks/useDragScroll.js';

export default function SeasonalFoodSection({ seasonalProducts, title = '10월 인기 제철음식' }) {
  const { scrollRef, dragHandlers, isDragging } = useDragScroll();

  return (
    <Section title={title} showMore={true}>
      <div className='-mx-4'>
        <div
          // className='flex space-x-4 overflow-x-auto px-4 pb-4'
          ref={scrollRef}
          className={`flex space-x-4 overflow-x-auto px-4 pb-4 hide-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          {...dragHandlers}
          style={{ userSelect: 'none' }}>
          {seasonalProducts.map((product) => (
            <ProductCard key={product.id} product={product} type='ranked' />
          ))}
        </div>
      </div>
    </Section>
  );
}
