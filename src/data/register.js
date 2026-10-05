/**
 * STOP 08 — REGISTER
 *
 * A real terminal. `$ hackwithindia register --team "name" --size 4`
 * parses, fills the form behind it, and updates the checklist.
 *
 * ── REGISTRATION IS NOT OPEN ─────────────────────────────────────
 * config.REGISTRATION_OPEN is false. So the terminal is a DEMO: it
 * parses your command perfectly and tells you honestly that registration
 * has not opened yet. It does not pretend to have saved a seat, and it
 * shows no seat counts, because we do not know them.
 *
 * Flip config.REGISTRATION_OPEN to true when registrations are live and
 * every CTA across the site starts working.
 * ─────────────────────────────────────────────────────────────────
 */

import { REGISTRATION_OPEN } from './config.js';

export const registerIntro = {
  label: 'Stop 08',
  title: 'Register',
  description:
    'This terminal actually parses what you type. Try it — then scroll down, because registration has not opened yet.',

  prompt: 'hwi@vit:~/register',
  user: 'hwi',
  host: 'vit',
};

export const bootLines = [
  { text: 'hackwithindia-cli v0.1.0 (initial commit)', tone: 'dim' },
  { text: 'Type `hackwithindia --help` for commands, or `help`.', tone: 'dim' },
];

/** Clickable chips. Each one runs the command for you. */
export const suggestions = [
  { label: 'register a team', command: 'hackwithindia register --team "chai squad" --size 4' },
  { label: 'is registration open?', command: 'hackwithindia status' },
  { label: 'what can you do?', command: 'hackwithindia --help' },
  { label: 'who can register?', command: 'hackwithindia whoami' },
];

/** Drives both `--help` output and the parser's suggestions. */
export const commands = [
  {
    cmd: 'register',
    usage: 'register --team "<name>" --size <n>',
    summary: 'Register a team for the hackathon.',
    example: 'hackwithindia register --team "chai squad" --size 4',
  },
  {
    cmd: 'status',
    usage: 'status',
    summary: 'Show whether registration is open.',
    example: 'hackwithindia status',
  },
  {
    cmd: 'whoami',
    usage: 'whoami',
    summary: 'Print the eligibility rules.',
    example: 'hackwithindia whoami',
  },
  {
    cmd: 'apply',
    usage: 'apply',
    summary: 'Open the join-the-committee pull request.',
    example: 'hackwithindia apply',
  },
  {
    cmd: 'branches',
    usage: 'branches',
    summary: 'List the domain branches.',
    example: 'hackwithindia branches',
  },
];

/**
 * Easter eggs. Matched in the terminal handler; copy lives here so it
 * stays editable. NOTE: `sudo win` reveals NO discount code — we do not
 * have offers and we are not faking one.
 */
export const easterEggs = {
  win: {
    command: 'sudo win',
    output: 'Nice try. Register for real :)',
    note: 'No cheat codes. We are a student club, not a scam.',
  },
  blame: {
    command: 'git blame chai',
    output: [
      'c0ffee00  (Nobody  1970-01-01) chai.run();',
      'c0ffee00  (Nobody  1970-01-01) // blame this and you find nobody',
      '',
      'The club has not made any chai yet. That is the honest git log.',
    ],
  },
};

/** `hackwithindia status` output. Registration is not open. */
export const statusOutput = {
  open: REGISTRATION_OPEN,
  lines: REGISTRATION_OPEN
    ? [
        'registration   : OPEN',
        'venue          : TBA',
        'max teams      : TBA',
        'fee            : free',
      ]
    : [
        'registration   : NOT OPEN YET',
        'reason         : dates, venue and rules still being confirmed',
        'fee            : free, and will stay free',
        'what to do     : hackwithindia apply  (join the committee instead)',
      ],
};

/** `hackwithindia whoami` output — eligibility, which we DO know. */
export const whoamiOutput = [
  'eligibility    : any enrolled VIT Pune student',
  'years          : first year through final year',
  'branches       : all of them',
  'membership fee : 0',
  'prior experience: not required',
  'cross-college  : the hackathon is open to other colleges too',
];

/** `hackwithindia branches` output. */
export const branchList = [
  'domain/hackathons',
  'domain/ai-ml',
  'domain/cybersecurity',
  'domain/web-dev',
  'domain/design',
];

/** The form fallback — same state as the terminal. */
export const formFields = {
  team: { label: 'Team name', placeholder: 'chai squad', required: true },
  size: { label: 'Team size', type: 'select', options: ['2', '3', '4'], required: true },
  email: { label: 'Email', type: 'email', placeholder: 'you@vit.edu', required: true },
};

/** The checklist that "registers" the team. Mirrors a passing CI run. */
export const checklist = [
  { id: 'team', label: 'team name parsed' },
  { id: 'size', label: 'team size parsed' },
  { id: 'email', label: 'contact email captured' },
];

/**
 * Shown because registration is closed. A "notify me" capture is the
 * honest alternative to a dead link.
 */
export const closedState = {
  heading: 'Registration is not open yet',
  body: 'We are confirming dates, venue and rules first. Registration will open once those are locked — no silent signup list, no payment.',
  cta: 'Apply to the committee instead',
  ctaTarget: 'apply',
};

/** Shown if registration is open and the form is actually submitted. */
export const successState = {
  heading: 'Registered',
  body: 'Your team is on the list. Check your email for the venue brief.',
};