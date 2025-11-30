import React from 'react';
import Section from '@/components/Section.jsx';
import StoryCard from '@/components/StoryCard.jsx';
import useDragScroll from '@/hooks/useDragScroll.js';

export default function StorySection({ farmerStories }) {
  const { scrollRef, dragHandlers, isDragging } = useDragScroll();
  return (
    <Section title='농부의 이야기를 확인해보세요' showMore={true}>
      <div
        ref={scrollRef}
        className={`flex space-x-4 overflow-x-auto pb-4 hide-scrollbar ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        {...dragHandlers}
        style={{ userSelect: 'none' }}>
        {farmerStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </Section>
  );
}
