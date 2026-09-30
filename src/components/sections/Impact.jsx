import { ecosystemIntro, projectTracks } from '../../data/ecosystem.js';
import { impactStats } from '../../data/stats.js';
import { Icon } from '../../lib/icons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const impactIntro = {
  label: 'What We Work On',
  title: 'Projects & Impact',
  description:
    'The tracks chapter members build in. Every figure below is a published number from the wider HWI network — we do not report numbers we cannot show you.',
};

export function Impact() {
  return (
    <Section id="impact" tone="base">
      <SectionHeading
        index="04"
        icon="Trophy"
        label={impactIntro.label}
        title={impactIntro.title}
        description={impactIntro.description}
      />

      {/* ── Published figures ── */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
        {impactStats.map((stat, index) => (
          <Reveal
            as="li"
            key={stat.label}
            delay={index * 60}
            className="group relative bg-ink-900 p-5 sm:p-6 hover:bg-ink-850 transition-colors duration-300"
          >
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-line-strong" />
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-8 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <p className="mono-label text-chalk-4">{String(index + 1).padStart(2, '0')}</p>
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-chalk tracking-[-0.035em] mt-3 leading-none">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-200 mt-3 leading-snug">{stat.label}</p>
            <p className="mono-label-sm mt-2">{stat.note}</p>
          </Reveal>
        ))}
      </ul>

      {/* ── Build tracks ── */}
      <div className="mt-16 sm:mt-24">
        <p className="mono-label mb-8">What our community builds</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {projectTracks.map((track, index) => (
            <Reveal
              as="article"
              key={track.title}
              delay={index * 50}
              className="group relative bg-ink-900 p-6 sm:p-7 flex flex-col min-h-[190px] hover:bg-ink-850 transition-colors duration-300"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full bg-line-strong"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-8 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="flex items-start justify-between mb-5">
                <span className="w-9 h-9 border border-line bg-ink-800 grid place-items-center group-hover:border-accent/40 group-hover:bg-accent/[0.07] transition-colors duration-300">
                  <Icon name={track.icon} size={17} className="text-chalk-2" aria-hidden="true" />
                </span>
                <span className="mono-label text-chalk-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-chalk group-hover:text-accent-soft transition-colors duration-300">
                {track.title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mt-2">{track.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <p className="mono-label mt-8">
        {ecosystemIntro.title} · {projectTracks.length} active tracks
      </p>
    </Section>
  );
}
