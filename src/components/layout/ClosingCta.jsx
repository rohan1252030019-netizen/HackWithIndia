import { ArrowRight } from 'lucide-react';

import { hinglish, isPending, REGISTRATION_OPEN, resolveRegisterUrl } from '../../data/config.js';
import { site } from '../../data/site.js';
import { Chip } from '../ui/Chip.jsx';
import { WarliDivider } from './WarliDivider.jsx';

/**
 * CLOSING CTA
 *
 * Repeats the single most important action before the footer, which is
 * the CodeArambh pattern (docs/design-notes.md §2): their footer-adjacent
 * CTA exists because a visitor who scrolls to the end has usually
 * already decided. One more ask is free; a lost signup is not.
 *
 * Two paths again, because the audience split is real — a VIT student and
 * an out-of-college team are looking for different things.
 */
export function ClosingCta() {
  const vitUrl = resolveRegisterUrl('vit');
  const otherUrl = resolveRegisterUrl('other');

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden border-t border-line px-4 py-20 sm:px-6 sm:py-28 lg:pl-[136px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[130px]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Chip tone="accent" icon="GitBranch">
            v0.1.0
          </Chip>
          <Chip tone={REGISTRATION_OPEN ? 'ok' : 'warn'}>
            registration {REGISTRATION_OPEN ? 'open' : 'soon'}
          </Chip>
        </div>

        <h2 className="display-1 text-chalk">
          The repo is{' '}
          <span className="text-accent-soft">open for business.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-chalk-2">
          Hack With India is a new club at {site.campus.name} with two events in flight and
          every role still open. If you have ever wanted to build something with a group
          of people, this is the cheapest possible time to walk in.
        </p>

        <p className="deva mt-5 text-lg text-chalk-3" lang="mr">
          {hinglish.footer}
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Cta
            label="Register — VIT Pune students"
            url={vitUrl}
            fallbackId="register"
            primary
          />
          <Cta label="Register — other colleges" url={otherUrl} fallbackId="register" />
          <a
            href="#apply"
            onClick={(event) => {
              event.preventDefault();
              goTo('apply');
            }}
            className="btn btn-secondary"
          >
            Apply to the committee
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* With no inbox published, say where to write instead of linking
            to nothing. */}
        <p className="mt-6 text-[11px] leading-relaxed text-chalk-4">
          {isPending('') ? (
            <>
              Questions? <span className="text-accent-soft">Ask on the Query stop</span> — we
              read every one.
            </>
          ) : null}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <WarliDivider />
      </div>
    </section>
  );
}

function Cta({ label, url, fallbackId, primary }) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}>
        {label}
      </a>
    );
  }

  return (
    <a
      href={`#${fallbackId}`}
      onClick={(event) => {
        event.preventDefault();
        document.getElementById(fallbackId)?.scrollIntoView({ behavior: 'smooth' });
      }}
      className={`btn ${primary ? 'btn-primary' : 'btn-secondary'}`}
    >
      <span>{label}</span>
      <span className="font-mono text-[10px] uppercase text-warn">notify me</span>
    </a>
  );
}

export default ClosingCta;