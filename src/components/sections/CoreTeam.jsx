import { ArrowRight } from 'lucide-react';

import { isPending } from '../../data/config.js';
import { contributors, contributorsEmpty, openRoles, teamIntro } from '../../data/team.js';
import { Chip } from '../ui/Chip.jsx';
import { EmptyState, SkeletonGrid } from '../ui/EmptyState.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 05 — CORE TEAM
 *
 * A contributors grid. `team.js` ships EMPTY, because the committee has
 * not been elected and a grid full of invented people would be a lie with
 * faces on it.
 *
 * So this section renders the two things that are true right now: a
 * skeleton showing the shape of what is coming, and the actual list of
 * roles being recruited for. The second one is the useful half — an
 * applicant does not need a team photo, they need to know what is open.
 */
export function CoreTeam() {
  const hasTeam = contributors.length > 0;

  return (
    <Section id="core-team" tone="alt">
      <StopHeading
        number="06"
        command={teamIntro.command}
        icon="Users"
        label="Core Team"
        title={teamIntro.title}
        description={teamIntro.description}
      />

      <p className="mono-body mb-8 text-chalk-4">{teamIntro.yearLabel}</p>

      {hasTeam ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {contributors.map((person, index) => (
            <Reveal key={person.name} delay={index * 45}>
              <ContributorCard person={person} />
            </Reveal>
          ))}
        </div>
      ) : (
        <>
          {/* The empty state, then the skeletons beneath it. */}
          <EmptyState
            icon="Users"
            title={contributorsEmpty.title}
            body={contributorsEmpty.body}
            action={
              <a
                href={`#${contributorsEmpty.ctaTarget}`}
                className="btn btn-primary btn-sm mt-5"
              >
                {contributorsEmpty.ctaLabel}
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            }
          />

          <div className="mt-6">
            <p className="mono-label mb-3">What the grid will look like</p>
            <SkeletonGrid count={4} />
          </div>
        </>
      )}

      {/* ── Open roles. The genuinely useful part. ── */}
      <div className="mt-12">
        <h3 className="mono-label mb-4">Open roles</h3>

        <ul className="grid gap-2 sm:grid-cols-2">
          {openRoles.map((role) => (
            <li key={role.role} className="surface surface-lift flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold tracking-tight text-chalk">
                  {role.role}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-chalk-3">{role.domain}</p>
              </div>
              <Chip tone="neutral">{role.commitment}</Chip>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-chalk-3">
          Every one of these is open. No prior experience is required for any of them —
          including the technical ones. If you have never built anything, say so in your
          application; it is not a disqualification.
        </p>
      </div>
    </Section>
  );
}

/**
 * A contributor card.
 *
 * Hovering reveals the "git blame" lines: what this person actually owns.
 * On touch there is no hover, so the blame block is always present in the
 * DOM and simply not hidden — it is revealed by :hover AND :focus-within
 * in CSS, and the whole card is a link when a handle exists.
 */
function ContributorCard({ person }) {
  const hasAvatar = person.avatar && !isPending(person.avatar);
  const handleUrl = person.handle && !isPending(person.handle)
    ? `https://github.com/${person.handle}`
    : null;

  return (
    <article className="surface surface-lift group relative overflow-hidden p-4">
      <div className="flex items-start gap-4">
        {hasAvatar ? (
          <img
            src={person.avatar}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-chip border border-line object-cover"
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-chip border border-accent/40 bg-accent/10 font-display text-lg font-bold text-accent"
          >
            {person.initials}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold tracking-tight text-chalk">
            {person.name}
          </h3>
          <p className="mt-0.5 text-sm text-accent-soft">{person.designation}</p>
          <p className="mt-1 font-mono text-[11px] text-chalk-3">
            {[person.branch, person.year].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      {/* Fun stats. Deliberately omitted rather than zeroed when unknown —
          a "0 commits" card implies the person did nothing. */}
      {(person.commits != null || person.chaiCups != null) && (
        <dl className="mt-4 flex gap-5 border-t border-line pt-3">
          {person.commits != null && (
            <div>
              <dt className="mono-label">commits</dt>
              <dd className="mt-0.5 font-mono text-sm text-chalk-2">{person.commits}</dd>
            </div>
          )}
          {person.chaiCups != null && (
            <div>
              <dt className="mono-label">chai_cups</dt>
              <dd className="mt-0.5 font-mono text-sm text-chalk-2">{person.chaiCups}</dd>
            </div>
          )}
        </dl>
      )}

      {/* git blame */}
      {person.owns?.length ? (
        <div className="mt-4 border-t border-line pt-3">
          <p className="mono-label">owns</p>
          <ul className="mt-2 space-y-1">
            {person.owns.map((line) => (
              <li key={line} className="font-mono text-[11px] leading-relaxed text-chalk-3">
                <span className="text-accent" aria-hidden="true">
                  {line.slice(0, 7).padEnd(7, '0')}
                </span>
                <span className="text-chalk-4"> </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {handleUrl && (
        <a
          href={handleUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block font-mono text-[11px] text-accent-soft underline underline-offset-4"
        >
          @{person.handle}
        </a>
      )}
    </article>
  );
}

export default CoreTeam;