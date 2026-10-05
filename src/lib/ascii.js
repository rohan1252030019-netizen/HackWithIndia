/**
 * Console banner + the `join()` recruitment hook.
 *
 * ─────────────────────────────────────────────────────────────────
 * Note on the discount-code easter egg: the previous brief asked for a
 * secret code revealed by `sudo win`. There is no offer, so there is no
 * code. `join()` instead returns a real recruitment message. Putting a
 * fake discount on a public site is a small lie with a big downside.
 * ─────────────────────────────────────────────────────────────────
 */

import { site } from '../data/site.js';
import { contact, DEVANAGARI } from '../data/config.js';

const BANNER = `
   ██╗  ██╗ ███╗   ███╗ ██╗
   ██║ ██╔╝████╗ ████║ ██║
   █████╔╝ ██╔████╔██║ ██║
   ██╔═██╗ ██║╚██╔╝██║ ██║
   ██║  ██╗██║ ╚═╝ ██║ ╚██████╗
   ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═════╝
              V I T   P U N E
`;

const LOGO = [
  '  ┌───────────────────────────────────────────┐',
  '  │  Hack With India — VIT Pune               │',
  '  │  v0.1.0 · initial commit · 2 events open  │',
  '  │  हॅक विथ इंडिया                             │',
  '  └───────────────────────────────────────────┘',
];

/**
 * Prints the banner and the recruitment hook to the console.
 *
 * Deliberately not an animation or a canvas easter egg — a block of
 * crimson text in DevTools is the whole joke.
 */
export function printBanner() {
  if (typeof console === 'undefined') return;

  console.log('%cHack With India — VIT Pune', 'color:#ff003c;font-size:16px;font-weight:bold');
  console.log(BANNER);
  console.log(LOGO.join('\n'));
  console.log(
    '%cA brand-new student club. No past events, no fabricated numbers.\n' +
      'Two events are open. The repo is at initial commit.\n\n' +
      'Open roles: run  join()',
    'color:#a1a1aa'
  );
}

/**
 * `join()` — the console recruitment function.
 *
 * Returns a real object rather than printing and returning undefined, so
 * `join()` in the console gives you something you can actually read.
 */
export function join() {
  const role = {
    club: site.chapter,
    status: 'recruiting',
    version: 'v0.1.0',
    reason: 'A brand-new club needs its founding committee more than it needs a CV.',
    openRoles: [
      'Technical Lead',
      'Event Coordinator',
      'Design Lead',
      'Outreach Coordinator',
      'Domain Mentor',
    ],
    how: [
      '1. Open a pull request on the Apply stop of the website.',
      '2. Tell us what you want to work on — no interview, no fee.',
      '3. A founding member reviews it and gets back to you.',
    ],
    contact: contact.email.startsWith('TODO_') ? 'TODO: not published yet' : contact.email,
    devanagari: DEVANAGARI,
  };

  if (typeof console !== 'undefined') {
    console.log('%cHack With India is recruiting.', 'color:#ff003c;font-weight:bold');
    console.table(role.openRoles.map((title) => ({ role: title })));
    console.log(role.how.join('\n'));
    console.log('Contact:', role.contact);
  }

  return role;
}

/**
 * The Konami sequence. Matched globally, triggers the confetti burst.
 * Kept here so the sequence is not duplicated in the component.
 */
export const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/** Installs the console hooks. Called once from App. */
export function installConsoleHooks() {
  if (typeof window === 'undefined') return undefined;

  try {
    printBanner();
    window.join = join;
    return () => {
      delete window.join;
    };
  } catch {
    // Some browsers block this; the site must not care.
    return undefined;
  }
}