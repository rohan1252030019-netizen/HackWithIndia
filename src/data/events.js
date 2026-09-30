/**
 * Chapter events.
 *
 * ─────────────────────────────────────────────────────────────────
 * IMPORTANT — READ BEFORE PUBLISHING
 * Nothing in this file is an officially announced HWI VIT Pune event.
 * Every entry below is DERIVED from the chapter's own published roadmap
 * (src/data/roadmap.js) and ecosystem copy, not from an announcement.
 * Each carries `source` and `needsConfirmation: true` for that reason.
 *
 * To publish a real event:
 *   1. Replace the TODO_ values with the confirmed details.
 *   2. Set needsConfirmation to false.
 *   3. Set status to 'upcoming' | 'live' | 'completed'.
 *
 * If a date is genuinely unknown, leave it as TODO_DATE — the section
 * renders an honest "date to be announced" chip rather than inventing one.
 * ─────────────────────────────────────────────────────────────────
 */

export const eventsIntro = {
  label: 'Chapter Calendar',
  title: 'Upcoming Events',
  description:
    'Workshops, sprints and flagship hackathons run by the chapter across the academic year. Dates are published here as they are confirmed by the committee.',
};

export const events = [
  {
    id: 'national-hackathon-2026',
    quarter: 'Q1',
    title: 'HackWithIndia National Hackathon 2026 — VIT Pune',
    date: 'October 2026',
    time: 'TODO_TIME',
    location: 'VIT Pune · In-person & Hybrid',
    category: 'Hackathon',
    description:
      'Our signature 48-hour build sprint across AI, Web3, FinTech and CleanTech tracks, with institutional jury evaluation, a cash prize pool, and a dedicated VIT Pune chapter track. Chapter onboarding, committee formation and a preparation bootcamp run ahead of it.',
    registrationUrl: 'TODO_ADD_JOIN_FORM_URL',
    status: 'upcoming',
    needsConfirmation: true,
    source: 'roadmap Q1 + ecosystem mosaic "48-Hour National Hackathons"',
  },
  {
    id: 'ai-cloud-masterclasses',
    quarter: 'Q2',
    title: 'AI Systems & Cloud Masterclass Series',
    date: 'November – December 2026',
    time: 'TODO_TIME',
    location: 'VIT Pune',
    category: 'Workshop',
    description:
      'Hands-on masterclasses on autonomous multi-agent workflows and fine-tuning, plus cloud architecture and microservices deployment with Azure and Docker. Runs alongside a bi-weekly algorithmic sprint.',
    registrationUrl: 'TODO_ADD_JOIN_FORM_URL',
    status: 'upcoming',
    needsConfirmation: true,
    source: 'roadmap Q2',
  },
  {
    id: 'open-source-sprint',
    quarter: 'Q3',
    title: 'Annual Open-Source Contribution Sprint',
    date: 'January – February 2027',
    time: 'TODO_TIME',
    location: 'VIT Pune · Online',
    category: 'Open Source',
    description:
      'A focused contribution sprint aimed at shipping reviewed pull requests to international repositories, with verified GitHub badges for participants. Paired with technical resume reviews by partner engineers.',
    registrationUrl: 'TODO_ADD_JOIN_FORM_URL',
    status: 'upcoming',
    needsConfirmation: true,
    source: 'roadmap Q3',
  },
  {
    id: 'internal-demo-day',
    quarter: 'Q3',
    title: 'Internal Demo Day & Prototype Showcase',
    date: 'January – February 2027',
    time: 'TODO_TIME',
    location: 'VIT Pune',
    category: 'Showcase',
    description:
      'Members present what they shipped during the semester. Best prototypes compete for chapter cash bounties and enterprise partner review.',
    registrationUrl: 'TODO_ADD_JOIN_FORM_URL',
    status: 'upcoming',
    needsConfirmation: true,
    source: 'roadmap Q3',
  },
  {
    id: 'annual-hackathon-2027',
    quarter: 'Q4',
    title: 'HackWithIndia VIT National Hackathon 2027',
    date: 'March – April 2027',
    time: 'TODO_TIME',
    location: 'VIT Pune',
    category: 'Hackathon',
    description:
      'The chapter’s flagship 48-hour annual event, closing the academic year with partner bounty judgement, internship rollout, the annual innovation awards, and the committee handover ceremony.',
    registrationUrl: 'TODO_ADD_JOIN_FORM_URL',
    status: 'planned',
    needsConfirmation: true,
    source: 'roadmap Q4',
  },
];

export const eventCategories = ['All', 'Hackathon', 'Workshop', 'Open Source', 'Showcase'];
