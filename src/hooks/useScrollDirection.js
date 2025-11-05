// hooks/useScrollDirection.js
import { useState, useEffect, useRef } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 최상단에 있을 때는 항상 보이게
      if (currentScrollY <= 10) {
        setScrollDirection('up');
        setPrevScrollY(currentScrollY);
        return;
      }

      // 스크롤 방향 감지 (최소 5px 이상 움직일 때만 감지)
      if (Math.abs(currentScrollY - prevScrollY) < 5) {
        return;
      }

      const direction = currentScrollY > prevScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return scrollDirection;
};

export const useHeaderHeight = (location) => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [location.pathname]);

  return { headerHeight, headerRef };
};
