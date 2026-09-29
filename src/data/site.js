/**
 * Single source of truth for chapter identity, contact and navigation.
 *
 * Anything that appears in more than one place lives here so a content
 * change is a one-line edit instead of a hunt through components.
 *
 * RULE: never invent a value. Anything not yet confirmed by the club is
 * written as TODO_* and rendered as an honest "coming soon" state rather
 * than a fabricated value.
 */

/** Production domain. Replace once the live URL is known. */
export const SITE_URL = 'TODO_UPDATE_PRODUCTION_DOMAIN';

export const site = {
  name: 'HackWithIndia',
  chapter: 'HWI VIT Pune Student Chapter',
  shortName: 'HWI VIT Pune',
  displayName: 'HACK WITH INDIA',

  /** Single academic year used site-wide. See PHASE 17. */
  academicYear: '2026–27',
  academicYearSlug: '2026-27',

  tagline: 'Faculty-Supported · Student-Led · Year-Round Innovation Ecosystem',
  description:
    'Official website of HackWithIndia (HWI) – VIT Pune Student Chapter at Vishwakarma Institute of Technology, Pune. Transforming learners into builders through hackathons, open-source, and industry mentorship.',

  campus: {
    name: 'Vishwakarma Institute of Technology',
    shortName: 'VIT Pune',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    address: 'Vishwakarma Institute of Technology, Pune, Maharashtra, India',
  },

  contact: {
    /** Chapter-wide inbox — already published on the current site. */
    email: 'chapters@hackwithindia.in',
    /** Replace with the chapter's own inbox once one exists. */
    chapterEmail: 'TODO_UPDATE_CHAPTER_EMAIL',
  },

  /**
   * Master switch for rendering individual member email addresses on the
   * Team section. Off by default: several stored addresses embed a VIT roll
   * number, which does not need to be public. Flip to true if the committee
   * decides to publish them.
   */
  showTeamEmails: false,

  /**
   * Primary club-level CTA target.
   * TODO: this must point at the official HWI VIT Pune join/registration
   * form. It is deliberately NOT wired to any third-party site.
   */
  joinUrl: 'TODO_ADD_JOIN_FORM_URL',

  socials: {
    // TODO_UPDATE_THIS — add real, verified HWI VIT Pune handles.
    github: 'TODO_UPDATE_THIS',
    linkedin: 'TODO_UPDATE_THIS',
    instagram: 'TODO_UPDATE_THIS',
    discord: 'TODO_UPDATE_THIS',
    x: 'TODO_UPDATE_THIS',
  },

  /**
   * National HWI platform references. These are real links already published
   * on the existing site, so they are preserved verbatim.
   *
   * Devnovate is listed explicitly as the incubator partner so it can never
   * be mistaken for a membership or registration path.
   */
  officialLinks: [
    { label: 'hackwithindia.in', url: 'https://hackwithindia.in/' },
    { label: 'hackwithindia.in/chapters', url: 'https://hackwithindia.in/chapters' },
    { label: 'devnovate.co (incubator partner)', url: 'https://devnovate.co/' },
  ],
};

/**
 * Canonical section order. Drives the mobile drawer, the footer, and which
 * section the navbar marks active.
 *
 * `hideInDesktop` marks sections that exist in the page but would overcrowd
 * the desktop link row — they stay reachable by scrolling and from the
 * mobile drawer.
 */
export const navItems = [
  { label: 'Overview', id: 'overview' },
  { label: 'Objectives', id: 'objectives' },
  { label: 'Ecosystem', id: 'ecosystem' },
  { label: 'Impact', id: 'impact', hideInDesktop: true },
  { label: 'Benefits', id: 'benefits' },
  { label: 'Events', id: 'events' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'Partners', id: 'partners' },
  { label: 'Team', id: 'team' },
  { label: 'Gallery', id: 'gallery', hideInDesktop: true },
  { label: 'Join', id: 'join' },
  { label: 'FAQ', id: 'faq' },
];

/** Footer shows a curated subset rather than the full section list. */
export const footerNavItems = navItems.filter((item) =>
  [
    'overview',
    'objectives',
    'ecosystem',
    'events',
    'roadmap',
    'partners',
    'team',
    'join',
    'faq',
  ].includes(item.id)
);

/** Flagged so components can render an honest placeholder instead of a fake link. */
export const isPending = (value) => typeof value === 'string' && value.startsWith('TODO_');
