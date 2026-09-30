import { ArrowRight, Mail } from 'lucide-react';

import {
  join,
  joinIntro,
  joinPerks,
  joinStatement,
  joinTerminal,
  joinWho,
} from '../../data/join.js';
import { isPending, site } from '../../data/site.js';
import { openRoles } from '../../data/team.js';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Terminal } from '../ui/Terminal.jsx';
import { Section } from '../layout/Section.jsx';

const interestSubject = encodeURIComponent('HWI VIT Pune — membership interest');

export function Join() {
  // Until the official application form exists the primary action is a
  // pre-filled email to the chapter inbox — something a student can actually
  // do today, rather than a link to an unrelated site or a dead button.
  const applicationPending = isPending(join.applicationUrl);

  return (
    <Section id="join" tone="raised">
      {/* ── Recruitment statement ── */}
      <div className="max-w-4xl">
        <p className="mono-label mb-6">{joinIntro.label}</p>

        <h2 className="display-1 text-chalk">
          {joinStatement.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block text-accent-soft mt-2">{joinStatement.pitch}</span>
        </h2>

        <p className="mt-8 max-w-xl text-sm sm:text-base text-zinc-300 leading-relaxed">
          {joinIntro.description}
        </p>
      </div>

      {/* ── why-join terminal ── */}
      <Reveal className="mt-12 sm:mt-16">
        <Terminal title={joinTerminal.title} status={undefined}>
          <p className="mb-3">
            <span className="term-prompt">{joinTerminal.prompt}</span>{' '}
            <span className="text-chalk-2">{joinTerminal.command}</span>
          </p>
          <p className="term-dim mb-3">{joinTerminal.call}</p>

          <ul>
            {joinPerks.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="term-ok shrink-0" aria-hidden="true">
                  ✓
                </span>
                <span className="text-chalk-2">{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 flex items-center gap-2">
            <span className="term-prompt">{joinTerminal.closing}</span>
            <span className="cursor-blink" aria-hidden="true" />
          </p>
        </Terminal>
      </Reveal>

      {/* ── Who can join + open roles ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-14 sm:mt-20">
        <Reveal className="lg:col-span-6">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-chalk tracking-[-0.03em] mb-6">
            {joinWho.title}
          </h3>
          <ul className="space-y-3">
            {joinWho.points.map((point, i) => (
              <li key={point} className="flex items-start gap-3 text-sm text-zinc-200">
                <span className="mono-label text-accent-soft shrink-0 mt-0.5" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={80}>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-chalk tracking-[-0.03em] mb-2">
            Open committee roles
          </h3>
          <p className="mono-label mb-6">Apply under faculty advisors</p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {openRoles.map((role, i) => (
              <li key={role} className="map-node flex items-center gap-2.5 py-2.5 px-3.5">
                <span className="mono-label text-chalk-4 shrink-0" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-chalk-2 leading-tight">{role}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* ── CTA ── */}
      <div className="mt-14 sm:mt-20">
        <p className="display-2 text-chalk mb-8">{joinStatement.closer}</p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {applicationPending ? (
            <Button
              href={`mailto:${join.contactEmail}?subject=${interestSubject}`}
              size="lg"
              className="sm:w-auto group"
            >
              <Mail size={16} aria-hidden="true" />
              <span>{join.applicationPendingLabel}</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          ) : (
            <Button href={join.applicationUrl} size="lg" className="sm:w-auto group">
              <span>{join.applicationLabel}</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          )}

          <Button
            href={`mailto:${site.contact.email}?subject=${interestSubject}`}
            variant="secondary"
            size="lg"
            className="sm:w-auto"
          >
            {join.contactLabel}
          </Button>
        </div>

        {applicationPending && (
          <p className="mono-label mt-6 max-w-md leading-relaxed">
            Our application form is being set up. Email us in the meantime and we will add you to
            the next orientation.
          </p>
        )}
      </div>
    </Section>
  );
}
