/**
 * STOP 04 — ABOUT THE EVENTS
 *
 * A README-style detail view for the hackathon, plus a smaller card for
 * the induction + speaker meet.
 *
 * ── EVERYTHING HERE IS TBA ───────────────────────────────────────
 * We do not know the dates, venue, prize pool, tracks, rules or schedule
 * yet. Each item below is `null` and renders an unchecked "TBA" box.
 * That is the honest state and it is designed to look deliberate.
 *
 * ─────────────────────────────────────────────────────────────────
 * ── WHAT TO PUT IN HERE ──────────────────────────────────────────
 *   hackathon.date      → real ISO date. Enables the countdown in the hero.
 *   hackathon.venue     → real room / building / campus.
 *   hackathon.prizes    → real amounts only. Delete rows you do not have.
 *   hackathon.tracks    → real track names only.
 *   hackathon.rules     → write these before registration opens.
 *   timeline            → fill Day 1 / Day 2 blocks. Empty stays TBA.
 *   speakers            → real names, real roles. Empty shows the
 *                         "announcing soon" state.
 * ─────────────────────────────────────────────────────────────────
 */

import { site } from './site.js';

export const aboutEventsIntro = {
  label: 'Stop 04',
  file: 'README.md',
  title: 'About the Events',
  description:
    'Everything we have not decided yet, listed honestly. Update the checklist as each item is confirmed.',

  meta: 'UTF-8 · Markdown · TBA',
};

/** The 24-hour hackathon — the one we have the most detail about. */
export const hackathon = {
  id: 'national-hackathon',
  name: '24-Hour National Level Hackathon',
  organisedBy: site.chapter,

  /** ISO 8601. Leave null until confirmed — the hero countdown stays hidden. */
  startDate: null,
  endDate: null,
  dateLabel: 'TBA',

  duration: '24 hours',
  level: 'National',
  fee: 'Free',

  venue: null,
  venueLabel: 'TBA',
  mode: 'TBA',

  /** How many teams we can take. We genuinely do not know yet. */
  maxTeams: null,
  teamSizeMin: null,
  teamSizeMax: null,

  /** Empty. Delete rows you cannot fill — do not invent prize amounts. */
  prizes: [],

  /** Empty. The README renders "track structure TBA". */
  tracks: [],

  /** Write these before registrations open. */
  rules: [],

  contactEmail: null,
};

/**
 * Day-wise timeline. Two day blocks because it is a 24-hour event.
 *
 * Every hour block is `text: null` and renders as an unchecked TBA row.
 * Shape: { time, text, done }
 *
 * ── TO FILL ──────────────────────────────────────────────────────
 * Replace nulls with real times and activities once the schedule is
 * fixed. `done` is for blocks that have already happened.
 */
export const timeline = [
  {
    day: 'Day 1',
    dayNote: 'TBA',
    blocks: [
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
    ],
  },
  {
    day: 'Day 2',
    dayNote: 'TBA',
    blocks: [
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
      { time: null, text: null, done: false },
    ],
  },
];

/** The induction + speaker meet — a smaller, separate card. */
export const induction = {
  id: 'induction-speaker-meet',
  name: 'Induction + Speaker Meet',
  organisedBy: site.chapter,
  dateLabel: 'TBA',
  venueLabel: 'TBA',
  summary:
    'The club’s induction programme for new members, followed by a guest speaker session. Join from any year, any branch.',
  facts: [
    { label: 'format', value: 'Induction + speaker session' },
    { label: 'who', value: 'All VIT Pune students' },
    { label: 'fee', value: 'Free' },
  ],
};

/**
 * Speakers. EMPTY — we have not announced a speaker yet.
 * The section renders a designed "announcing soon" state instead.
 *
 * ── TO FILL ──────────────────────────────────────────────────────
 * [{ name, role, org, photo: null, bio: '...' }]
 * Photo paths must exist in /public/speakers/ or leave `photo` null.
 */
export const speakers = [];

export const speakersEmpty = {
  title: 'Speakers announcing soon',
  body: 'We are still confirming who is coming. When we do, their names go here — and you will be the first to know through the WhatsApp group.',
};

/** Shown above the checklist whenever anything is still unconfirmed. */
export const tbaBanner = {
  label: 'TBA',
  title: 'Most of this page is not decided yet',
  body: 'That is the honest state of a club two events in. Nothing here is a placeholder we forgot to fill — it is a list of what still has to be confirmed.',
};

/**
 * The markdown README for the hackathon.
 *
 * Deliberately short, because there is genuinely little to say yet. It
 * gets longer as decisions are made.
 */
export const hackathonReadme = `# 24-Hour National Level Hackathon

**Organised by:** ${site.chapter}
**Duration:** 24 hours · **Level:** National · **Entry:** Free
**Date:** TBA · **Venue:** TBA · **Mode:** TBA

## Tracks

Track structure has not been decided yet. It will be published here before
registration opens.

## Prize pool

The prize pool has not been announced. We are not going to quote a number
we have not committed to.

## Team size

To be confirmed. We will publish the minimum and maximum team size before
registrations open, so nobody forms a team of the wrong size.

## Rules

Rules will be published before registration opens. They will include the
usual things — what counts as original work, repository visibility, code of
conduct — written out properly rather than implied.

## Schedule

A day-wise schedule will be published once the venue and timings are fixed.

## How to participate

1. Open a pull request on the Apply stop — tell us what you want to build.
2. Register your team on the Register stop once it opens.
3. Read this page again before the event. Everything above will be filled in.

Questions go to the Query stop. There are no closed issues yet, so
everything is open.`;

/** The "how to participate" block, rendered as CONTRIBUTING.md. */
export const contributing = {
  label: 'CONTRIBUTING.md',
  title: 'How to participate',
  intro:
    'Nothing here requires you to have built anything before. If you do not code, the ops and design lanes need you more than they need another backend dev.',
  steps: [
    {
      title: 'Apply to join',
      body: 'Open a pull request on the Apply stop. Say what you want to work on. There is no interview.',
    },
    {
      title: 'Pick a lane',
      body: 'Build, design, ops or research. All four count equally and none of them are second class.',
    },
    {
      title: 'Register your team',
      body: 'Registration opens once the dates and rules are confirmed. You will get the link from the Register stop.',
    },
    {
      title: 'Show up',
      body: 'Bring the thing you want to build. We will handle mentors, venue and the judging.',
    },
  ],
  lanes: [
    { name: 'Build', desc: 'Write code, wire models, ship the thing.' },
    { name: 'Design', desc: 'Interfaces, brand, decks, demo videos.' },
    { name: 'Ops', desc: 'Logistics, judging, sponsorship, comms.' },
    { name: 'Research', desc: 'Domain research and pitch writing.' },
  ],
};