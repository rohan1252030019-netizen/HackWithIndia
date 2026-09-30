import { benefits } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Benefits() {
  return (
    <Section id="benefits" tone="alt">
      <SectionHeading
        index="05"
        icon="Compass"
        label={benefits.label}
        title={benefits.title}
        description={benefits.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line">
        {benefits.columns.map((column, index) => (
          <Reveal
            key={column.title}
            delay={index * 80}
            className={`group relative p-6 sm:p-9 flex flex-col ${
              column.tone === 'crimson' ? 'bg-ink-850' : 'bg-ink-900'
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-px w-full ${
                column.tone === 'crimson' ? 'bg-accent/50' : 'bg-line-strong'
              }`}
            />

            <div className="flex items-start gap-4 mb-8">
              <span
                className={`w-11 h-11 shrink-0 border grid place-items-center ${
                  column.tone === 'crimson'
                    ? 'border-accent/40 bg-accent/[0.07] text-accent'
                    : 'border-line bg-ink-800 text-chalk-2'
                }`}
              >
                <Icon name={column.icon} size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-chalk tracking-[-0.03em] leading-tight">
                  {column.title}
                </h3>
                <p className="mono-label mt-1.5">{column.subtitle}</p>
              </div>
            </div>

            <ul className="space-y-3.5 flex-1">
              {column.points.map((point, i) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-200 group-hover:text-chalk-2 transition-colors duration-300"
                >
                  <span
                    className={`mono-label shrink-0 mt-0.5 ${
                      column.tone === 'crimson' ? 'text-accent' : 'text-chalk-4'
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
