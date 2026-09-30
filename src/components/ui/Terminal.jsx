import { cn } from '../../lib/cn.js';

/**
 * Terminal block.
 *
 * Purely decorative shell chrome (title bar, dots, blinking cursor) around
 * real content passed in as children. Every glyph animates via CSS keyframes
 * that are switched off under `prefers-reduced-motion`.
 *
 * `label` doubles as the accessible name, so the mono decoration never
 * becomes noise for a screen reader.
 */
export function Terminal({
  title = 'hwi@vit',
  lines = [],
  status,
  prompt,
  command,
  className,
  bodyClassName,
  children,
}) {
  return (
    <div className={cn('term scanlines', className)} role="group" aria-label={title}>
      <div className="term-bar">
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="term-dot" aria-hidden="true" />
        <span className="mono-label ml-1 truncate">{title}</span>
      </div>

      <div className={cn('p-4 sm:p-5', bodyClassName)}>
        {prompt && command && (
          <p className="mb-3">
            <span className="term-prompt">{prompt}</span>
            <span className="text-chalk-2"> {command}</span>
          </p>
        )}

        {children ??
          lines.map((line) => (
            <p key={line.label} className="flex items-baseline gap-1.5 flex-wrap">
              <span className="term-ok" aria-hidden="true">
                [✓]
              </span>
              <span className="text-chalk-2 uppercase tracking-wider">{line.label}</span>
              <span className="term-leader" aria-hidden="true">
                {'.'.repeat(Math.max(3, 18 - line.label.length))}
              </span>
              <span className="text-accent-soft font-semibold">{line.value}</span>
            </p>
          ))}

        {status && (
          <p className="mt-3 text-chalk-3">
            <span className="term-dim">SYSTEM STATUS: </span>
            <span className="text-chalk-2">{status}</span>
            <span className="cursor-blink ml-1" aria-hidden="true" />
          </p>
        )}
      </div>
    </div>
  );
}
