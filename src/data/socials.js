/**
 * OFFICIAL HANDLES
 *
 * ── LAUNCH CHECKLIST ──────────────────────────────────────────────
 *   1. Replace every `TODO_HANDLE_*` URL below with the real one.
 *   2. Remove `null` from any handle you genuinely do not have.
 *   3. Delete the whole entry if a platform is not used — do not leave a
 *      placeholder row pointing nowhere.
 *
 * Only entries with a real URL are rendered. `url: null` renders nothing.
 * There is no "coming soon" row, because a link that goes nowhere is worse
 * than no link at all.
 */

export const socialsIntro = {
  command: 'git remote -v',
  hint: 'Every remote is clickable. Hover a line to copy the URL.',
  copyAllLabel: 'Copy all remotes',
  copiedLabel: 'Copied',
  disclaimer:
    'We will never message you asking for money. If a page claims to be Hack With India VIT Pune and asks for a fee, it is not us.',
};

/**
 * `url: null` → not rendered at all.
 * `handle` → the label shown after the URL.
 * `icon`  → a key in src/lib/socialIcons.jsx. Brand marks are not in
 *           lucide, so those five are hand-written inline SVG.
 */
export const socials = [
  {
    id: 'github',
    platform: 'GitHub',
    url: 'TODO_HANDLE_GITHUB_URL',
    handle: '@TODO_HANDLE_GITHUB',
    icon: 'github',
    note: 'Chapter source. Issues and pull requests welcome.',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'TODO_HANDLE_INSTAGRAM_URL',
    handle: '@TODO_HANDLE_INSTAGRAM',
    icon: 'instagram',
    note: 'Event posts and announcements.',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'TODO_HANDLE_LINKEDIN_URL',
    handle: 'TODO_HANDLE_LINKEDIN',
    icon: 'linkedin',
    note: 'Official page.',
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp',
    url: 'TODO_HANDLE_WHATSAPP_URL',
    handle: 'TODO_HANDLE_WHATSAPP',
    icon: 'whatsapp',
    note: 'Fastest way to reach the committee.',
  },
  {
    id: 'discord',
    platform: 'Discord',
    url: 'TODO_HANDLE_DISCORD_URL',
    handle: 'TODO_HANDLE_DISCORD',
    icon: 'discord',
    note: 'Build rooms and mentor sessions.',
  },
];

/** Only the remotes that are actually usable. */
export const activeSocials = socials.filter((s) => typeof s.url === 'string' && !s.url.startsWith('TODO_'));

/** The `git config user.email` line at the bottom of the terminal block. */
export const gitIdentity = {
  label: 'user.email',
  // TODO: set to the chapter inbox once it exists.
  value: 'TODO_CHAPTER_CONTACT_EMAIL',
};