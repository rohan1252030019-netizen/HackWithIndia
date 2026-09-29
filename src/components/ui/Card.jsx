import { cn } from '../../lib/cn.js';

/**
 * The chapter's standard card surface: translucent terminal panel with the
 * crimson hover lift. Replaces the repeated
 * `rounded-2xl surface-terminal border border-white/[0.07] hover:...` string.
 */
export function Card({ as: Tag = 'div', tone = 'default', className, children, ...rest }) {
  const tones = {
    default:
      'border border-white/[0.07] hover:border-[#ff003c]/40 hover:shadow-[0_0_32px_rgba(255,0,60,0.12)]',
    crimson: 'border border-[#ff003c]/30',
    strong: 'border border-[#ff003c]/40 shadow-[0_8px_30px_rgba(255,0,60,0.15)]',
  };

  return (
    <Tag
      className={cn(
        'rounded-2xl surface-terminal transition-all duration-300',
        tones[tone],
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
