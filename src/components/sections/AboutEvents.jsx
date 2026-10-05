import {
  aboutEventsIntro,
  contributing,
  hackathon,
  hackathonReadme,
  induction,
  speakers,
  speakersEmpty,
  tbaBanner,
  timeline,
} from '../../data/aboutEvents.js';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { Chip, TbaChip } from '../ui/Chip.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { Markdown } from '../ui/Markdown.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 03 — ABOUT THE EVENTS
 *
 * The honesty exhibit.
 *
 * Every value here is genuinely undecided, and the page says so in three
 * registers at once: a TBA banner, a checklist where nothing is ticked,
 * and hour blocks that read "TBA" rather than being quietly omitted.
 *
 * That last part matters. An omitted block is invisible; a block that says
 * TBA is a promise that the schedule exists and will be published. The
 * difference between those two is the difference between "we forgot" and
 * "we have not decided yet", and only one of those is acceptable on a
 * club's site.
 */
export function AboutEvents() {
  const undecided = [
    hackathon.date ? null : 'Date and timings',
    hackathon.venue ? null : 'Venue',
    hackathon.tracks.length ? null : 'Track structure',
    hackathon.prizes.length ? null : 'Prize pool',
    hackathon.rules.length ? null : 'Rules',
    hackathon.maxTeams ? null : 'Team size limits',
  ].filter(Boolean);

  return (
    <Section id="about-events" tone="raised">
      <StopHeading
        number="04"
        command="open README.md"
        label="About Events"
        title={aboutEventsIntro.title}
        description={aboutEventsIntro.description}
      />

      {/* ── TBA banner. Lists exactly what is undecided. ── */}
      <Reveal className="mb-10 rounded-card border border-warn/30 bg-warn/[0.06] p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="warn">{tbaBanner.label}</Chip>
          <p className="font-display text-base font-bold text-chalk">{tbaBanner.title}</p>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-chalk-2">{tbaBanner.body}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {undecided.map((item) => (
            <li key={item}>
              <Chip tone="tba">{item}</Chip>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ── Hackathon README ── */}
      <Reveal className="surface overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <span className="font-mono text-xs text-chalk-2">📄 README.md</span>
          <span className="mono-label">{hackathon.name}</span>
        </div>
        <div className="px-4 py-5 sm:px-6 sm:py-6">
          <Markdown source={hackathonReadme} />
        </div>
      </Reveal>

      {/* ── Day-wise timeline ── */}
      <div className="mt-12">
        <h3 className="mono-label mb-5">Schedule</h3>

        <div className="grid gap-6 sm:grid-cols-2">
          {timeline.map((day) => (
            <div key={day.day} className="surface p-4 sm:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-display text-lg font-bold tracking-tight text-chalk">
                  {day.day}
                </h4>
                <TbaChip />
              </div>

              <ol className="mt-4 grid gap-2">
                {day.blocks.map((block, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {/* An empty, disabled checkbox: the schedule shape is
                        visible, the contents are honestly absent. */}
                    <input
                      type="checkbox"
                      checked={block.done}
                      readOnly
                      disabled
                      className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded-chip border border-line-strong bg-ink-900"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] text-chalk-4">
                        {block.time ?? 'time TBA'}
                      </p>
                      <p className="text-sm text-chalk-3">{block.text ?? 'Activity TBA'}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* ── Induction + speaker meet. Smaller card, per the brief. ── */}
      <div className="mt-12">
        <h3 className="mono-label mb-4">Also in flight</h3>

        <Reveal className="surface surface-lift p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">PR #1</Chip>
            <Chip tone="warn">Upcoming</Chip>
          </div>

          <h4 className="mt-3 font-display text-lg font-bold tracking-tight text-chalk">
            {induction.name}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-chalk-3">{induction.summary}</p>

          <dl className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            <li className="chip">
              <span className="text-chalk-4">date</span>
              <TbaChip />
            </li>
            <li className="chip">
              <span className="text-chalk-4">venue</span>
              <TbaChip />
            </li>
            {induction.facts.map((fact) => (
              <li key={fact.label} className="chip chip-neutral">
                {fact.label}: {fact.value}
              </li>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* ── Speakers ── */}
      <div className="mt-12">
        <h3 className="mono-label mb-4">Speakers</h3>

        {speakers.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {speakers.map((speaker, index) => (
              <Reveal key={speaker.name} delay={index * 45} className="surface surface-lift p-4">
                <p className="font-display text-base font-bold text-chalk">{speaker.name}</p>
                <p className="mt-0.5 text-sm text-accent-soft">{speaker.role}</p>
                {speaker.org && <p className="mt-0.5 text-sm text-chalk-3">{speaker.org}</p>}
                {speaker.bio && (
                  <p className="mt-2 text-sm leading-relaxed text-chalk-3">{speaker.bio}</p>
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="Users"
            title={speakersEmpty.title}
            body={speakersEmpty.body}
          />
        )}
      </div>

      {/* ── CONTRIBUTING.md ── */}
      <div className="mt-12">
        <Reveal className="surface overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5">
            <span className="font-mono text-xs text-chalk-2">📄 CONTRIBUTING.md</span>
            <span className="mono-label">{contributing.label}</span>
          </div>

          <div className="px-4 py-5 sm:px-5">
            <h4 className="font-display text-lg font-bold tracking-tight text-chalk">
              {contributing.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-chalk-3">{contributing.intro}</p>

            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {contributing.steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="font-mono text-xs font-bold text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-chalk">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-chalk-3">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
              {contributing.lanes.map((lane) => (
                <div key={lane.name} className="rounded-card border border-line p-3">
                  <p className="font-mono text-xs font-semibold text-accent-soft">{lane.name}</p>
                  <p className="mt-1 text-sm text-chalk-3">{lane.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default AboutEvents;