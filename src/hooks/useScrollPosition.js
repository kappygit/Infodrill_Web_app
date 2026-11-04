import { useState, useEffect } from 'react';

/**
 * Optimized scroll position listener using passive event listener
 * Returns current scrollY, boolean isScrolled, percentage scrollProgress, and scrollDirection
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;

          setScrollY(currentScroll);
          setIsScrolled(currentScroll > 25);
          setScrollProgress(progress);

          if (Math.abs(currentScroll - lastScrollY) > 5) {
            setScrollDirection(currentScroll > lastScrollY ? 'down' : 'up');
            lastScrollY = currentScroll;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isScrolled, scrollProgress, scrollDirection };
}
