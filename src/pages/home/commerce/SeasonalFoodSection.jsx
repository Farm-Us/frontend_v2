import React from 'react';
import Section from '@/components/Section.jsx';
import ProductCard from '@/components/productcard/ProductCard.jsx';

export default function SeasonalFoodSection({ seasonalProducts, title = '10월 인기 제철음식' }) {
  return (
    <Section title={title} showMore={true}>
      <div className='grid grid-cols-2 -mx-4 px-4 gap-y-2 gap-x-8'>
        {seasonalProducts.map((product) => (
          <ProductCard key={product.id} product={product} type='ranked' size='large' />
        ))}
      </div>
    </Section>
  );
}
