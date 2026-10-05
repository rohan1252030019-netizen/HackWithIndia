import { useEffect } from 'react';

import { getStopAnnouncement, ROUTE, stopIds, stops } from '../../data/route.js';
import { useActiveStopIndex } from '../../hooks/useActiveStopIndex.js';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';

/**
 * ═══════════════════════════════════════════════════════════════════
 * THE ROUTE RAIL — the signature feature.
 * ═══════════════════════════════════════════════════════════════════
 *
 * A PMPML bus route down the left of the page. One dot per section,
 * labelled like a bus-stop board, current stop glowing crimson.
 *
 * Desktop (lg+): a fixed left column with a dashed route line, a filled
 * progress segment, a dot per stop, and a stop board that reads like a
 * real signpost. Click any dot to travel there.
 *
 * Mobile: the whole thing collapses to a 3px crimson bar pinned to the top
 * of the viewport with the stop name riding beside it. On a 360px screen a
 * 96px rail would eat 27% of the width, which is unacceptable when most
 * traffic arrives from a WhatsApp link.
 *
 * A NOTE ON THE PROGRESS SEGMENT: it is driven by page scroll, not by
 * which stop is active. That is deliberate — under `prefers-reduced-motion`
 * the transition is disabled but the height still tracks scroll, because a
 * progress indicator that stops moving would be a bug, not an
 * accommodation.
 */
export function RouteRail() {
  const activeIndex = useActiveStopIndex(stopIds);
  const pageProgress = useScrollProgress();
  const announcement = getStopAnnouncement(activeIndex);

  // Keyboard: Alt+↓ / Alt+↑ jump between stops without reaching for the
  // mouse. Cheap to add, and the rail is a spatial navigation widget.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.altKey) return;
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const next = Math.min(Math.max(activeIndex + delta, 0), stops.length - 1);
      document.getElementById(stops[next].id)?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── Desktop rail ── */}
      <div className="rail" aria-hidden="true">
        <span className="rail-line" />
        <span className="rail-progress" style={{ '--rail-progress': pageProgress }} />

        <nav className="rail-stops" aria-label="Page sections">
          {stops.map((stop, index) => (
            <button
              key={stop.id}
              type="button"
              className="rail-stop"
              data-passed={index < activeIndex}
              aria-current={index === activeIndex ? 'step' : undefined}
              // Not aria-hidden in the nav: the board text is announced
              // once via a live region instead, so tabbing does not
              // announce ten identical groups.
              tabIndex={-1}
              onClick={() => goTo(stop.id)}
            >
              <span className="rail-stop-dot" />
              <span className="rail-stop-number">{stop.number}</span>
            </button>
          ))}
        </nav>

        {/* The board. Positioned against the rail, not the active dot —
            moving it every stop would be motion for its own sake. */}
        <div className="rail-board">
          <p className="rail-board-route">
            ROUTE {ROUTE.number} · STOP {announcement.boardNumber}/{announcement.total}
          </p>
          <p className="rail-board-name">{announcement.current.label}</p>
          <p className="rail-board-next">Next stop: {announcement.nextLabel}</p>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div className="rail-top" aria-hidden="true">
        <span className="rail-top-fill" style={{ '--rail-progress': pageProgress }} />
      </div>
      <p className="rail-top-label" aria-hidden="true">
        {announcement.current.number} · {announcement.current.label}
      </p>

      {/*
        One polite live region announces stop changes for assistive tech.
        `aria-hidden` on the visual rail plus a single announcement is far
        less noisy than ten focusable dots each reading their own label.
      */}
      <p role="status" aria-live="polite" className="sr-only">
        {`Stop ${announcement.boardNumber} of ${announcement.total}: ${announcement.current.name}. Next stop: ${announcement.nextLabel}.`}
      </p>
    </>
  );
}

export default RouteRail;