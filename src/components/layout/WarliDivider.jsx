/**
 * Warli divider — the Indian visual layer.
 *
 * Warli painting uses simple white stick-figures on an ochre ground. We
 * reuse the figure grammar — triangular torsos, stick limbs, joined hands
 * — and redraw the scene as people at laptops, joined in a row the way
 * Warli figures hold hands in a procession.
 *
 * Crimson at low opacity, purely decorative, `aria-hidden` throughout.
 *
 * Drawn inline rather than shipped as an asset: it is ~2 KB of path data
 * versus a network request, and it inherits currentColor.
 */

const FIGURES = [
  { x: 40, flip: false },
  { x: 130, flip: true },
  { x: 220, flip: false },
  { x: 310, flip: true },
  { x: 400, flip: false },
  { x: 490, flip: true },
  { x: 580, flip: false },
  { x: 670, flip: true },
  { x: 760, flip: false },
];

/**
 * One stick figure at a laptop, on a 90×70 cell.
 * @param {number} x     Cell origin.
 * @param {boolean} flip Mirrors the figure so the row reads as a procession.
 */
function Figure({ x, flip }) {
  return (
    <g transform={`translate(${x} 0)${flip ? ' scale(-1 1) translate(-90 0)' : ''}`}>
      {/* head */}
      <circle cx="45" cy="14" r="5" />
      {/* torso — the Warli triangle, left open */}
      <path d="M45 19 L45 38 M45 19 L36 38 M45 19 L54 38" />
      {/* arms, one reaching to the laptop */}
      <path d="M45 24 L33 32 M45 24 L57 32 M57 32 L63 40" />
      {/* legs */}
      <path d="M45 38 L38 60 M45 38 L52 60" />
      {/* the laptop: a hinged open box */}
      <path d="M63 40 L74 40 L74 47 L63 47 Z" />
      <path d="M63 47 L58 58 L79 58 L74 47" fill="currentColor" fillOpacity="0.18" />
      {/* the ground line each figure stands on */}
      <path d="M28 60 L62 60" strokeOpacity="0.45" />
    </g>
  );
}

export function WarliDivider({ className = '', flip = false }) {
  return (
    <div
      aria-hidden="true"
      className={`warli-divider text-accent ${className}`}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 800 70"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {/* procession line */}
        <path d="M0 62 H800" strokeOpacity="0.2" />
        {FIGURES.map((figure) => (
          <Figure key={figure.x} x={figure.x} flip={figure.flip} />
        ))}
        {/* a couple of birds, because the sky is not empty in Warli */}
        <path d="M690 18 l5 -4 l5 4 M706 26 l4 -3 l4 3" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}

export default WarliDivider;