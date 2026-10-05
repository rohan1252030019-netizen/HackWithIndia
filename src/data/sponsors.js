/**
 * SPONSORS & PARTNERS
 *
 * Intentionally EMPTY. Hack With India is a brand-new club and has no
 * sponsors. Putting logos here would be a lie.
 *
 * ── WHEN YOU LAND A SPONSOR ───────────────────────────────────────
 *   1. Add an object below with a real logo path and a real URL.
 *   2. Drop the logo in /public/sponsors/ (.webp or .svg, <40 KB).
 *   3. Set `tier` to 'presenting' | 'partner' | 'supporter'.
 *
 * The footer renders a "Partner with us" call to action while this array
 * is empty, and a logo grid once it is not. Nothing else changes.
 */

export const sponsorsIntro = {
  label: 'Sponsors',
  title: 'Partner with us',
  description:
    'Hack With India is a brand-new club at VIT Pune with no sponsors yet. If your organisation wants to support student builders on this campus, we would like to hear from you.',
  ctaLabel: 'Talk to us about sponsoring',
  // TODO: point this at your sponsorship enquiry (same as contact.email
  // until you have a dedicated inbox).
  ctaUrl: 'mailto:TODO_CHAPTER_CONTACT_EMAIL',
};

/** Empty on purpose. See the note at the top of this file. */
export const sponsors = [
  // {
  //   id: 'acme',
  //   name: 'Acme Corp',
  //   url: 'https://acme.example',
  //   logo: '/sponsors/acme.webp',
  //   tier: 'presenting',
  // },
];

/** Tier order for rendering, most prominent first. */
export const sponsorTiers = ['presenting', 'partner', 'supporter'];