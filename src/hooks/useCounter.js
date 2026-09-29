import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion.js';

/** Without IntersectionObserver there is no viewport trigger — show the value. */
const SUPPORTS_IO = typeof IntersectionObserver !== 'undefined';

/**
 * Counts up to `target` once the element scrolls into view.
 *
 * Uses requestAnimationFrame with a time-based easeOutExpo curve rather than
 * a fixed interval, so the duration is constant regardless of magnitude.
 *
 * Under prefers-reduced-motion (or without IntersectionObserver) the final
 * value is returned directly — no effect, no state churn.
 *
 * @param {string|number} target  Non-digits are stripped, so "50000+" works.
 * @param {object} options
 * @param {number} options.duration  Animation length in ms.
 * @returns {[import('react').RefObject<HTMLElement>, string, boolean]} ref, formatted value, isCounting
 */
export function useCounter(target, { duration = 1600 } = {}) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const end = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;

  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || !SUPPORTS_IO || end === 0) return;

    const node = ref.current;
    if (!node) return;

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        setIsCounting(true);

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.round(end * eased));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          } else {
            setCount(end);
            setIsCounting(false);
          }
        };

        frame = requestAnimationFrame(step);
      },
      { rootMargin: '-40px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration, shouldReduceMotion]);

  const value = (shouldReduceMotion || !SUPPORTS_IO ? end : count).toLocaleString('en-IN');
  return [ref, value, isCounting];
}
