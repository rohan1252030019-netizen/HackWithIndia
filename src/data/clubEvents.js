/**
 * STOP 03 — CLUB EVENTS, rendered as open pull requests.
 *
 * EXACTLY TWO EVENTS, both real, both announced as upcoming. These are
 * the only two events that exist. There is no past-event data on this
 * site and none may be added.
 *
 * ─────────────────────────────────────────────────────────────────
 * THE HONESTY RULE, APPLIED HERE
 * Every field below is either a fact you supplied or explicitly null.
 * A `null` renders a "TBA" chip — never a plausible-looking guess.
 * Specifically:
 *   • no fabricated dates, venues, speakers, judges or prize amounts
 *   • no fabricated attendance or team counts
 *   • no `photos` array unless the files actually exist in /public/events/
 * ─────────────────────────────────────────────────────────────────
 *
 * ── WHEN AN EVENT IS CONFIRMED ───────────────────────────────────
 *   1. `date` / `dateLabel`  → real date.
 *   2. `venue`               → real room/building.
 *   3. `speakers`            → real names, with real titles.
 *   4. `registrationOpen`    → flip to true once config.REGISTRATION_OPEN
 *                              is true, and the CTA will start linking.
 * ─────────────────────────────────────────────────────────────────
 */

export const clubEventsIntro = {
  label: 'Stop 03',
  title: 'Club Events',
  description:
    'Two events in flight. Both are open pull requests against main — neither has been merged yet.',

  command: 'gh pr list --state open',
  branchHint: '2 open · 0 merged · 0 closed',
};

/**
 * The two events. Order is chronological.
 *
 * `number` is the pull request number. `author` is the team that opened
 * it — both are currently the club itself, which is the truth.
 */
export const pullRequests = [
  {
    id: 'induction-speaker-meet',
    number: 1,
    ref: 'PR #1',
    title: 'Induction + Speaker Meet',
    branch: 'event/induction-speaker-meet',
    author: 'Hack With India',
    authorHandle: 'hwi-vit-pune',
    status: 'open',
    statusLabel: 'Upcoming',
    createdLabel: 'opened',

    /** Real: it is upcoming. Everything else about it is TBA. */
    date: null,
    dateLabel: 'TBA',
    time: null,
    venue: null,
    venueLabel: 'TBA',

    summary:
      'The club’s induction programme, plus a guest speaker session. Date, time, venue and speaker are still being confirmed.',

    /** Real detail we can state without inventing anything. */
    facts: [
      { label: 'format', value: 'Induction + speaker session' },
      { label: 'who', value: 'Open to all VIT Pune students' },
      { label: 'fee', value: 'Free' },
    ],

    /** Speakers array stays empty until there are real names. */
    speakers: [],

    photos: [],
    registrationOpen: false,
  },
  {
    id: 'national-hackathon',
    number: 2,
    ref: 'PR #2',
    title: '24-Hour National Level Hackathon',
    branch: 'event/national-hackathon',
    author: 'Hack With India',
    authorHandle: 'hwi-vit-pune',
    status: 'open',
    statusLabel: 'Upcoming',
    createdLabel: 'opened',

    /** Real: it is 24 hours and national level. Everything else is TBA. */
    date: null,
    dateLabel: 'TBA',
    time: null,
    venue: null,
    venueLabel: 'TBA',

    summary:
      'A 24-hour build sprint open to teams from across the country. Date, venue, prize pool and track structure are still being confirmed.',

    facts: [
      { label: 'duration', value: '24 hours' },
      { label: 'level', value: 'National' },
      { label: 'fee', value: 'Free' },
    ],

    speakers: [],
    photos: [],
    registrationOpen: false,
  },
];

/**
 * The empty state below the PR list. This is a permanent feature, not a
 * placeholder — a club with no merged events should say so loudly.
 */
export const mergedEmpty = {
  title: 'git log: no merged commits yet',
  body: 'Our first release is being built right now. Once the induction and the hackathon have happened, they will show up here as merged commits — with photos, winners and real numbers.',
  ctaLabel: 'Ask when it is',
  ctaTarget: 'query',
};

/** The three shared actions on every event card. */
export const cardActions = {
  details: 'Details',
  register: 'Register',
  notify: 'Notify me',
  share: 'Share on WhatsApp',
};