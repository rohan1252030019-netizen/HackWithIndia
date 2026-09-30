import { useMemo, useState } from 'react';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

import { eventCategories, events, eventsIntro } from '../../data/events.js';
import { isPending } from '../../data/site.js';
import { roadmapTimeline } from '../../data/roadmap.js';
import { cn } from '../../lib/cn.js';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const statusLabel = { upcoming: 'UPCOMING', live: 'LIVE NOW', planned: 'PLANNED' };

/**
 * Splits an existing date string into a big month + year pair for the feature
 * card. This only reformats what is already in events.js — it never invents a
 * day number. "October 2026" becomes { month: "OCT", year: "2026" }.
 */
function splitDate(date) {
  if (isPending(date)) return { month: 'TBA', year: '' };
  const parts = date.replace(/—/g, ' ').trim().split(/\s+/);
  return { month: (parts[0] || '').slice(0, 3).toUpperCase(), year: parts[parts.length - 1] || '' };
}

const scrollToJoin = (e) => {
  e.preventDefault();
  document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
};

function EventRow({ event, index }) {
  const timePending = isPending(event.time);
  const linkPending = isPending(event.registrationUrl);

  return (
    <Reveal
      as="li"
      delay={index * 50}
      className="group grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-3 py-6 border-t border-line last:border-b hover:border-accent/30 transition-colors duration-300"
    >
      <div className="sm:col-span-3">
        <p className="font-display font-extrabold text-lg text-chalk leading-tight">
          {isPending(event.date) ? 'TBA' : event.date}
        </p>
        <p className="mono-label mt-1.5">{event.category}</p>
      </div>

      <div className="sm:col-span-6">
        <h3 className="font-display font-bold text-base sm:text-lg text-chalk group-hover:text-accent-soft transition-colors duration-300 leading-snug">
          {event.title}
        </h3>
        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{event.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
          {event.location && (
            <span className="mono-label-sm flex items-center gap-1.5">
              <MapPin size={11} aria-hidden="true" className="text-accent" />
              {event.location}
            </span>
          )}
          <span className="mono-label-sm flex items-center gap-1.5">
            <Clock size={11} aria-hidden="true" className="text-chalk-4" />
            {timePending ? 'Time to be announced' : event.time}
          </span>
        </div>
      </div>

      <div className="sm:col-span-3 flex sm:flex-col items-start sm:items-end justify-between gap-3">
        <span
          className={cn('mono-label', event.status === 'live' ? 'text-accent' : 'text-chalk-4')}
        >
          {statusLabel[event.status] ?? event.status}
        </span>
        {linkPending ? (
          <Button href="#join" size="sm" variant="secondary" onClick={scrollToJoin}>
            Register interest
          </Button>
        ) : (
          <Button href={event.registrationUrl} size="sm">
            Register
          </Button>
        )}
      </div>
    </Reveal>
  );
}

export function Events() {
  const [activeCategory, setActiveCategory] = useState('All');

  // The feature card always shows the first event in the file, which is the
  // chapter's flagship. No reordering, no date maths.
  const featured = events[0];
  const featuredDate = splitDate(featured.date);
  const featuredLinkPending = isPending(featured.registrationUrl);

  const visibleEvents = useMemo(
    () => (activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory)),
    [activeCategory]
  );

  // Quarter markers come from the roadmap's own published terms; the event
  // count per quarter is counted from events.js. Nothing is invented.
  const quarters = roadmapTimeline.map((stage) => ({
    quarter: stage.quarter,
    term: stage.term,
    phase: stage.phase,
    count: events.filter((e) => e.quarter === stage.quarter).length,
  }));

  return (
    <Section id="events" tone="alt">
      <SectionHeading
        index="03"
        icon="Calendar"
        label={eventsIntro.label}
        title={eventsIntro.title}
        description={eventsIntro.description}
      />

      {/* ── Next event feature card ── */}
      <Reveal className="relative border border-line bg-ink-850 overflow-hidden">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Date block */}
          <div className="lg:col-span-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-line flex lg:flex-col justify-between gap-4">
            <div>
              <p className="mono-label mb-4">Next event</p>
              <p className="font-display font-extrabold text-accent-soft leading-none tracking-[-0.04em] text-5xl sm:text-6xl lg:text-7xl">
                {featuredDate.month}
              </p>
              {featuredDate.year && (
                <p className="font-display font-bold text-2xl sm:text-3xl text-chalk-3 mt-1 tracking-[-0.03em]">
                  {featuredDate.year}
                </p>
              )}
            </div>

            {featured.needsConfirmation && (
              <p className="mono-label text-chalk-4 leading-relaxed max-w-[16rem]">
                Date subject to committee confirmation
              </p>
            )}
          </div>

          {/* Content block */}
          <div className="lg:col-span-9 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="mono-label px-2 py-0.5 border border-accent/40 bg-accent/10 text-accent-soft">
                {featured.category}
              </span>
              <span className="mono-label px-2 py-0.5 border border-line text-chalk-3">
                {statusLabel[featured.status]}
              </span>
              <span className="mono-label-sm flex items-center gap-1.5">
                <MapPin size={11} aria-hidden="true" className="text-accent" />
                {featured.location}
              </span>
            </div>

            <h3 className="display-2 text-chalk mb-4">{featured.title}</h3>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-2xl">
              {featured.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {featuredLinkPending ? (
                <Button href="#join" onClick={scrollToJoin} className="group">
                  <span>Register interest</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              ) : (
                <Button href={featured.registrationUrl} className="group">
                  <span>Register</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              )}

              <span className="mono-label-sm flex items-center gap-1.5">
                <Clock size={11} aria-hidden="true" className="text-chalk-4" />
                {isPending(featured.time) ? 'Time to be announced' : featured.time}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Academic year timeline ── */}
      <div className="mt-16 sm:mt-24">
        <p className="mono-label mb-8">The year ahead</p>

        <ol className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {quarters.map((q) => (
            <li key={q.quarter} className="bg-ink-900 p-5 sm:p-6 relative">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full bg-line-strong"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute left-0 top-0 h-px w-10',
                  q.count > 0 ? 'bg-accent' : 'bg-line-strong'
                )}
              />
              <p className="font-display font-extrabold text-2xl text-chalk tracking-[-0.03em]">
                {q.quarter}
              </p>
              <p className="mono-label mt-1.5">{q.term}</p>
              <p className="text-xs text-zinc-300 mt-3 leading-snug">{q.phase}</p>
              <p className="mono-label-sm mt-4 flex items-center gap-1.5">
                <span
                  className={cn('w-1 h-1 rounded-full', q.count > 0 ? 'bg-accent' : 'bg-chalk-4')}
                  aria-hidden="true"
                />
                {q.count} {q.count === 1 ? 'event' : 'events'} listed
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Category filter ── */}
      <div
        role="group"
        aria-label="Filter events by category"
        className="flex flex-wrap items-center gap-2 mt-16 sm:mt-20 mb-2"
      >
        {eventCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                'px-3.5 py-1.5 text-xs font-mono font-semibold tracking-wide transition-colors focus-visible:outline-none border',
                isActive
                  ? 'bg-accent/15 text-accent-soft border-accent/40'
                  : 'bg-transparent text-zinc-300 border-line hover:text-white hover:border-line-strong'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* ── All events ── */}
      <ul>
        {visibleEvents.map((event, index) => (
          <EventRow key={event.id} event={event} index={index} />
        ))}
      </ul>
    </Section>
  );
}
