import { overview } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Section } from '../layout/Section.jsx';

export function Overview() {
  const { schematic } = overview;

  return (
    <Section id="overview" tone="alt" width="max-w-5xl">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <Icon name="TerminalSquare" size={16} className="text-[#ff003c]" aria-hidden="true" />
        <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
          {overview.label}
        </span>
      </div>

      {/* Editorial Headline */}
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15] mb-8">
        A year-round building ecosystem, <br className="hidden sm:block" />
        not an annual weekend sprint.
      </h2>

      {/* Editorial Pull-Quote */}
      <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-[#170a10] via-[#0e0e16] to-[#0a0a0f] border-l-4 border-l-[#ff003c] border border-white/[0.08] shadow-[0_12px_40px_-15px_rgba(255,0,60,0.22)] mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#ff003c]">
          <Icon name="Quote" size={20} className="fill-[#ff003c]/20" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#ff4d6d]">
            {overview.charterLabel}
          </span>
        </div>
        <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-display font-bold leading-snug tracking-tight">
          {overview.charterQuote}
        </blockquote>
        <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
          {overview.charterBody}
        </p>
      </div>

      {/* 2-Column Prose Narrative */}
      <div className="grid md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-200 leading-relaxed mb-12">
        {overview.paragraphs.map((paragraph) => (
          <p key={paragraph.lead}>
            <strong className="text-white">{paragraph.lead}</strong>
            {paragraph.rest}
          </p>
        ))}
      </div>

      {/* Ecosystem Connectivity Schematic */}
      <div className="p-5 sm:p-6 rounded-xl surface-terminal">
        <div className="text-xs font-mono text-[#ff4d6d] font-semibold mb-4 flex items-center justify-between">
          <span>{schematic.heading}</span>
          <span className="text-zinc-400">{schematic.version}</span>
        </div>

        <ul className="grid sm:grid-cols-3 gap-4 text-center">
          {schematic.nodes.map((node) => (
            <li
              key={node.title}
              className={`p-4 rounded-lg border ${
                node.tone === 'crimson'
                  ? 'bg-[#1a1318] border-[#ff003c]/40 relative'
                  : 'bg-[#14141d] border-white/[0.05]'
              }`}
            >
              <Icon
                name={node.icon}
                size={22}
                aria-hidden="true"
                className={`mx-auto mb-2 ${node.tone === 'crimson' ? 'text-[#ff003c]' : 'text-zinc-300'}`}
              />
              <div className="font-bold text-white text-sm font-display">{node.title}</div>
              <div className="text-xs text-zinc-200 mt-1">{node.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
