import { roadmapIntro, roadmapTimeline } from '../../data/roadmap.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Roadmap() {
  return (
    <Section id="roadmap" tone="base">
      <SectionHeading
        index="06"
        icon="Calendar"
        label={roadmapIntro.label}
        title={roadmapIntro.title}
        description={roadmapIntro.description}
      />

      {/* Vertical editorial timeline.
          The <ol> carries no padding: the spine and its nodes are positioned
          against the list's own box, and the indent lives on each stage's
          inner content. That keeps the nodes exactly on the spine at every
          breakpoint instead of drifting with the padding. */}
      <ol className="relative">
        <span aria-hidden="true" className="timeline-spine" />

        {roadmapTimeline.map((stage, index) => (
          <Reveal
            as="li"
            key={stage.quarter}
            delay={index * 70}
            className="timeline-stage group relative pb-12 last:pb-0 pl-8 sm:pl-12"
          >
            <span aria-hidden="true" className="timeline-node" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
              <div className="md:col-span-3">
                <p className="font-display font-extrabold text-4xl sm:text-5xl text-chalk tracking-[-0.04em] leading-none">
                  {stage.quarter}
                </p>
                <p className="mono-label mt-2.5">{stage.term}</p>
              </div>

              <div className="md:col-span-9">
                <h3 className="editorial-title font-display font-extrabold text-xl sm:text-2xl text-chalk tracking-[-0.03em] leading-tight">
                  {stage.phase}
                </h3>

                <ul className="mt-4 space-y-2">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-200">
                      <span className="text-accent font-mono mt-0.5 shrink-0" aria-hidden="true">
                        ▸
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
