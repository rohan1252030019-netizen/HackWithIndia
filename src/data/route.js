/**
 * ═══════════════════════════════════════════════════════════════════
 * THE ROUTE — the spine of the whole site.
 * ═══════════════════════════════════════════════════════════════════
 *
 * The page is a bus route. Every section is a stop, the left rail is the
 * route line, and this file is the timetable. The rail, the navbar, the
 * mobile top bar, the scroll-spy, the footer and the 404 page all read
 * from this one array, so the section order can never drift.
 *
 * ORDER IS THE PRODUCT. Reorder here and the whole page follows.
 *
 * ── TO EDIT ──────────────────────────────────────────────────────
 *   Reorder / rename ....... edit the `stops` array.
 *   Board wording .......... edit `name` / `tagline`.
 *   The route number ....... edit ROUTE.number.
 *   Nothing in a component.. ever.
 * ─────────────────────────────────────────────────────────────────
 */

import { repo } from './config.js';

/** The bus route. `number` is flavour, not a real PMPML route id. */
export const ROUTE = {
  number: '118',
  depot: 'HWI Depot',
  destination: 'Ship Karo',
  operator: 'Hack With India',
};

/**
 * ── THE STOPS ────────────────────────────────────────────────────
 *
 * id       → must match the `id` on the <section>.
 * number   → "01".."10", shown on the stop board.
 * label    → short, for the rail and the mobile top bar.
 * name     → the bus-stop board title.
 * code     → the git command that "stops" here. This is the concept doing
 *            the work: the route is a repo, each stop is a command.
 * icon     → a key in src/lib/iconRegistry.js
 * tagline  → one mono line under the board title.
 */
export const stops = [
  {
    id: 'top',
    number: '01',
    label: 'Depot',
    name: 'The Depot',
    code: 'git clone',
    icon: 'BusFront',
    tagline: 'Origin of the route. Board here.',
  },
  {
    id: 'about',
    number: '02',
    label: 'About',
    name: 'About the Club',
    code: 'cat README.md',
    icon: 'BookOpen',
    tagline: 'What this repository is.',
  },
  {
    id: 'club-events',
    number: '03',
    label: 'Club Events',
    name: 'Club Events',
    code: 'git log --oneline',
    icon: 'GitPullRequestArrow',
    tagline: 'Two events in flight. Nothing merged yet.',
  },
  {
    id: 'about-events',
    number: '04',
    label: 'About Events',
    name: 'About the Events',
    code: 'open README.md',
    icon: 'FileText',
    tagline: 'What is TBA, and why we are not guessing.',
  },
  {
    id: 'domains',
    number: '05',
    label: 'Domains',
    name: 'Domains',
    code: 'git branch -a',
    icon: 'GitBranch',
    tagline: 'Branches exist. Leads do not — yet.',
  },
  {
    id: 'core-team',
    number: '06',
    label: 'Core Team',
    name: 'Core Team',
    code: 'git shortlog -sne',
    icon: 'Users',
    tagline: 'No contributors have pushed yet.',
  },
  {
    id: 'apply',
    number: '07',
    label: 'Apply',
    name: 'Apply to Join',
    code: 'hackwithindia apply',
    icon: 'GitBranch',
    tagline: 'Open a pull request against main.',
  },
  {
    id: 'register',
    number: '08',
    label: 'Register',
    name: 'Register',
    code: 'hackwithindia register',
    icon: 'SquareTerminal',
    tagline: 'Registration is not open yet. Here is how it will work.',
  },
  {
    id: 'query',
    number: '09',
    label: 'Query',
    name: 'Ask a Question',
    code: 'gh issue create',
    icon: 'CircleHelp',
    tagline: 'No closed issues yet. Be the first to ask.',
  },
  {
    id: 'handles',
    number: '10',
    label: 'Handles',
    name: 'Official Handles',
    code: 'git remote -v',
    icon: 'Network',
    tagline: 'Remotes get added once the accounts exist.',
  },
];

/** Ids in document order — feeds the rail and the scroll-spy. */
export const stopIds = stops.map((stop) => stop.id);

/** The terminus has no next stop, so clamp. */
export function getStop(index) {
  if (!Number.isFinite(index)) return stops[0];
  return stops[Math.min(Math.max(index, 0), stops.length - 1)];
}

/**
 * What the board announces: where the visitor is, and where the bus goes.
 * One function so the rail and the mobile bar say identical words.
 */
export function getStopAnnouncement(index) {
  const current = getStop(index);
  const next = stops[index + 1] ?? null;

  return {
    current,
    next,
    route: ROUTE.number,
    boardNumber: current.number,
    total: stops.length,
    nextLabel: next ? next.label : `${ROUTE.destination} — terminus`,
  };
}

/** Shown in the hero terminal before anything has been scrolled. */
export const routeStatus = {
  repo: `${repo.owner}/${repo.name}`,
  version: repo.version,
  branch: repo.branch,
  head: repo.head,
  stops: String(stops.length),
  mergedCommits: '0',
};