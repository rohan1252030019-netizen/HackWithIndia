/**
 * STOP 09 — QUERY
 *
 * A "New Issue" form, plus closed issues.
 *
 * ── THE CLOSED LIST IS EMPTY ─────────────────────────────────────
 * We have never answered a question on this site, so there are no
 * closed issues. The section renders "No closed issues yet. Be the first
 * to ask." That is the honest state.
 *
 * ── WHEN YOU ANSWER A QUESTION ───────────────────────────────────
 * Move it into `closedIssues` with the real answer:
 *
 *   {
 *     id: 1,
 *     number: '#1',
 *     title: 'the question, verbatim',
 *     body: 'the answer you actually gave',
 *     label: 'question' | 'sponsorship' | 'other',
 *     closedLabel: 'closed as answered',
 *     comments: [{ author: 'your-name', text: 'the answer' }],
 *   }
 * ─────────────────────────────────────────────────────────────────
 */

export const queryIntro = {
  label: 'Stop 09',
  title: 'Ask a Question',
  description:
    'Nobody here has all the answers yet — the club is two events old. Ask anyway. Whoever knows will reply, and the answer gets published here so the next person does not have to ask again.',

  command: 'gh issue create',
  repo: 'hackwithindia/vit-pune-chapter',
  openCount: null,
};

/** The three real labels. */
export const issueLabels = [
  {
    id: 'question',
    label: 'question',
    tone: 'good',
    hint: 'Eligibility, dates, teams, rules, anything.',
  },
  {
    id: 'sponsorship',
    label: 'sponsorship',
    tone: 'crimson',
    hint: 'Partner or sponsor enquiry.',
  },
  {
    id: 'other',
    label: 'other',
    tone: 'neutral',
    hint: 'Anything that fits nowhere else.',
  },
];

/** Chips that pre-fill the description. */
export const prefill = [
  'Am I eligible? I am in first year and have never done a hackathon.',
  'Can my team be all first-years with no senior?',
  'When will the hackathon be?',
  'What is the prize pool?',
  'Do you provide laptops, or do we bring our own?',
  'Can teams from other colleges participate?',
  'Is there a registration fee?',
  'I think something on this site is out of date.',
];

/** Field config. */
export const formFields = {
  title: { label: 'Title', placeholder: 'Short summary — one line', required: true },
  body: {
    label: 'Description',
    placeholder: 'What do you need to know? More detail gets a faster answer.',
    required: true,
    rows: 5,
  },
  email: { label: 'Email', placeholder: 'you@vit.edu', required: false },
};

/** After submit. */
export const successState = {
  heading: 'Issue filed',
  body: 'Your question is drafted and ready to send. We read every one of these.',
};

/**
 * CLOSED ISSUES — EMPTY on purpose. See the note at the top.
 * Shape documented above.
 */
export const closedIssues = [];

export const closedEmpty = {
  title: 'No closed issues yet',
  body: 'Be the first to ask. Whatever gets answered goes here, so the next person with the same question finds it instantly.',
};

/** Shown under the form to set expectations. */
export const reassurance = [
  'No question is too basic — it just has not been asked yet.',
  'If nobody replies, try the campus WhatsApp group.',
  'If something on this site is wrong, say so. We would rather fix it than leave it.',
];