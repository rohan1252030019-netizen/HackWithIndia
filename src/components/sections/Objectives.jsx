import { objectivesIntro, pillarOne, pillarTwo, supportingPillars } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

/**
 * One objective as an editorial numbered row: index, title, description, and
 * an accent rail that draws in from the left on hover or keyboard focus.
 *
 * The two flagship pillars keep their badge treatment because they are
 * weighted differently from the four supporting ones — the difference is
 * real information, not decoration.
 */
function ObjectiveRow({ index, icon, title, description, points, footerLabel, featured }) {
  return (
    <Reveal
      as="li"
      className={`editorial-row pl-5 sm:pl-8 grid-cols-1 md:grid-cols-12 gap-x-8 items-start ${
        featured ? 'bg-ink-850/40 -mx-2 px-2' : ''
      }`}
    >
      <span className="mono-label text-accent-soft md:col-span-1 pt-1.5">{index}</span>

      <div className="md:col-span-4">
        <div className="flex items-start gap-3">
          {icon && (
            <span
              className={`w-9 h-9 shrink-0 border grid place-items-center ${
                featured
                  ? 'border-accent/40 bg-accent/[0.07] text-accent'
                  : 'border-line bg-ink-800 text-chalk-2'
              }`}
            >
              <Icon name={icon} size={17} aria-hidden="true" />
            </span>
          )}
          <h3 className="editorial-title font-display font-extrabold text-xl sm:text-2xl tracking-[-0.03em] text-chalk leading-tight pt-1">
            {title}
          </h3>
        </div>

        {featured && (
          <span className="mono-label inline-block mt-3 ml-12 text-chalk-4">
            {index} // FLAGSHIP
          </span>
        )}
      </div>

      <div className="md:col-span-7">
        <p className="text-sm text-zinc-200 leading-relaxed">{description}</p>

        {points && (
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
            {points.map((point) => (
              <li key={point} className="mono-label-sm flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {footerLabel && (
          <p className="mono-label mt-3 flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">
              ▸
            </span>
            {footerLabel}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function Objectives() {
  return (
    <Section id="objectives" tone="base">
      <SectionHeading
        index="01"
        icon="TerminalSquare"
        label={objectivesIntro.label}
        title={objectivesIntro.title}
        description={objectivesIntro.description}
      />

      <ul className="-mt-2">
        <ObjectiveRow
          index="01"
          featured
          icon={pillarOne.icon}
          title={pillarOne.title}
          description={pillarOne.description}
          points={pillarOne.points}
        />
        <ObjectiveRow
          index="02"
          featured
          icon={pillarTwo.icon}
          title={pillarTwo.title}
          description={pillarTwo.description}
          footerLabel={pillarTwo.footerLabel}
        />
        {supportingPillars.map((pillar, i) => (
          <ObjectiveRow
            key={pillar.title}
            index={String(i + 3).padStart(2, '0')}
            icon={pillar.icon}
            title={pillar.title}
            description={pillar.desc}
          />
        ))}
      </ul>
    </Section>
  );
}
