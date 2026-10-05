import { useEffect, useState } from 'react';

/**
 * Which stop is currently on screen, as an INDEX into the stop array.
 *
 * This is not `useScrollSpy` (which returns an id) because the route rail
 * needs the ordinal: it has to say "Stop 04 / 10" and work out what the
 * next stop is.
 *
 * Uses a band across the upper-middle of the viewport rather than "last
 * heading above y=0", which is the usual cause of wayfinding flickering
 * mid-scroll. Ties resolve to whichever is further up the page — which is
 * what someone riding a bus expects.
 *
 * @param {string[]} ids  Section element ids, in document order.
 * @param {object} options
 * @param {number} options.offset  Distance from the top of the viewport, px.
 * @returns {number} Index into `ids`. 0 before anything has been reached.
 */
export function useActiveStopIndex(ids, { offset = 140 } = {}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !ids.length) return;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.isIntersecting);

        const firstVisible = ids.findIndex((id) => visibility.get(id));
        setIndex(firstVisible === -1 ? 0 : firstVisible);
      },
      {
        // A thin band below the fixed navbar, cutting off the bottom 60% so
        // a section only counts once its heading is genuinely on screen.
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return;

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids, offset]);

  return index;
}