import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn.js';

/**
 * Editorial accordion — hairline rows rather than floating cards, so it
 * belongs to the same system as the objectives and team rosters.
 *
 * Height is animated with `grid-template-rows: 0fr -> 1fr` and the collapsed
 * state is `visibility: hidden`, which removes the answer from the
 * accessibility tree and from tab order while still animating both ways.
 * Full keyboard support is native: each header is a real <button> in a heading.
 */
export function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={item.q} className="border-t border-line last:border-b">
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group w-full flex items-start gap-4 sm:gap-6 py-5 sm:py-6 text-left focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span
                  className={cn(
                    'mono-label shrink-0 pt-1.5 transition-colors duration-300',
                    isOpen ? 'text-accent' : 'text-chalk-4'
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={cn(
                    'flex-1 font-display font-bold text-base sm:text-xl leading-snug tracking-[-0.02em] transition-colors duration-300',
                    isOpen ? 'text-accent-soft' : 'text-chalk group-hover:text-chalk-2'
                  )}
                >
                  {item.q}
                </span>

                <span
                  className={cn(
                    'shrink-0 w-7 h-7 border grid place-items-center transition-all duration-300 mt-0.5',
                    isOpen
                      ? 'border-accent/50 text-accent rotate-180'
                      : 'border-line text-chalk-3 group-hover:border-accent/40 group-hover:text-accent'
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown size={14} />
                </span>
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
                <p className="pb-6 pl-10 sm:pl-[4.1rem] pr-10 text-sm text-zinc-200 leading-relaxed max-w-3xl">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
