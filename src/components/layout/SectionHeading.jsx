import { Icon } from '../../lib/icons.jsx';
import { cn } from '../../lib/cn.js';

/**
 * The section eyebrow used throughout the site: a crimson icon, a monospace
 * uppercase label, then the display heading and an optional lead paragraph.
 *
 * `align="center"` reproduces the centred variant used by Benefits, Roadmap,
 * Partners, Team and FAQ; the default left-aligns (Overview, Objectives,
 * Ecosystem).
 */
export function SectionHeading({ icon, label, title, description, align = 'left', className }) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-14',
        isCenter && 'text-center max-w-2xl mx-auto',
        !isCenter && 'max-w-2xl',
        className
      )}
    >
      <div className={cn('flex items-center gap-2 mb-3', isCenter && 'justify-center')}>
        {icon && <Icon name={icon} size={16} className="text-[#ff003c]" aria-hidden="true" />}
        <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
        {title}
      </h2>

      {description && <p className="text-sm text-zinc-300 leading-relaxed">{description}</p>}
    </div>
  );
}
