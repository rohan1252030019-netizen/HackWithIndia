import { cn } from '../../lib/cn.js';

/** Background tones used to alternate sections down the page. */
const tones = {
  base: 'bg-ink-950',
  alt: 'bg-ink-900',
  raised: 'bg-ink-850',
};

/**
 * Standard full-width page section: consistent vertical rhythm, gutters, and
 * the hairline top border that separates every band on this site.
 *
 * @param {string} id      Anchor id — also what useScrollSpy watches.
 * @param {'base'|'alt'|'raised'} tone
 * @param {string} width   Max-width utility for the inner container.
 */
export function Section({
  id,
  tone = 'alt',
  width = 'max-w-7xl',
  className,
  innerClassName,
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 sm:py-28 px-4 sm:px-6 border-t border-line relative',
        tones[tone],
        className
      )}
      {...rest}
    >
      {/* Crimson tick at the section's opening edge — the page's spine marker */}
      <span aria-hidden="true" className="rule-crimson absolute top-0 left-4 sm:left-6" />
      <div className={cn(`${width} mx-auto relative`, innerClassName)}>{children}</div>
    </section>
  );
}
