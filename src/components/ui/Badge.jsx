import { cn } from '../../lib/cn.js';

const tones = {
  crimson: 'bg-[#ff003c]/20 text-[#ff4d6d] border-[#ff003c]/40',
  neutral: 'bg-white/10 text-zinc-200 border-white/20',
  muted: 'bg-white/5 text-[#ff4d6d] border-white/10',
};

/** Small monospace tag used for programme labels, pillars and categories. */
export function Badge({ tone = 'crimson', className, children }) {
  return (
    <span
      className={cn('px-2 py-0.5 rounded text-[10px] font-mono font-bold', tones[tone], className)}
    >
      {children}
    </span>
  );
}
