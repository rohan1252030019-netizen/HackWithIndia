/**
 * STOP 07 — APPLY
 *
 * "Open a pull request" against the chapter.
 *
 * ── NO BACKEND ───────────────────────────────────────────────────
 * config.apply.endpoint is still a TODO. On submit this form validates,
 * then hands you a copyable summary and opens a prefilled mail draft. It
 * does not pretend to have saved anything.
 *
 * ── WHEN YOU WIRE AN ENDPOINT ────────────────────────────────────
 *   1. Put your form URL in config.js → apply.endpoint.
 *   2. In Apply.jsx, POST the `payload` object to it.
 *   That is the only change needed; the success state already exists.
 * ─────────────────────────────────────────────────────────────────
 */

import { allOpenRoles } from './domains.js';

export const applyIntro = {
  label: 'Stop 07',
  title: 'Open a Pull Request',
  description:
    'Joining works like contributing to a repo. Open a pull request, a domain lead reviews it, it gets merged. No interview, no selection test, no fee.',

  repo: 'hackwithindia/vit-pune-chapter',
  base: 'main',
  compare: 'your-branch → main',
  statusLine: 'Draft a pull request',
  reviewTime: 'A founding committee member responds within a few days.',
  privacyNote:
    'We use this only to route you to the right domain lead. It is not shared outside the club.',
};

/** Labels you can put on your pull request. */
export const labels = [
  { id: 'first-hack', label: 'first hack', tone: 'good', hint: 'Never competed before.' },
  { id: 'cross-branch', label: 'cross-branch team', tone: 'good', hint: 'Team spans two or more branches.' },
  { id: 'design-lane', label: 'design lane', tone: 'neutral', hint: 'UI/UX, brand, deck, demo video.' },
  { id: 'ops-lane', label: 'ops lane', tone: 'neutral', hint: 'Logistics, judging, sponsorship, comms.' },
  { id: 'research-lane', label: 'research lane', tone: 'neutral', hint: 'Domain research and pitch writing.' },
  { id: 'solo', label: 'solo applicant', tone: 'neutral', hint: 'Will be matched with a team.' },
];

/** Domain branches, from domains.js. Kept in sync automatically. */
export const domainOptions = [
  { id: 'undecided', label: 'Not decided yet' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'design', label: 'Design & Outreach' },
];

export const roleOptions = ['Not sure yet', ...allOpenRoles];

export const years = ['FY-A', 'FY-B', 'SY-A', 'SY-B', 'TY-A', 'TY-B'];

/** The pre-filled description template. The biggest driver of response quality. */
export const prTemplate = `## What I want to work on

<!-- One or two sentences. Specific beats impressive. -->

## Why this domain

<!-- Which branch you picked, and what you already know about it. -->

## What I need from the club

- [ ] A domain mentor
- [ ] Event ops support
- [ ] Design help
- [ ] Outreach help
- [ ] Just a desk and Wi-Fi

## Team

<!-- Names, branches, years. Solo is fine — say so. -->

## Time I can commit

<!-- e.g. "6 hrs/week, plus all 24 hackathon hours" -->

## Links

<!-- Repo, Figma, write-up. Nothing required. -->`;

/** Rendered one after another after submit, like PR status checks. */
export const checks = [
  { id: 'required', label: 'Required fields present', detail: 'name, email, why' },
  { id: 'format', label: 'Email format valid', detail: 'passed' },
  { id: 'branch', label: 'Target branch exists', detail: 'creating from main' },
  { id: 'route', label: 'Routed to a domain lead', detail: 'assigning reviewer' },
];

/** After all checks pass. */
export const successState = {
  heading: 'Awaiting review',
  checksPassing: 'Checks passing',
  body: 'Your pull request is drafted and ready. Send it and a founding committee member will review it.',
  cta: 'Register your team',
  ctaTarget: 'register',
};

export const fields = {
  name: { label: 'Name', placeholder: 'Your full name', required: true },
  email: { label: 'Email', placeholder: 'you@vit.edu', type: 'email', required: true },
  branch: { label: 'Your branch', placeholder: 'AIML', required: true },
  year: { label: 'Year', type: 'select', options: years, required: false },
  domain: { label: 'Domain branch', type: 'select', options: domainOptions, required: true },
  role: { label: 'Role you want', type: 'select', options: roleOptions, required: false },
  why: {
    label: 'Why do you want to join?',
    placeholder: 'A couple of sentences is plenty.',
    required: true,
    rows: 4,
  },
};