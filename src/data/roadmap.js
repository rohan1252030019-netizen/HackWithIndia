import { site } from './site.js';

export const roadmapIntro = {
  label: 'Annual Calendar',
  /** Driven by site.academicYear so the heading can never drift from the footer. */
  title: `${site.academicYear} Activity Roadmap`,
  description:
    'A structured, continuous operational schedule executed across all four academic quarters.',
};

/**
 * The chapter's operating plan for the current academic year.
 * Dates are the ones already published on the live site — preserved as-is.
 */
export const roadmapTimeline = [
  {
    quarter: 'Q1',
    term: 'AUG – OCT 2026',
    phase: 'Chapter Inception & Orientation',
    items: [
      'Official Chapter Onboarding & Committee Formation at VIT Pune',
      'Campus-wide Launch Keynote & Introductory Open-Source Workshop',
      'Intra-College Hackathon Preparation Bootcamp',
      'Registration drive for the Signature National Hackathon 2026',
    ],
  },
  {
    quarter: 'Q2',
    term: 'NOV – DEC 2026',
    phase: 'AI Systems & Cloud Masterclasses',
    items: [
      'Hands-on Masterclass: Autonomous Multi-Agent Workflows & Fine-Tuning',
      'Cloud Architecture & Microservices Deployment with Azure & Docker',
      'Bi-Weekly Algorithmic Sprint & Competitive Coding Contest',
      'Industry Mentorship Office Hours for Semester Projects',
    ],
  },
  {
    quarter: 'Q3',
    term: 'JAN – FEB 2027',
    phase: 'Web3, Security & Open-Source Month',
    items: [
      'Decentralized Protocols, Smart Contract Auditing & ZK-Proofs Series',
      'Annual Open-Source Contribution Sprint with Verified GitHub Badges',
      'Career Guidance & Technical Resume Review with Partner Tech Leads',
      'Internal Demo Day & Prototype Showcase with Cash Bounties',
    ],
  },
  {
    quarter: 'Q4',
    term: 'MAR – APR 2027',
    phase: 'Flagship Annual Hackathon & Awards',
    items: [
      'HackWithIndia VIT National Hackathon 2027 (48-Hour Signature Event)',
      'Enterprise Partner Bounty Judgement & Direct Internship Rollout',
      'Annual Innovation Awards & Committee Handover Ceremony',
      'Publication of Annual Chapter Impact Report',
    ],
  },
];
