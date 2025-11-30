// hooks/useDragScroll.js
import { useRef, useState, useCallback } from 'react';

export default function useDragScroll() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDown(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDown(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDown || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDown, startX, scrollLeft]
  );

  const dragHandlers = {
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onMouseMove: handleMouseMove,
  };

  return {
    scrollRef,
    dragHandlers,
    isDragging: isDown,
  };
}
