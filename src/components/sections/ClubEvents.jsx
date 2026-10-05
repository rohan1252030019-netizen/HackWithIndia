import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Share2, X } from 'lucide-react';

import { resolveRegisterUrl } from '../../data/config.js';
import {
  cardActions,
  clubEventsIntro,
  mergedEmpty,
  pullRequests,
} from '../../data/clubEvents.js';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { Chip, TbaChip } from '../ui/Chip.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 02 — CLUB EVENTS, as open pull requests.
 *
 * Exactly two cards, both real, both `status: 'open'`. There is no
 * past-event data on this site and the empty state below the list says so
 * in as many words.
 *
 * Every card exposes the same three actions (Genesis pattern, §3 of the
 * design notes): Details, Register-or-Notify, Share on WhatsApp. The
 * three are identical on both cards so muscle memory carries over.
 *
 * DETAIL IS A MODAL, not a route. This is a one-pager with ten stops; a
 * route per event would mean ten extra scroll positions and a history
 * entry per card. A modal also gives the modal semantics (Esc, focus
 * return, backdrop click) that are expected of a dialog.
 */
export function ClubEvents() {
  const [openId, setOpenId] = useState(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  const active = pullRequests.find((pr) => pr.id === openId) ?? null;

  // Modal behaviour: Escape closes, and focus returns to whatever opened it.
  useEffect(() => {
    if (!active) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenId(null);
        openerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.querySelector('button, a')?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <Section id="club-events" tone="alt">
      <StopHeading
        number="03"
        command={clubEventsIntro.command}
        label="Club Events"
        title={clubEventsIntro.title}
        description={clubEventsIntro.description}
      />

      <p className="mono-body mb-6 text-chalk-4">{clubEventsIntro.branchHint}</p>

      <div className="grid gap-3">
        {pullRequests.map((pr, index) => (
          <Reveal key={pr.id} delay={index * 60}>
            <PrCard
              pr={pr}
              onOpen={() => {
                openerRef.current = document.activeElement;
                setOpenId(pr.id);
              }}
            />
          </Reveal>
        ))}
      </div>

      {/* ── The permanent empty state ── */}
      <div className="mt-10">
        <EmptyState
          icon="GitCommitHorizontal"
          title={mergedEmpty.title}
          body={mergedEmpty.body}
          action={
            <a
              href={`#${mergedEmpty.ctaTarget}`}
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById(mergedEmpty.ctaTarget)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-sm mt-5"
            >
              {mergedEmpty.ctaLabel}
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          }
        />
      </div>

      {active && (
        <EventDialog
          pr={active}
          onClose={() => {
            setOpenId(null);
            openerRef.current?.focus();
          }}
          dialogRef={dialogRef}
        />
      )}
    </Section>
  );
}

/**
 * One open pull request.
 *
 * Everything unknown is a `TbaChip`. The card deliberately does NOT show
 * a date-shaped field at all when the date is null — it shows the chip in
 * place of the value, so the layout never implies we have information we
 * do not.
 */
function PrCard({ pr, onOpen }) {
  const registerUrl = pr.registrationOpen ? resolveRegisterUrl('vit') : null;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${pr.title} — Hack With India, VIT Pune. ${location.origin}${location.pathname}#club-events`
  )}`;

  return (
    <article className="surface surface-lift p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="commit-hash">{pr.ref}</span>
        <Chip tone="warn">{pr.statusLabel}</Chip>
        <span className="font-mono text-[11px] text-chalk-4">{pr.createdLabel}</span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-chalk sm:text-xl">
        {pr.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-chalk-3">{pr.summary}</p>

      {/* Label/value pairs, TBA where unknown. */}
      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4">
        <Meta label="Date">{pr.date ? pr.date : <TbaChip />}</Meta>
        <Meta label="Venue">{pr.venue ? pr.venue : <TbaChip />}</Meta>
        <Meta label="Branch">
          <span className="font-mono text-[11px] text-chalk-3">{pr.branch}</span>
        </Meta>
        <Meta label="Opened by">
          <span className="font-mono text-[11px] text-chalk-3">{pr.author}</span>
        </Meta>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={onOpen} className="btn btn-secondary btn-sm">
          {cardActions.details}
          <ArrowRight size={13} aria-hidden="true" />
        </button>

        {registerUrl ? (
          <a
            href={registerUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            {cardActions.register}
          </a>
        ) : (
          <a href="#register" className="btn btn-ghost btn-sm">
            {cardActions.notify}
            <TbaChip />
          </a>
        )}

        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost btn-sm"
          aria-label={`${cardActions.share}: ${pr.title}`}
        >
          <Share2 size={13} aria-hidden="true" />
          <span className="hidden sm:inline">{cardActions.share}</span>
        </a>
      </div>
    </article>
  );
}

/** One label/value cell. */
function Meta({ label, children }) {
  return (
    <div>
      <dt className="mono-label">{label}</dt>
      <dd className="mt-1 text-xs text-chalk-2">{children}</dd>
    </div>
  );
}

/**
 * Event detail modal.
 *
 * role="dialog" + aria-modal + a labelled title + focus moved in on open
 * and returned on close. That is the minimum for a dialog a screen reader
 * will not let the user escape by accident.
 */
function EventDialog({ pr, onClose, dialogRef }) {
  const registerUrl = pr.registrationOpen ? resolveRegisterUrl('vit') : null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${pr.id}-title`}
        className="surface max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-panel sm:rounded-panel"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
          <span className="flex items-center gap-2">
            <span className="commit-hash">{pr.ref}</span>
            <Chip tone="warn">{pr.statusLabel}</Chip>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            aria-label="Close details"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 py-5 sm:px-5">
          <h3 id={`${pr.id}-title`} className="display-3 text-chalk">
            {pr.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-chalk-2">{pr.summary}</p>

          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
            <Meta label="Date">{pr.date ? pr.date : <TbaChip />}</Meta>
            <Meta label="Time">{pr.time ? pr.time : <TbaChip />}</Meta>
            <Meta label="Venue">{pr.venue ? pr.venue : <TbaChip />}</Meta>
          </dl>

          {/* Facts we actually know — the small print that makes the TBA
              fields above feel honest rather than empty. */}
          <ul className="mt-6 grid gap-2">
            {pr.facts.map((fact) => (
              <li key={fact.label} className="flex items-baseline gap-2 font-mono text-xs">
                <span className="text-accent-soft">{fact.label}</span>
                <span className="text-chalk-4">=</span>
                <span className="text-chalk-2">{fact.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            {registerUrl ? (
              <a
                href={registerUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                {cardActions.register}
              </a>
            ) : (
              <a href="#register" onClick={onClose} className="btn btn-secondary btn-sm">
                {cardActions.notify}
                <TbaChip />
              </a>
            )}
            <a href="#about-events" onClick={onClose} className="btn btn-ghost btn-sm">
              Full event details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubEvents;