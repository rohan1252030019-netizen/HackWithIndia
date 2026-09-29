/**
 * Tiny classname joiner. Avoids pulling in clsx/tailwind-merge for the ~10
 * conditional classes this project actually uses.
 *
 * Falsy values are dropped, so `cn('a', cond && 'b')` works.
 */
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(' ');
}
