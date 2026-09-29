import { cn } from '../../lib/cn.js';

/**
 * Polymorphic CTA button.
 *
 * Renders an <a> when given `href` and a <button> otherwise, so a "Join HWI"
 * action is a real link (middle-click, copy-link, screen readers all behave)
 * while in-page actions stay buttons.
 *
 * Variants map to the existing `.btn-crimson` / `.btn-secondary` classes, so
 * the visual result is unchanged.
 */
const variants = {
  crimson: 'btn-crimson',
  secondary: 'btn-secondary',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-sm',
};

export function Button({
  as,
  href,
  variant = 'crimson',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-bold tracking-wide',
    'active:scale-95 focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (as === 'button' || (!href && !rest.onClick)) {
    return (
      <button type="button" className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const isExternal = /^https?:/i.test(href ?? '');
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : null)}
      {...rest}
    >
      {children}
    </a>
  );
}
