import { roadmapIntro, roadmapTimeline } from '../../data/roadmap.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Roadmap() {
  return (
    <Section id="roadmap" tone="alt" width="max-w-4xl">
      <SectionHeading
        icon="Calendar"
        label={roadmapIntro.label}
        title={roadmapIntro.title}
        description={roadmapIntro.description}
        align="center"
        className="max-w-xl"
      />

      {/* Sequential Timeline with Glowing Vertical Spine */}
      <ol className="relative border-l-2 border-[#ff003c]/40 ml-3 sm:ml-32 space-y-10 py-2">
        {roadmapTimeline.map((stage, index) => (
          <Reveal
            as="li"
            key={stage.quarter}
            delay={index * 70}
            className="relative pl-6 sm:pl-10 group"
          >
            {/* Timeline Marker Node */}
            <span
              aria-hidden="true"
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050507] border-2 border-[#ff003c] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(255,0,60,0.85)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>

            {/* Desktop Quarter/Term Label */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 font-mono">
              <div className="text-sm font-bold text-white font-display">{stage.quarter}</div>
              <div className="text-[10px] text-[#ff4d6d] font-semibold">{stage.term}</div>
            </div>

            <div className="p-5 sm:p-6 rounded-xl surface-terminal border-white/[0.08] group-hover:border-[#ff003c]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {stage.phase}
                </h3>
                <span className="sm:hidden text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/30">
                  {stage.quarter} · {stage.term}
                </span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-200">
                    <span className="text-[#ff003c] font-mono mt-0.5" aria-hidden="true">
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
