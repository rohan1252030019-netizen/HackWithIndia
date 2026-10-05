import {
  aboutHinglish,
  aboutIntro,
  principles,
  readme,
  readmePendingNote,
  timeline,
  timelineEmpty,
} from '../../data/about.js';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { WarliDivider } from '../layout/WarliDivider.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { Markdown } from '../ui/Markdown.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 01 — ABOUT
 *
 * A README.md card. The README is authored as markdown in
 * `src/data/about.js` and rendered by lib/markdown.jsx into React
 * elements — there is no `dangerouslySetInnerHTML` on this site, so the
 * content layer can never inject markup.
 *
 * Everything in here is either a fact about the club's intent or an
 * explicit "still TBA". The principles are commitments, not achievements.
 */
export function About() {
  return (
    <Section id="about" tone="base">
      <StopHeading
        number="02"
        command="cat README.md"
        label="About"
        title={aboutIntro.title}
        description={aboutIntro.description}
      />

      {/* git's own first-run line */}
      <p className="mono-body mb-6 text-chalk-4">{aboutIntro.gitNote}</p>

      <Reveal className="surface overflow-hidden">
        {/* File chrome — makes it read as a file, not a marketing card. */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <span className="font-mono text-xs text-chalk-2">📄 README.md</span>
          <span className="mono-label">{aboutIntro.file}</span>
        </div>

        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <Markdown source={readme} />

          {/* An honest note about the gaps, rather than leaving the reader
              to wonder whether TBA means "forgotten". */}
          <div className="mt-7 rounded-card border border-warn/25 bg-warn/[0.05] p-4">
            <p className="font-mono text-xs font-semibold text-warn">
              {readmePendingNote.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-chalk-3">
              {readmePendingNote.body}
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Principles ── */}
      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {principles.map((principle, index) => (
          <Reveal key={principle.code} delay={index * 45} className="surface surface-lift p-4">
            <span className="font-mono text-[10px] font-bold tracking-widest text-accent">
              {principle.code}
            </span>
            <h3 className="mt-2 font-display text-base font-bold tracking-tight text-chalk">
              {principle.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-chalk-3">{principle.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-sm text-chalk-3">
        {aboutHinglish.one} <span className="text-chalk-4">//</span> {aboutHinglish.two}
      </p>

      {/* ── Milestones ── */}
      <div className="mt-12">
        <h3 className="mono-label mb-4">Milestones</h3>

        {timeline.length ? (
          <ol className="grid gap-3">
            {timeline.map((entry, index) => (
              <Reveal key={entry.dateLabel} delay={index * 45} className="surface flex gap-4 p-4">
                <span className="mono-label-sm shrink-0 text-accent">{entry.date}</span>
                <div>
                  <p className="font-display text-sm font-bold text-chalk">{entry.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-chalk-3">{entry.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        ) : (
          <EmptyState
            icon="GitCommitHorizontal"
            title={timelineEmpty.title}
            body={timelineEmpty.body}
          />
        )}
      </div>

      <WarliDivider className="mt-12" flip />
    </Section>
  );
}

export default About;