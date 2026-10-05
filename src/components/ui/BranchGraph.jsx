import { useId } from 'react';

import { useDrawIn } from '../../hooks/useDrawIn.js';
import { cn } from '../../lib/cn.js';

/**
 * Domain branch graph.
 *
 * An SVG where `main` runs down the left and each domain branches off it.
 * Every path starts at full `stroke-dashoffset` (invisible) and is
 * animated to zero when the section scrolls into view — so the graph
 * literally draws itself, one commit at a time.
 *
 * WHY JS: the browser will transition `stroke-dashoffset` happily, but
 * nothing triggers it on scroll. So the observer writes one class and
 * CSS does the rest. Reduced motion is handled inside `useDrawIn`, which
 * fires immediately and lands on the drawn state.
 *
 * LAYOUT: the graph is a fixed viewBox and the branch rows are computed
 * from `branches.length`, so adding a domain needs no CSS change.
 *
 * a11y: the SVG is `aria-hidden` and every branch is ALSO rendered as a
 * real card below it, which is what a screen reader and a 360px screen
 * actually get. The graph is the illustration, not the content.
 */

/** viewBox dimensions. One row per branch plus padding. */
const WIDTH = 900;
const ROW_HEIGHT = 74;
const TOP_PAD = 46;
const BOTTOM_PAD = 30;

/** X positions, in viewBox units. */
const MAIN_X = 60;
const TIP_X = 250;
const STUB_X = 700;
const LABEL_X = 726;

/** Stroke dash budget: slightly over the longest path, so nothing clips. */
const DASH = 2000;

export function BranchGraph({ branches, mainline, unassignedLabel, className }) {
  const [ref, drawn] = useDrawIn({ threshold: 0.15 });
  const gradientId = useId().replace(/:/g, '');

  const height = TOP_PAD + branches.length * ROW_HEIGHT + BOTTOM_PAD;

  return (
    <div ref={ref} className={cn('relative', className)} data-drawn={drawn}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="h-auto w-full"
        fill="none"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff003c" />
            <stop offset="100%" stopColor="#c4002d" />
          </linearGradient>
        </defs>

        {/* ── main: the protected spine ── */}
        <line
          x1={MAIN_X}
          y1={TOP_PAD - 24}
          x2={MAIN_X}
          y2={height - BOTTOM_PAD + 8}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
        />

        <circle cx={MAIN_X} cy={TOP_PAD - 30} r="4" fill="#080808" stroke="#ff003c" strokeWidth="1.5" />
        <text
          x={MAIN_X - 14}
          y={TOP_PAD - 26}
          textAnchor="end"
          className="fill-zinc-400 font-mono"
          style={{ fontSize: 13 }}
        >
          {mainline.branch}
        </text>

        {branches.map((branch, index) => {
          const rowY = TOP_PAD + index * ROW_HEIGHT;
          const midY = rowY - 26;
          const reachesLabel = branch.lane !== 'short';

          // main → out along the trunk, then a curve down to the row.
          const trunk = `M ${MAIN_X} ${midY} H ${TIP_X - 30}`;
          const curve = `M ${TIP_X - 30} ${midY} C ${TIP_X} ${midY}, ${TIP_X} ${rowY}, ${TIP_X + 18} ${rowY}`;
          // the branch's own line, running out to its stub or label
          const run = reachesLabel
            ? `M ${TIP_X + 18} ${rowY} H ${STUB_X}`
            : `M ${TIP_X + 18} ${rowY} H ${TIP_X + 120}`;

          return (
            <g key={branch.id}>
              {/* the three segments share one draw-in timing via a
                  per-path delay, so the graph draws top to bottom */}
              <path
                d={trunk}
                stroke={`url(#${gradientId})`}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray={DASH}
                strokeDashoffset={drawn ? 0 : DASH}
                style={{ transition: `stroke-dashoffset 620ms var(--ease-out) ${index * 90}ms` }}
              />
              <path
                d={curve}
                stroke={`url(#${gradientId})`}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray={DASH}
                strokeDashoffset={drawn ? 0 : DASH}
                style={{ transition: `stroke-dashoffset 380ms var(--ease-out) ${index * 90 + 130}ms` }}
              />
              <path
                d={run}
                stroke="#ff4d6d"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray={DASH}
                strokeDashoffset={drawn ? 0 : DASH}
                style={{ transition: `stroke-dashoffset 480ms var(--ease-out) ${index * 90 + 260}ms` }}
              />

              {/* branch tip */}
              <circle
                cx={TIP_X + 18}
                cy={rowY}
                r="5"
                fill="#080808"
                stroke="#ff4d6d"
                strokeWidth="1.75"
              />
              {/* inner dot only once drawn, so it does not sit there early */}
              <circle
                cx={TIP_X + 18}
                cy={rowY}
                r="2"
                fill="#ff4d6d"
                opacity={drawn ? 1 : 0}
                style={{ transition: `opacity 200ms var(--ease-out) ${index * 90 + 480}ms` }}
              />

              <text
                x={LABEL_X}
                y={rowY - 6}
                className="fill-zinc-100 font-mono"
                style={{ fontSize: 14, fontWeight: 600 }}
                opacity={drawn ? 1 : 0}
              >
                {branch.branch}
              </text>
              <text
                x={LABEL_X}
                y={rowY + 12}
                className="fill-zinc-400 font-mono"
                style={{ fontSize: 11, transition: `opacity 200ms var(--ease-out) ${index * 90 + 520}ms` }}
                opacity={drawn ? 1 : 0}
              >
                {branch.lead ? `lead: ${branch.lead}` : unassignedLabel}
              </text>
            </g>
          );
        })}

        {/* stub arrow, to say the branches keep going */}
        <path
          d={`M ${MAIN_X} ${height - BOTTOM_PAD + 8} V ${height - 8}`}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export default BranchGraph;