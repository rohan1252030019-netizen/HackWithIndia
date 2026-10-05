/**
 * Crimson confetti. CSS only — no library, no canvas.
 *
 * 36 pieces, each given its own horizontal drift, spin, delay, width and
 * colour via inline custom properties, then animated by the single
 * `confetti-fall` keyframe.
 *
 * Mount/unmount is driven by the PARENT: `<Confetti key={n} />` with an
 * incrementing key gives each burst a fresh animation, and the parent
 * owns the lifetime timer. This component holds no state at all, so
 * there is no setState-in-effect and no stale-timer race.
 *
 * ─────────────────────────────────────────────────────────────────
 * NOTE: this used to reveal a secret discount code. It does not.
 * There is no offer, so there is no code. `sudo win` fires this burst and
 * prints "Nice try. Register for real :)" instead.
 * ─────────────────────────────────────────────────────────────────
 */

const PIECES = 36;

/** Crimson family only, so it stays on-brand rather than confetti-party. */
const COLORS = ['#ff003c', '#ff4d6d', '#c4002d', '#ffffff', '#ffb020'];

/**
 * Deterministic pseudo-random from the index, so a burst is identical
 * across re-renders — a random layout would jump between attempts.
 */
function buildPiece(index) {
  const rand = ((index * 9301 + 49297) % 233280) / 233280;

  return {
    '--x': `${(index / PIECES) * 100 + rand * 4 - 2}%`,
    '--w': `${5 + rand * 5}px`,
    '--drift': `${(rand - 0.5) * 220}px`,
    '--spin': `${360 + rand * 720}deg`,
    '--delay': `${rand * 520}ms`,
    '--color': COLORS[index % COLORS.length],
  };
}

const pieces = Array.from({ length: PIECES }, (_, index) => buildPiece(index));

export function Confetti() {
  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((style, index) => (
        <span key={index} className="confetti-piece" style={style} />
      ))}
    </div>
  );
}

export default Confetti;