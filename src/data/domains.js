/**
 * STOP 05 — DOMAINS
 *
 * Rendered as a git branch graph: `main` on the left, a branch per domain.
 *
 * ── WHY THE BRANCHES EXIST BUT ARE EMPTY ─────────────────────────
 * `branches` below lists the domains we intend to run. Each one has a
 * `lead: null`, because we have not appointed domain leads yet. We are
 * NOT going to invent names, tool lists or commit counts to fill the
 * cards — a fake lead on a public site is worse than an empty branch.
 *
 * ── WHAT TO PUT IN HERE ──────────────────────────────────────────
 *   branches[].lead        → a real person. Until then the branch tip
 *                            reads "unassigned" and is visibly open.
 *   branches[].tools       → real tools only. Delete the key entirely if
 *                            you have nothing yet; the chip row hides.
 *   branches[].openRoles   → roles a member can apply for on that branch.
 *   mainline.commits       → real milestones only.
 * ─────────────────────────────────────────────────────────────────
 */

export const domainsIntro = {
  label: 'Stop 05',
  title: 'Domains',
  description:
    'The domains we intend to run, as branches off main. No leads are assigned yet — which means every one of them is open for you.',

  command: 'git branch -a',
  branchHint: 'main + 5 branches · 0 leads assigned',
};

/**
 * The intended domains. Order is the visual order top → bottom in the
 * graph, so put the ones you care most about first.
 */
export const branches = [
  {
    id: 'hackathons',
    name: 'Hackathons',
    branch: 'domain/hackathons',
    desc: 'Running the 24-hour national hackathon, and future events.',
    /** null until a real person is appointed. */
    lead: null,
    leadRole: null,
    tools: [],
    openRoles: ['Event Operations'],
    /** Branch length in the graph: long reaches the label, short does not. */
    lane: 'long',
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    branch: 'domain/ai-ml',
    desc: 'Workshops and sprints on applied machine learning.',
    lead: null,
    leadRole: null,
    tools: [],
    openRoles: ['Domain Mentor'],
    lane: 'short',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    branch: 'domain/cybersecurity',
    desc: 'CTF practice and secure-code clinics.',
    lead: null,
    leadRole: null,
    tools: [],
    openRoles: ['Domain Mentor'],
    lane: 'long',
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    branch: 'domain/web-dev',
    desc: 'Full-stack builds and deployment.',
    lead: null,
    leadRole: null,
    tools: [],
    openRoles: ['Domain Mentor'],
    lane: 'short',
  },
  {
    id: 'design',
    name: 'Design & Outreach',
    branch: 'domain/design',
    desc: 'Brand, UI, social media, sponsorships and campus comms.',
    lead: null,
    leadRole: null,
    tools: [],
    openRoles: ['Design Lead', 'Outreach Coordinator'],
    lane: 'long',
  },
];

/**
 * The mainline. Protected, and never edited directly.
 * `commits` is EMPTY — we have no merges yet.
 */
export const mainline = {
  branch: 'main',
  head: '0000000',
  protected: true,
  note: 'Protected. Merges only via review.',
  /** ── TO FILL: { label, hash } per real milestone ── */
  commits: [],
};

export const mainlineEmpty = {
  title: 'main · 0 commits',
  body: 'The initial commit landed when this site did. Everything else is still a branch.',
};

/** Legend under the graph. */
export const graphLegend = [
  { kind: 'line', label: 'main — protected' },
  { kind: 'branch', label: 'domain branch — no lead yet, open to apply' },
  { kind: 'unassigned', label: 'lead not appointed' },
];

/** Roles offered across all branches, for the Apply form's chips. */
export const allOpenRoles = [
  'Event Operations',
  'Domain Mentor',
  'Design Lead',
  'Outreach Coordinator',
];

/** Copy shown on every unassigned branch tip. */
export const unassigned = {
  label: 'unassigned',
  hint: 'No lead yet — this branch is wide open.',
};