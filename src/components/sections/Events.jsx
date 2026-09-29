import { useMemo, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

import { eventCategories, events, eventsIntro } from '../../data/events.js';
import { isPending } from '../../data/site.js';
import { cn } from '../../lib/cn.js';
import { Badge } from '../ui/Badge.jsx';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const statusLabel = {
  upcoming: 'UPCOMING',
  live: 'LIVE NOW',
  planned: 'PLANNED',
};

function EventCard({ event, index }) {
  const datePending = isPending(event.date);
  const timePending = isPending(event.time);
  const linkPending = isPending(event.registrationUrl);

  return (
    <Reveal
      as="article"
      delay={index * 60}
      className="p-5 sm:p-6 rounded-2xl surface-terminal border-white/[0.07] hover:border-[#ff003c]/40 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <Badge tone={event.status === 'live' ? 'crimson' : 'neutral'}>{event.category}</Badge>
        <span
          className={cn(
            'text-[10px] font-mono font-bold tracking-wider',
            event.status === 'live' ? 'text-[#ff4d6d]' : 'text-zinc-400'
          )}
        >
          {statusLabel[event.status] ?? event.status}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug mb-2">
        {event.title}
      </h3>

      <dl className="text-xs font-mono text-zinc-300 space-y-1.5 mb-4">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Date</dt>
          <Calendar size={12} className="text-[#ff003c] flex-shrink-0" aria-hidden="true" />
          <dd className={datePending ? 'text-zinc-400 italic' : undefined}>
            {datePending ? 'Date to be announced' : event.date}
          </dd>
        </div>

        {event.location && (
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin size={12} className="text-zinc-400 flex-shrink-0" aria-hidden="true" />
            <dd>{event.location}</dd>
          </div>
        )}

        <div className="flex items-center gap-2">
          <dt className="sr-only">Time</dt>
          <Clock size={12} className="text-zinc-400 flex-shrink-0" aria-hidden="true" />
          <dd className={timePending ? 'text-zinc-400 italic' : undefined}>
            {timePending ? 'Time to be announced' : event.time}
          </dd>
        </div>
      </dl>

      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed flex-grow">
        {event.description}
      </p>

      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        {linkPending ? (
          <Button
            href="#join"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Register interest
          </Button>
        ) : (
          <Button href={event.registrationUrl} size="sm" className="w-full">
            Register
          </Button>
        )}
      </div>
    </Reveal>
  );
}

export function Events() {
  const [activeCategory, setActiveCategory] = useState('All');

  const visibleEvents = useMemo(
    () =>
      activeCategory === 'All'
        ? events
        : events.filter((event) => event.category === activeCategory),
    [activeCategory]
  );

  return (
    <Section id="events" tone="alt">
      <SectionHeading
        icon="Calendar"
        label={eventsIntro.label}
        title={eventsIntro.title}
        description={eventsIntro.description}
        align="center"
        className="mb-10"
      />

      {/* Category filter */}
      <div
        role="group"
        aria-label="Filter events by category"
        className="flex flex-wrap items-center justify-center gap-2 mb-12"
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
                'px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors focus-visible:outline-none',
                isActive
                  ? 'bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/40'
                  : 'bg-white/[0.04] text-zinc-300 border border-white/[0.08] hover:text-white hover:border-white/20'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleEvents.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      <p className="text-center text-xs text-zinc-400 font-mono mt-10">
        Dates are published as the committee confirms them. Bookmark this page.
      </p>
    </Section>
  );
}
