import { ArrowRight, Check } from 'lucide-react';

import { objectivesIntro, pillarOne, pillarTwo, supportingPillars } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Objectives() {
  return (
    <Section id="objectives" tone="base">
      <SectionHeading
        icon="TerminalSquare"
        label={objectivesIntro.label}
        title={objectivesIntro.title}
        description={objectivesIntro.description}
      />

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Flagship 01 */}
        <article className="col-span-1 md:col-span-12 lg:col-span-7 p-6 sm:p-7 rounded-2xl surface-terminal border-[#ff003c]/40 flex flex-col justify-between shadow-[0_8px_30px_rgba(255,0,60,0.15)]">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#1b1216] border border-[#ff003c]/40 flex items-center justify-center">
                <Icon
                  name={pillarOne.icon}
                  size={24}
                  className="text-[#ff003c]"
                  aria-hidden="true"
                />
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/40">
                {pillarOne.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-display">
              {pillarOne.title}
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed mb-6">{pillarOne.description}</p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.06]">
            {pillarOne.points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-xs text-zinc-200 font-mono">
                <Check size={13} className="text-[#ff003c] flex-shrink-0" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Flagship 02 */}
        <article className="col-span-1 md:col-span-12 lg:col-span-5 p-6 sm:p-7 rounded-2xl surface-terminal border-white/15 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#14141c] border border-white/15 flex items-center justify-center">
                <Icon name={pillarTwo.icon} size={24} className="text-white" aria-hidden="true" />
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-white/10 text-zinc-200 border border-white/20">
                {pillarTwo.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-display">
              {pillarTwo.title}
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed mb-6">{pillarTwo.description}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-300 pt-4 border-t border-white/[0.06] font-mono">
            <span>{pillarTwo.footerLabel}</span>
            <ArrowRight size={14} className="text-[#ff003c]" aria-hidden="true" />
          </div>
        </article>

        {/* Supporting pillars */}
        {supportingPillars.map((pillar) => (
          <article
            key={pillar.title}
            className="col-span-1 md:col-span-6 lg:col-span-3 p-5 rounded-xl surface-terminal flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#14141c] border border-white/10 flex items-center justify-center mb-4">
                <Icon name={pillar.icon} size={20} className="text-[#ff4d6d]" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-white text-base mb-1.5 font-display">{pillar.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{pillar.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
