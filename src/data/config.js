/**
 * ═══════════════════════════════════════════════════════════════════
 * CONFIG — the only file in this project that is allowed to hold a URL.
 * ═══════════════════════════════════════════════════════════════════
 *
 * RULE: if a link is needed anywhere on this site, it is added HERE and
 * nowhere else. Components import from this file and render an honest
 * "notify me" capture when the value is still missing. That is why the
 * site can never ship a dead link or a placeholder that looks real.
 *
 * ── LAUNCH CHECKLIST ──────────────────────────────────────────────
 *   1. Paste the two registration URLs (below).
 *   2. Paste the club's contact email.
 *   3. Paste the real social URLs into socials.js.
 *   4. Set REGISTRATION_OPEN once registrations are actually live.
 *   Everything else on the site updates from these.
 * ─────────────────────────────────────────────────────────────────
 */

/** Production domain. Feeds canonical, og:url, JSON-LD and the sitemap. */
export const SITE_URL = 'https://hackwithindia-vit-pune.vercel.app';

/**
 * Master switch for registration.
 *
 * false → every Register CTA renders a "Notify me" email capture instead
 *         of a link. We do not link to a form that does not exist.
 */
export const REGISTRATION_OPEN = false;

/** Where "register" actually goes, split by audience (Vishwa-style). */
export const register = {
  /** VIT Pune students. */
  vitUrl: 'TODO_REGISTER_URL_VIT_STUDENTS',
  /** Students from other colleges. */
  otherCollegesUrl: 'TODO_REGISTER_URL_OTHER_COLLEGES',
};

/** Where the club's own "join the committee" pull request is submitted. */
export const apply = {
  /** A form endpoint: Formspree, Basin, a Worker, whatever you use. */
  endpoint: 'TODO_APPLY_FORM_ENDPOINT',
};

/** Fallback contact. Shown wherever there is no form to submit to. */
export const contact = {
  email: 'TODO_CHAPTER_CONTACT_EMAIL',
};

/**
 * Devanagari wordmark. Rendered in the hero and the footer.
 * Font is Mukta — see index.html.
 */
export const DEVANAGARI = 'हॅक विथ इंडिया';

/**
 * Hinglish / Marathi microcopy.
 *
 * Deliberately three strings. Any more and the joke stops being a joke.
 * Keep them short enough to read at a glance on a 360px screen.
 */
export const hinglish = {
  hero: 'Chalo build karuya.',
  build: 'Kay mag, ready ka?',
  footer: 'Aaj join kar, kal ship kar.',
};

/**
 * Flag for any value we do not have yet.
 *
 * Anything starting with `TODO_` renders as an honest "TBA" state rather
 * than a plausible-looking stand-in. This is the mechanism behind the
 * site's honesty rule — please do not "temporarily" comment it out.
 */
export const isPending = (value) => typeof value === 'string' && value.startsWith('TODO_');

/**
 * Resolves a registration URL for a given audience.
 *
 * Returns `null` when the URL is still a placeholder. Callers MUST treat
 * null as "show the notify-me capture" — never as "fall back to /".
 */
export function resolveRegisterUrl(audience = 'vit') {
  const url = audience === 'other' ? register.otherCollegesUrl : register.vitUrl;
  return isPending(url) ? null : url;
}

/** The repository this site pretends to be. Used by the terminal and 404. */
export const repo = {
  owner: 'hackwithindia',
  name: 'vit-pune-chapter',
  branch: 'main',
  /** "Initial commit" — we are genuinely at v0.1.0. */
  head: '0000000',
  version: 'v0.1.0',
};