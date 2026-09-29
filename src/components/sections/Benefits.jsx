import { CheckCircle2 } from 'lucide-react';

import { benefits } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Benefits() {
  return (
    <Section id="benefits" tone="base" width="max-w-6xl">
      <SectionHeading
        icon="Compass"
        label={benefits.label}
        title={benefits.title}
        description={benefits.description}
        align="center"
        className="max-w-2xl"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {benefits.columns.map((column) => (
          <article
            key={column.title}
            className={`p-6 sm:p-8 rounded-2xl surface-terminal ${
              column.tone === 'crimson' ? 'border-[#ff003c]/30' : 'border-white/10'
            }`}
          >
            <div className="flex items-center gap-3.5 mb-6">
              <div className={`p-3 rounded-xl ${column.iconSurfaceClass} ${column.iconColorClass}`}>
                <Icon name={column.icon} size={22} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">{column.title}</h3>
                <p className="text-xs text-zinc-300 font-mono">{column.subtitle}</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {column.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2
                    size={16}
                    aria-hidden="true"
                    className={`${column.checkClass} flex-shrink-0 mt-0.5`}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
