import { site } from './site.js';

/**
 * Join / Apply section.
 *
 * The application CTA points at `site.joinUrl`, which is a TODO placeholder
 * until the official HWI VIT Pune form exists. The component renders a
 * disabled, clearly-labelled state in the meantime rather than sending
 * students somewhere that is not the chapter's own form.
 */

export const joinIntro = {
  label: 'Membership',
  title: 'Join HWI VIT Pune',
  description:
    'HWI is open to every enrolled VIT Pune student, in every year and every branch. Membership is free — everything we run is funded by partners and run by students.',
};

export const joinWho = {
  title: 'Who can join',
  points: [
    'Any enrolled VIT Pune student — First Year through Final Year',
    'Every branch, not just Computer or IT. Design, electronics, mechanical and chemical students are actively needed',
    'No prior competitive-programming or development experience required',
    'No membership fee, ever',
  ],
};

/** Mirrors the published FAQ answer on committee roles. Sourced from team.js. */
export const joinPerks = {
  title: 'What members get',
  points: [
    'Hands-on workshops and code-along bootcamps every month',
    'Team formation and preparation support for national hackathons',
    'One-on-one architecture review with industry engineers',
    'A verified GitHub portfolio and open-source contribution history',
    'Access to chapter bounties, swag, and partner tooling credits',
    'Direct referral routes for internships and fellowships',
  ],
};

export const joinSteps = {
  title: 'How to join',
  steps: [
    {
      index: '01',
      title: 'Fill the interest form',
      desc: 'Tell us your branch, year and what you want to build.',
    },
    {
      index: '02',
      title: 'Attend the orientation',
      desc: 'A short campus session where we walk through the year plan and open roles.',
    },
    {
      index: '03',
      title: 'Pick a track',
      desc: 'Join a technical track or an operations track — both matter equally.',
    },
  ],
};

export const join = {
  /** Mirrors site.joinUrl but kept here so the section owns its own copy. */
  applicationUrl: site.joinUrl,
  applicationLabel: 'Apply to join HWI',
  applicationPendingLabel: 'Applications opening soon',
  contactLabel: 'Talk to a chapter lead',
  /** Email the form should notify while the join URL is pending. */
  contactEmail: site.contact.email,
};
