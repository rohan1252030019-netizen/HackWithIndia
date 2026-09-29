import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn.js';

/**
 * Single-open accordion.
 *
 * Height is animated with `grid-template-rows: 0fr -> 1fr` and the collapsed
 * state is `visibility: hidden`, which removes the answer from the
 * accessibility tree and from tab order while still animating shut.
 *
 * Keyboard support is native: each header is a real <button> inside a
 * heading, wired up with `aria-expanded` / `aria-controls`.
 */
export function Accordion({ items, questionClassName, className }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div
            key={item.q}
            className="rounded-xl surface-terminal overflow-hidden transition-colors"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  'w-full p-5 text-left flex items-center justify-between gap-4',
                  'font-semibold text-sm sm:text-base text-zinc-100 hover:text-white',
                  'transition-colors focus-visible:outline-none',
                  questionClassName
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-display">{item.q}</span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn(
                    'text-[#ff003c] flex-shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={isOpen}
              className="accordion-panel"
            >
              <div>
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-200 leading-relaxed border-t border-white/[0.05]">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
