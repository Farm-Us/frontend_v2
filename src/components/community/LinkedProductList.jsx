// src/components/community/LinkedProductList.jsx

import React from 'react';
import LinkedProductCard from './LinkedProductCard.jsx';

const LinkedProductList = ({ products = [], onProductClick }) => {
  // 수정된 검증 로직
  if (!products || !Array.isArray(products) || products.length === 0) {
    console.log('No valid products to display');
    return null;
  }

  // console.log('LinkedProductList: Rendering products');
  return (
    <div className='self-stretch w-full px-5 py-2 inline-flex justify-start items-start gap-1 overflow-x-auto'>
      {products &&
        products.map((product) => (
          <LinkedProductCard key={product.id} product={product} onClick={() => onProductClick?.(product.id)} />
        ))}
    </div>
  );
};

export default LinkedProductList;
