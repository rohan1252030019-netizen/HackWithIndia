import { useEffect } from 'react';

/**
 * Freezes background scrolling while a mobile drawer is open, without the
 * layout shift that `overflow: hidden` alone causes on desktop browsers.
 *
 * Compensates for the disappearing scrollbar with padding so the page does
 * not jump sideways when the drawer opens.
 *
 * @param {boolean} locked
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
