import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element has entered the viewport, for scroll-triggered
 * animations that CSS cannot express on its own.
 *
 * The main use is the branch graph: the browser will happily transition
 * `stroke-dashoffset`, but nothing triggers it on scroll, so the offset
 * has to be written from JS once, when the section lands.
 *
 * Reduced motion: the hook starts already `drawn`, so nothing ever has to
 * transition and the graph is complete on first paint. The end state is
 * always "drawn", so no user is ever left looking at an invisible graph.
 *
 * @param {object} options
 * @param {number} options.threshold
 * @param {string} options.rootMargin
 * @returns {[import('react').RefObject<HTMLElement>, boolean]}
 */
export function useDrawIn({ threshold = 0.2, rootMargin = '0px 0px -60px 0px' } = {}) {
  // Resolved once, at mount. Doing it in the state initialiser rather than
  // in the effect means the only setState left is inside the observer
  // callback, which is inherently asynchronous.
  const [drawn, setDrawn] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );

  const ref = useRef(null);

  useEffect(() => {
    if (drawn) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [drawn, threshold, rootMargin]);

  return [ref, drawn];
}