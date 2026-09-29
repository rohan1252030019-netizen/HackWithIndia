import { cn } from '../../lib/cn.js';

/** Background tones used to alternate sections down the page. */
const tones = {
  base: 'bg-[#050507]',
  alt: 'bg-[#07070a]',
  raised: 'bg-[#0d0d12]',
};

/**
 * Standard full-width page section: consistent vertical rhythm, gutters and
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
        'py-24 px-4 sm:px-6 border-t border-white/[0.08] relative',
        tones[tone],
        className
      )}
      {...rest}
    >
      <div className={cn(`${width} mx-auto`, innerClassName)}>{children}</div>
    </section>
  );
}
