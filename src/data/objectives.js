/**
 * Objectives section.
 *
 * `pillars` are the two large flagship cards, `supporting` are the four
 * smaller ones. Copy is preserved verbatim from the current live site.
 */

export const objectivesIntro = {
  label: 'Strategic Pillars',
  title: 'Core Chapter Objectives',
  description:
    'Six foundational focus areas structured to bridge the divide between theoretical classroom syllabus and real-world software engineering.',
};

export const pillarOne = {
  icon: 'Code2',
  tone: 'crimson',
  badge: 'FLAGSHIP PILLAR // 01',
  title: 'Technical Skill & Production Engineering',
  description:
    'Hands-on training in scalable backend architectures, multi-agent AI systems, decentralized protocols, and continuous integration—shipping real software rather than toy assignments.',
  points: ['Live deployments', 'Modern microservices', 'GPU & LLM pipelines'],
};

export const pillarTwo = {
  icon: 'Trophy',
  tone: 'neutral',
  badge: 'FLAGSHIP PILLAR // 02',
  title: 'National Hackathon Excellence',
  description:
    'A structured preparation pipeline taking student teams through ideation, technical architecture vetting, prototype polish, and live jury pitching.',
  footerLabel: 'Matchmaking & Mentorship',
};

export const supportingPillars = [
  {
    icon: 'Rocket',
    title: 'Product & MVP Incubation',
    desc: 'Transforming winning prototypes into sustainable open-source tools and student-founded startup ventures.',
  },
  {
    icon: 'Briefcase',
    title: 'Direct Industry Referrals',
    desc: 'Direct hiring pipelines, challenge bounty evaluations, and referral networks with enterprise tech leaders.',
  },
  {
    icon: 'GitPullRequest',
    title: 'Global Open-Source Culture',
    desc: 'Guiding students to contribute verified, reviewed pull requests to international developer repositories.',
  },
  {
    icon: 'Users',
    title: 'Student Leadership Governance',
    desc: 'Empowering cross-branch teams to organize national-scale technical events, hackathons, and community sprints.',
  },
];

/** Overview / chapter-philosophy copy block. */
export const overview = {
  label: 'Chapter Philosophy & Model',
  headline: 'A year-round building ecosystem, not an annual weekend sprint.',
  charterLabel: 'VIT Pune Chapter Charter // Mission Statement',
  charterQuote:
    '“A year-round ecosystem connecting builders, startups, and mentors — not an annual weekend sprint.”',
  charterBody:
    'Establishing permanent technical infrastructure, continuous open-source contribution sprints, and institutional industry pipelines across Vishwakarma Institute of Technology.',
  paragraphs: [
    {
      lead: 'HackWithIndia (HWI)',
      rest: ' is a nationwide innovation community connecting 50,000+ student developers across India. Rather than operating merely as a competition host, HWI establishes permanent technical hubs inside premier institutions.',
    },
    {
      lead: 'The VIT Pune Student Chapter',
      rest: ' provides faculty-supported, student-led governance. It provides a formal pipeline where students get access to computing resources, hackathon travel assistance, enterprise challenge bounties, and senior mentorship throughout the academic calendar.',
    },
  ],
  schematic: {
    heading: '[COMMUNITY_ARCHITECTURE_FLOW]',
    version: 'v2026.09',
    nodes: [
      {
        icon: 'GraduationCap',
        title: 'VIT Pune Students',
        desc: 'Cross-branch developers, designers & researchers',
        tone: 'neutral',
      },
      {
        icon: 'Network',
        title: 'HWI Student Chapter',
        desc: 'Core committee, mentorship & hackathon hub',
        tone: 'crimson',
      },
      {
        icon: 'Building2',
        title: 'Global Industry Labs',
        desc: 'Microsoft, GitHub, Postman, Polygon & Solana',
        tone: 'neutral',
      },
    ],
  },
};

/** Mutual value split comparison. */
export const benefits = {
  label: 'Value Proposition',
  title: 'Mutual Value & Institutional Impact',
  description:
    'A sustainable framework delivering verified outcomes for both student careers and institutional prestige.',
  columns: [
    {
      icon: 'GraduationCap',
      tone: 'crimson',
      title: 'For VIT Pune Students',
      subtitle: 'Practical skills & career acceleration',
      iconColorClass: 'text-[#ff4d6d]',
      iconSurfaceClass: 'bg-[#1b1216] border-[#ff003c]/50',
      checkClass: 'text-[#ff003c]',
      points: [
        'Direct hands-on production code experience beyond textbooks',
        'Curated team matching and travel support for national hackathons',
        'Private 1-on-1 mentorship from principal architects & founders',
        'Strong GitHub project portfolios verified for tech resumes',
        'Direct referral pipelines for competitive internships & fellowships',
        'Free developer tooling perks, cloud credits, and hardware swag',
      ],
    },
    {
      icon: 'Building2',
      tone: 'neutral',
      title: 'For Vishwakarma Institute of Technology',
      subtitle: 'Institutional visibility & placement strength',
      iconColorClass: 'text-white',
      iconSurfaceClass: 'bg-[#14141c] border-white/15',
      checkClass: 'text-zinc-400',
      points: [
        'Strengthens campus-wide innovation, research, and patent culture',
        'Promotes interdisciplinary collaboration across engineering branches',
        'Elevates national standing on NIRF, NAAC, and tech community benchmarks',
        'Establishes formal partnerships with Microsoft, GitHub, Postman, and Polygon',
        'Increases top-tier product placement offers through industry challenge tracks',
        'Creates high-visibility student leadership with faculty-backed governance',
      ],
    },
  ],
};
