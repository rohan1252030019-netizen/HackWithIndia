import { useEffect, useRef, useState } from 'react';

/**
 * Adds a class to an element the first time it enters the viewport.
 *
 * This is a CSS-animation replacement for `motion.div whileInView`, which
 * was being used for simple fade-and-rise reveals. The visual result is
 * identical (see `.reveal` in index.css) but costs no JavaScript per frame
 * and no motion runtime instance per card.
 *
 * Honours prefers-reduced-motion through the CSS media query — the class is
 * still applied, the transition is what gets disabled.
 *
 * @param {object} options
 * @param {number} options.delay  Stagger delay in ms, applied as a CSS var.
 * @param {string} options.rootMargin
 * @returns {[import('react').RefObject<HTMLElement>, string]} ref, className
 */
export function useReveal({ delay = 0, rootMargin = '0px 0px -40px 0px' } = {}) {
  // No IntersectionObserver means no viewport triggers, so start visible.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const ref = useRef(null);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  const className = visible ? 'reveal is-visible' : 'reveal';
  const style = delay ? { '--reveal-delay': `${delay}ms` } : undefined;

  return [ref, className, style];
}
