import { useReveal } from '../../hooks/useReveal.js';
import { cn } from '../../lib/cn.js';

/**
 * Reveal wrapper — CSS-driven fade-and-rise, triggered on first scroll into view.
 *
 * Replaces the `motion.div whileInView` pattern that was used on every card.
 * Same easing, same 24px travel, same one-shot behaviour, no per-card motion
 * runtime. See `.reveal` in index.css.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const [ref, revealClass, revealVars] = useReveal({ delay });

  return (
    <Tag
      ref={ref}
      className={cn(revealClass, className)}
      style={{ ...revealVars, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
