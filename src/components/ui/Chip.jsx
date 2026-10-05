import { cn } from '../../lib/cn.js';
import { Icon } from '../../lib/icons.jsx';

/**
 * Small monospace tag. One component, four tones, so a status is never
 * spelled with a one-off class in a section.
 *
 * `tone="tba"` is deliberately the loudest — an undecided value should
 * never be mistaken for a decided one.
 */
const tones = {
  accent: 'chip chip-accent',
  ok: 'chip chip-ok',
  warn: 'chip chip-warn',
  neutral: 'chip chip-neutral',
  tba: 'chip chip-tba',
};

export function Chip({ tone = 'neutral', icon, className, children }) {
  return (
    <span className={cn(tones[tone] ?? tones.neutral, className)}>
      {icon && <Icon name={icon} size={11} aria-hidden="true" />}
      {children}
    </span>
  );
}

/**
 * A selectable chip. Used by the Apply form for labels and by the
 * register terminal for domain choices.
 *
 * Renders a real <button> so it is keyboard reachable and announces its
 * pressed state — a <div> with an onClick would be invisible to a screen
 * reader and untabbable.
 */
export function ToggleChip({ selected, onClick, title, children, className }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      title={title}
      className={cn('chip chip-toggle', className)}
    >
      {children}
    </button>
  );
}

/**
 * The TBA chip, on its own.
 *
 * Its single job is to be unmistakable. If you find yourself wanting to
 * replace a TBA chip with a guess, the answer is in data/, not here.
 */
export function TbaChip({ className }) {
  return (
    <span className={cn('chip chip-tba', className)}>
      TBA
    </span>
  );
}