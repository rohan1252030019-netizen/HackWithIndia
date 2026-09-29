import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can mark it active.
 *
 * Uses a band across the upper-middle of the viewport rather than
 * "last element with the top edge above y=0", which is the usual cause of
 * nav links flickering while scrolling. The section whose bounds overlap the
 * band wins; ties resolve to the one further up the page.
 *
 * @param {string[]} ids  Section element ids, in document order.
 * @param {object} options
 * @param {number} options.offset  Distance from the top of the viewport, px.
 * @returns {string|null} The active section id.
 */
export function useScrollSpy(ids, { offset = 120 } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !ids.length) return;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting);
        }

        // First visible id in document order wins.
        const visible = ids.filter((id) => visibility.get(id));
        setActiveId(visible[0] ?? null);
      },
      {
        // A thin band just below the sticky navbar.
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!nodes.length) return;

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
