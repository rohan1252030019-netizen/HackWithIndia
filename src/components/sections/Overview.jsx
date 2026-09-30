import { overview } from '../../data/objectives.js';
import { Icon } from '../../lib/icons.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';

export function Overview() {
  const { statement, schematic } = overview;

  return (
    <Section id="overview" tone="alt" width="max-w-6xl">
      {/* ── Editorial statement ── */}
      <Reveal className="mb-14 sm:mb-20">
        <p className="mono-label mb-6">{overview.label}</p>

        <h2 className="display-1 text-chalk">
          {statement.lines.map((line, i) => (
            <span key={line} className="block">
              {i === statement.lines.length - 1 ? (
                <span className="display-outline">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <p className="text-base sm:text-lg text-chalk-2 leading-relaxed max-w-md shrink-0">
            {statement.lead}
          </p>

          {/* Interactive verbs — hover or keyboard-focus reveals the metadata */}
          <ul className="flex flex-wrap gap-x-8 gap-y-5 lg:gap-x-10">
            {overview.verbs.map((verb) => (
              <li key={verb.word}>
                <span className="interactive-word font-display font-extrabold text-2xl sm:text-3xl tracking-[-0.03em] uppercase">
                  {verb.word}
                  <span className="word-meta">{verb.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ── Charter pull-quote ── */}
      <Reveal className="relative pl-6 sm:pl-10 py-8 sm:py-10 border-l-2 border-accent mb-16 sm:mb-20">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Quote" size={18} className="fill-accent/20 text-accent" aria-hidden="true" />
          <span className="mono-label text-accent-soft">{overview.charterLabel}</span>
        </div>
        <blockquote className="display-2 text-chalk max-w-4xl">{overview.charterQuote}</blockquote>
        <p className="mt-5 text-sm text-zinc-300 font-mono leading-relaxed max-w-2xl">
          {overview.charterBody}
        </p>
      </Reveal>

      {/* ── Prose + architecture schematic ── */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-6 min-w-0 space-y-6 text-sm sm:text-base text-zinc-200 leading-relaxed">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph.lead}>
              <strong className="text-white font-semibold">{paragraph.lead}</strong>
              {paragraph.rest}
            </p>
          ))}
        </div>

        <div className="lg:col-span-6 min-w-0">
          <div className="surface-flat p-5 sm:p-6">
            {/* Wraps: the schematic token is unbreakable and will not fit
                beside the version string at 320px. */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
              <span className="mono-label text-accent-soft break-all">{schematic.heading}</span>
              <span className="mono-label-sm text-chalk-4">{schematic.version}</span>
            </div>

            <ul className="space-y-2.5">
              {schematic.nodes.map((node) => (
                <li
                  key={node.title}
                  className={`flex items-center gap-3.5 p-3 border ${
                    node.tone === 'crimson'
                      ? 'border-accent/40 bg-accent/[0.06]'
                      : 'border-line bg-ink-850'
                  }`}
                >
                  <Icon
                    name={node.icon}
                    size={18}
                    aria-hidden="true"
                    className={node.tone === 'crimson' ? 'text-accent' : 'text-chalk-3'}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white font-display">{node.title}</div>
                    <div className="text-xs text-zinc-300 mt-0.5">{node.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Rhythm break ── */}
      <div className="mt-16 sm:mt-24 -mx-4 sm:-mx-6">
        <div className="marquee-band marquee-fade">
          <Marquee speed={30}>
            {['BUILD', 'BREAK', 'LEARN', 'SHIP', 'COMPETE', 'REPEAT'].map((word, i) => (
              <span key={`${word}-${i}`} className="flex items-center shrink-0">
                <span className="font-display font-extrabold text-2xl sm:text-4xl tracking-[-0.035em] text-chalk-3 uppercase whitespace-nowrap">
                  {word}
                </span>
                <span className="text-accent px-5 sm:px-8 select-none" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
