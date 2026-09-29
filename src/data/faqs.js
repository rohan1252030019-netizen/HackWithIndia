import { site } from './site.js';

/** FAQ copy preserved verbatim from the live site. */
export const faqs = [
  {
    q: 'What is the HackWithIndia (HWI) VIT Pune Student Chapter?',
    a: 'It is the official faculty-supported, student-led technical innovation community at Vishwakarma Institute of Technology, Pune. Unlike an isolated annual event, HWI operates as a year-round ecosystem connecting VIT Pune students directly to national hackathons, workshops, industry mentors, and partner engineering labs.',
  },
  {
    q: 'Who is eligible to participate and join?',
    a: 'All enrolled students of VIT Pune across all years (First Year through Final Year) and from all branches (Computer Engineering, IT, AI&DS, Electronics, Mechanical, Chemical, Instrumentation, etc.) are welcome. Cross-disciplinary collaboration is core to our mission.',
  },
  {
    q: 'Are there any registration or membership fees?',
    a: 'No. Membership in the HWI VIT Pune Student Chapter is 100% free. All regular technical workshops, mentorship office hours, coding sprints, and community mixers are organized with zero cost to students.',
  },
  {
    q: 'How does the chapter help students win national hackathons?',
    a: 'We run dedicated preparation tracks: team-formation matchmaking to pair developers with designers and domain leads, technical architecture reviews before submissions, and 1-on-1 pitch practice with past national champions.',
  },
  {
    q: 'What leadership and committee roles can students apply for?',
    a: 'Students can apply for roles including Technical Lead, Event Operations Lead, Open-Source Lead, PR & Outreach Coordinator, UI/UX Design Lead, and Domain Mentors under the guidance of Faculty Advisors.',
  },
  {
    q: 'How does this help with campus placements and internships?',
    a: 'Through verified partnerships with companies like Microsoft, GitHub, Postman, and Polygon, active builders get direct access to sponsor challenge bounties, referrals from mentors, and hands-on production code for their technical portfolios.',
  },
];

export const faqIntro = {
  label: 'Student Handbook',
  title: 'Frequently Asked Questions',
  description:
    'Key details about membership, committee involvement, branch eligibility, and hackathons.',
};

/** Final CTA copy. Academic year is pulled from the single source of truth. */
export const finalCta = {
  badge: `VIT PUNE · ${site.academicYear} ACADEMIC YEAR`,
  title: 'Ready to Ship Real Code?',
  description:
    'Join the official community of student builders, hackers, and creators at Vishwakarma Institute of Technology.',
};

/** Hero copy. */
export const hero = {
  repoBranch: 'vit-pune-chapter',
  subtitle: 'VIT Pune Student Chapter',
  tagline: 'Faculty-Supported · Student-Led · Year-Round Innovation Ecosystem',
  description:
    'Transforming learners into builders through national hackathons, production workshops, open-source sprints, and direct 1-on-1 industry mentorship.',
  words: [
    { text: 'HACK', letters: ['H', 'A', 'C', 'K'] },
    { text: 'WITH', letters: ['W', 'I', 'T', 'H'] },
    { text: 'INDIA', letters: ['I', 'N', 'D', 'I', 'A'] },
  ],
  secondaryCtaLabel: `Explore ${site.academicYear} Roadmap`,
};
