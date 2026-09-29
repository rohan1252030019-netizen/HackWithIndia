import { site } from './site.js';

/**
 * Chapter leadership — preserved exactly as published on the current site.
 * No members added, removed or renamed.
 *
 * EMAIL PRIVACY
 * -------------
 * Individual student addresses (several of which embed a VIT roll number)
 * are stored but NOT rendered by default. Set `showTeamEmails: true` in
 * `site.js` if the committee decides these should be public.
 *
 * Roles without a stored address fall back to a role-based mailto so no card
 * ever renders a dead or malformed link.
 */

export const teamIntro = {
  label: 'Leadership',
  title: 'Meet the Core Team',
  description:
    "The founding leadership driving HackWithIndia's VIT Pune chapter — builders, organisers, and community architects.",
  footerNote: `VIT Pune Chapter · Academic Year ${site.academicYear}`,
};

export const coreTeam = [
  {
    name: 'Atharv Rahate',
    designation: 'President',
    branch: 'AIML',
    year: 'TY-G',
    email: 'atharvdrahate@gmail.com',
    contactLabel: 'President',
    initials: 'AR',
    color: '#ff003c',
  },
  {
    name: 'Arya Bhaiya',
    designation: 'Vice-President',
    branch: 'IT',
    year: 'SY-A',
    email: 'aryabhaiya31@gmail.com',
    contactLabel: 'Vice-President',
    initials: 'AB',
    color: '#ff4d6d',
  },
  {
    name: 'Bramha Gulavani',
    designation: 'Secretary',
    branch: 'AIML',
    year: 'TY-G',
    email: null,
    contactLabel: 'Secretary',
    initials: 'BG',
    color: '#ff003c',
  },
  {
    name: 'Harshvardhan Dhere',
    designation: 'Treasurer',
    branch: 'AIML',
    year: 'TY-G',
    email: 'harshvardhan.1252030014@vit.edu',
    contactLabel: 'Treasurer',
    initials: 'HD',
    color: '#ff4d6d',
  },
  {
    name: 'Chaitanya Rathod',
    designation: 'Event Coordinator',
    branch: 'IT',
    year: 'TY-G',
    email: 'chaitanya.1252130014@vit.edu',
    contactLabel: 'Event Coordination',
    initials: 'CR',
    color: '#ff003c',
  },
  {
    name: 'Bhoomi Baghele',
    designation: 'Public Relations Officer',
    branch: 'CSE',
    year: 'SY-B',
    email: 'bhoomi.1251070313@vit.edu',
    contactLabel: 'PR & Outreach',
    initials: 'BB',
    color: '#ff4d6d',
  },
  {
    name: 'Piyush Dahatonde',
    designation: 'Social Media Head',
    branch: 'IC',
    year: 'SY-A',
    email: 'piyush.1251140071@vit.edu',
    contactLabel: 'Social Media',
    initials: 'PD',
    color: '#ff003c',
  },
];

/** Committee roles open to interested students, as already described in the FAQ. */
export const openRoles = [
  'Technical Lead',
  'Event Operations Lead',
  'Open-Source Lead',
  'PR & Outreach Coordinator',
  'UI/UX Design Lead',
  'Domain Mentor',
];
