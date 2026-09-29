import { projectTracks } from '../../data/ecosystem.js';
import { impactStats } from '../../data/stats.js';
import { Icon } from '../../lib/icons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const impactIntro = {
  label: 'What We Work On',
  title: 'Projects & Impact',
  description:
    'The tracks chapter members actually build in. Every number below is a published figure from the wider HWI network — we do not report numbers we cannot show you.',
};

export function Impact() {
  return (
    <Section id="impact" tone="base">
      <SectionHeading
        icon="Award"
        label={impactIntro.label}
        title={impactIntro.title}
        description={impactIntro.description}
        align="center"
      />

      {/* Published network figures */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {impactStats.map((stat, index) => (
          <Reveal
            as="li"
            key={stat.label}
            delay={index * 60}
            className="p-5 rounded-2xl surface-terminal border-white/[0.07] text-center"
          >
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-zinc-200 font-medium leading-snug">{stat.label}</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-2">{stat.note}</div>
          </Reveal>
        ))}
      </ul>

      {/* Build tracks */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectTracks.map((track, index) => (
          <Reveal
            as="li"
            key={track.title}
            delay={index * 50}
            className="p-5 rounded-xl surface-terminal border-white/[0.07] hover:border-[#ff003c]/40"
          >
            <div className="w-9 h-9 rounded-lg bg-[#14141c] border border-white/10 flex items-center justify-center mb-4">
              <Icon name={track.icon} size={20} className="text-[#ff4d6d]" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5 font-display">{track.title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{track.desc}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
