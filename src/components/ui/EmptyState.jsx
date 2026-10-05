import { Icon } from '../../lib/icons.jsx';
import { cn } from '../../lib/cn.js';

/**
 * The empty state.
 *
 * On this site this is not a fallback — it is the primary experience of
 * five of the ten sections, because the club is brand new. It gets
 * designed accordingly: dashed border, a git-flavoured title, a body that
 * says why the gap exists rather than apologising for it, and an action
 * that moves the visitor somewhere useful.
 */
export function EmptyState({ icon, title, body, action, className }) {
  return (
    <div className={cn('empty-state', className)}>
      {icon && (
        <span className="mb-3 inline-grid h-9 w-9 place-items-center rounded-chip border border-line-mid text-chalk-4">
          <Icon name={icon} size={15} aria-hidden="true" />
        </span>
      )}
      <p className="empty-title">{title}</p>
      {body && <p className="empty-body">{body}</p>}
      {action}
    </div>
  );
}

/** The shimmering placeholder shown while a contributors grid is empty. */
export function SkeletonCard() {
  return (
    <div className="surface surface-lift flex items-center gap-4 p-4">
      <div className="skeleton h-14 w-14 shrink-0 rounded-chip" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="skeleton h-3.5 w-1/2" />
        <div className="skeleton h-2.5 w-3/4" />
        <div className="skeleton h-2.5 w-1/3" />
      </div>
    </div>
  );
}

/** A row of skeletons — used in place of the empty contributors grid. */
export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}