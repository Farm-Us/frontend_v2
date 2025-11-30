import React from 'react';

export default function TagMarker({ tag, post, activeTooltipId, setActiveTooltipId }) {
  return (
    <div>
      <button
        onClick={() => setActiveTooltipId(activeTooltipId === post.id ? null : post.id)}
        className='absolute w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer'
        // style={{ top: `${tag.y}px`, left: `${tag.x}px` }}
      >
        <div className='w-2.5 h-2.5 bg-green-500 rounded-full'></div>
      </button>
      {activeTooltipId === post.id && <ProductTooltip product={post.product} position={tag} />}
    </div>
  );
}
