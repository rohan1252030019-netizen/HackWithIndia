import { Icon } from '../../lib/icons.jsx';
import { cn } from '../../lib/cn.js';

/**
 * Stop heading — the bus-stop board at the head of every section.
 *
 * Shows the stop number, the git command that "arrives" here, the title,
 * and an optional lead. The stop number is what ties this section to the
 * route rail, so both read from `data/route.js` and cannot disagree.
 */
export function StopHeading({
  number,
  command,
  icon,
  label,
  title,
  description,
  align = 'left',
  className,
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {/* The board chrome: stop number + command, in mono. */}
      <div
        className={cn(
          'mb-5 flex flex-wrap items-center gap-x-4 gap-y-2',
          isCenter && 'justify-center'
        )}
      >
        {number && (
          <span
            className="font-mono text-xs font-bold tracking-[0.2em] text-accent"
            aria-hidden="true"
          >
            STOP {number}
          </span>
        )}

        {command && (
          <span className="inline-flex items-center gap-1.5 rounded-chip border border-line-mid bg-surface px-2 py-1 font-mono text-[10px] text-chalk-3">
            <span className="text-accent" aria-hidden="true">
              $
            </span>
            {command}
          </span>
        )}

        {label && (
          <span className="flex items-center gap-1.5">
            {icon && <Icon name={icon} size={13} className="text-accent" aria-hidden="true" />}
            <span className="mono-label">{label}</span>
          </span>
        )}
      </div>

      <h2 className="display-2 text-chalk">{title}</h2>

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-chalk-3 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}