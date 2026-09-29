import { ChevronRight } from 'lucide-react';

import { ecosystemIntro, ecosystemMosaic } from '../../data/ecosystem.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Ecosystem() {
  return (
    <Section id="ecosystem" tone="alt">
      <SectionHeading
        icon="Layers"
        label={ecosystemIntro.label}
        title={ecosystemIntro.title}
        description={ecosystemIntro.description}
      />

      {/* Mosaic Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ecosystemMosaic.map((item, index) => (
          <Reveal
            key={item.title}
            as="article"
            delay={index * 60}
            className={`${item.span} p-6 sm:p-7 rounded-2xl surface-terminal flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/10">
                  {item.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">PROGRAM // 0{index + 1}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-display">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">{item.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-300 font-mono">
              <span>{item.meta}</span>
              <ChevronRight size={14} className="text-[#ff003c]" aria-hidden="true" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
