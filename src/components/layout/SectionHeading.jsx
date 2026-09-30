import { Icon } from '../../lib/icons.jsx';
import { cn } from '../../lib/cn.js';

/**
 * Section header: oversized index numeral, mono eyebrow, display heading, and
 * an optional lead paragraph.
 *
 * `align="center"` reproduces the centred variant; the default left-aligns.
 * `index` is the section's position in the page (01, 02, …) — pure wayfinding,
 * so it is hidden from assistive tech to avoid noise.
 */
export function SectionHeading({
  index,
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
        'mb-12 sm:mb-16',
        isCenter ? 'max-w-2xl mx-auto text-center' : 'max-w-3xl',
        className
      )}
    >
      <div className={cn('flex items-baseline gap-4 mb-5', isCenter && 'justify-center')}>
        {index && (
          <span aria-hidden="true" className="section-index shrink-0">
            {index}
          </span>
        )}
        <div className={cn('flex items-center gap-2', isCenter && 'justify-center')}>
          {icon && <Icon name={icon} size={15} className="text-accent" aria-hidden="true" />}
          <span className="mono-label text-chalk-2">{label}</span>
        </div>
      </div>

      <h2 className="display-2 text-chalk">{title}</h2>

      {description && (
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-4 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
