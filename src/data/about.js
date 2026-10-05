/**
 * STOP 02 — ABOUT
 *
 * Rendered as a README.md card.
 *
 * WHAT IS TRUE AND WHAT IS NOT
 * ----------------------------
 * We are a brand-new club at VIT Pune. There is no founding date, no
 * past event, no team roster and no track record, so none of those
 * appear here. Everything in `readme` is either a fact about the club's
 * intent or an explicitly-marked TODO.
 *
 * ── WHAT TO PUT IN HERE ──────────────────────────────────────────
 *   readme      → the markdown document. This is the main edit.
 *   principles  → things you actually intend to do. Keep them few and
 *                 keep them true; delete any you cannot deliver.
 *   timeline    → leave empty until you have real milestones. The
 *                 section renders a designed empty state.
 * ─────────────────────────────────────────────────────────────────
 */

import { site } from './site.js';

export const aboutIntro = {
  label: 'Stop 02',
  file: 'README.md',
  title: 'About the Club',
  description: 'What this repository is, and what is still undefined.',

  /** Rendered as the first two lines of git's first-run output. */
  gitNote: "To view this file: cat README.md  (you're early — this is the first commit)",
};

/** Hinglish. Two lines maximum, or the joke stops working. */
export const aboutHinglish = {
  one: 'Chalo build karuya.',
  two: 'Kay mag, ready ka?',
};

/**
 * Principles. These are commitments, not achievements. Each one is
 * something a first-year member could hold us to.
 */
export const principles = [
  {
    code: 'P-01',
    title: 'Free to join, free to attend',
    body: 'No membership fee. No paid entry to anything we run.',
  },
  {
    code: 'P-02',
    title: 'Every branch welcome',
    body: 'Not just Computer or IT. Design, electronics and mechanical students are needed more than most.',
  },
  {
    code: 'P-03',
    title: 'No prior experience required',
    body: 'If you have never done a hackathon, you are exactly who we want. Start with the ops lane if you do not code yet.',
  },
  {
    code: 'P-04',
    title: 'Say what is not ready',
    body: 'If a date or prize is undecided, this site says TBA. We would rather show a gap than invent a number.',
  },
];

/**
 * Milestones. EMPTY on purpose — there are none yet.
 * Add one per real milestone: { date, dateLabel, title, body, pending }
 */
export const timeline = [];

/** Shown instead of the timeline while the array above is empty. */
export const timelineEmpty = {
  title: 'No milestones yet',
  body: 'This section fills in as real milestones happen. We are not going to write a founding date we cannot prove.',
};

/**
 * The README itself, as markdown.
 *
 * Parsed by src/lib/markdown.jsx into React elements — never
 * dangerouslySetInnerHTML. Supports: #/##/### headings, paragraphs,
 * **bold**, `code`, [links](href), bullet and numbered lists,
 * - [ ] task lists, > quotes, --- rules, ``` code fences.
 */
export const readme = `# Hack With India — VIT Pune

${site.description}

## Status

**Initial commit.** This repository was created recently and is being
built in public. Two events are in flight. Nothing has been merged yet.

## What we are

A student-run technical community at ${site.campus.name}, ${site.campus.city}.
We plan to run hackathons, technical workshops and open-source contribution
sprints across the academic year.

## What is not decided yet

- Dates, venues and timings for both events
- Prize pool and track structure
- Domain leads and the committee roster
- Sponsors

Everything above is marked **TBA** on this site until it is confirmed.
Check the [About the Events](#about-events) stop for the running list.

## How to get involved

Open a pull request on the [Apply](#apply) stop, or register on the
[Register](#register) stop once it opens. Both are free.

## Where to ask

The [Query](#query) stop takes questions directly. If it is not answered,
try the campus WhatsApp group — details are on the
[Official Handles](#handles) stop.`;

/** Copy for the empty-state inside the README card, when a TODO is visible. */
export const readmePendingNote = {
  title: 'Parts of this README are still TBA',
  body: 'That is deliberate. Dates, prizes and the committee are not decided, so we have not written them down. Ask us anything on the Query stop.',
};