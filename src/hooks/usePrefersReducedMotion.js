import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Replaces `useReducedMotion` from framer-motion.
 *
 * Reads the media query directly via matchMedia rather than using a
 * `useState` + `useEffect` pair, so the very first render already reflects
 * the user's preference — important because reduced-motion fallbacks swap
 * whole layouts (static wordmark, no scroll reveals) and a flash of animated
 * content before the effect runs is exactly what we are trying to avoid.
 *
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const handleChange = (event) => setPrefersReduced(event.matches);

    // Re-sync in case the preference changed between render and effect.
    handleChange(media);

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
