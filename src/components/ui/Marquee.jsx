import { cn } from '../../lib/cn.js';

/**
 * Infinite horizontal ticker driven entirely by CSS keyframes.
 *
 * `speed` is the seconds for one full cycle. The caller must render its
 * children at least twice for the -50% translation to loop seamlessly —
 * the Partners section triples the list to cover wide viewports.
 *
 * Pauses on hover and on keyboard focus so the content stays reachable, and
 * is disabled entirely under prefers-reduced-motion (see index.css).
 */
export function Marquee({ direction = 'left', speed = 32, className, children }) {
  return (
    <div
      className={cn(
        direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right',
        className
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </div>
  );
}
