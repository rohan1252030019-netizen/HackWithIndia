import { allOpenRoles, branches, domainsIntro, graphLegend, mainline, unassigned } from '../../data/domains.js';
import { BranchGraph } from '../ui/BranchGraph.jsx';
import { Chip } from '../ui/Chip.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 04 — DOMAINS
 *
 * The branch graph, plus a card per branch underneath.
 *
 * WHY BOTH: the SVG graph is the illustration — it is aria-hidden and it
 * is unreadable at 360px. The cards are the content, they carry every
 * fact, and they are what a screen reader and a phone actually get. Two
 * renderings of one array, so they cannot drift.
 *
 * No domain has a lead yet, and each branch says "unassigned" on its tip
 * rather than borrowing a name from somewhere. An unassigned lead is the
 * strongest possible recruitment signal: the branch is wide open.
 */
export function Domains() {
  const unassignedCount = branches.filter((branch) => !branch.lead).length;

  return (
    <Section id="domains" tone="base">
      <StopHeading
        number="05"
        command={domainsIntro.command}
        icon="GitBranch"
        label="Domains"
        title={domainsIntro.title}
        description={domainsIntro.description}
      />

      <p className="mono-body mb-8 text-chalk-4">{domainsIntro.branchHint}</p>

      {/* ── The graph ── */}
      <Reveal>
        <BranchGraph
          branches={branches}
          mainline={mainline}
          unassignedLabel={unassigned.label}
          className="surface overflow-x-auto p-4 sm:p-6"
        />
      </Reveal>

      {/* ── Legend ── */}
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {graphLegend.map((item) => (
          <li key={item.kind} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={
                item.kind === 'branch'
                  ? 'h-px w-5 bg-accent'
                  : item.kind === 'unassigned'
                    ? 'h-2 w-2 rounded-full border border-accent'
                    : 'h-px w-5 bg-white/25'
              }
            />
            <span className="font-mono text-[10px] text-chalk-3">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* ── The branches as cards ── */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {branches.map((branch, index) => (
          <Reveal key={branch.id} delay={index * 45} className="surface surface-lift p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="font-mono text-[11px] text-accent-soft">{branch.branch}</span>
              {branch.lead ? (
                <Chip tone="accent">{branch.lead}</Chip>
              ) : (
                <Chip tone="warn">{unassigned.label}</Chip>
              )}
            </div>

            <h3 className="mt-2.5 font-display text-base font-bold tracking-tight text-chalk">
              {branch.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-chalk-3">{branch.desc}</p>

            <div className="mt-4 border-t border-line pt-4">
              {branch.lead ? (
                <p className="font-mono text-[11px] text-chalk-3">
                  lead: {branch.lead}
                  {branch.leadRole ? ` · ${branch.leadRole}` : ''}
                </p>
              ) : (
                <p className="font-mono text-[11px] text-warn">{unassigned.hint}</p>
              )}
            </div>

            {/* Open roles. Always present — this is what the Apply stop
                actually collects, so it belongs where people read it. */}
            {branch.openRoles?.length ? (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {branch.openRoles.map((role) => (
                  <li key={role}>
                    <Chip tone="neutral">{role}</Chip>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Tool chips only render if there are real tools. An empty
                chip row would be decoration pretending to be content. */}
            {branch.tools?.length ? (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {branch.tools.map((tool) => (
                  <li key={tool}>
                    <Chip>{tool}</Chip>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        ))}
      </div>

      {/* ── Every open role, gathered ── */}
      <div className="mt-10 rounded-card border border-line p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold text-chalk">All open roles</h3>
          <Chip tone="accent">
            {unassignedCount} branch{unassignedCount === 1 ? '' : 'es'} unassigned
          </Chip>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {allOpenRoles.map((role) => (
            <li key={role}>
              <Chip tone="neutral">{role}</Chip>
            </li>
          ))}
        </ul>
        <a href="#apply" className="btn btn-primary btn-sm mt-5">
          Open a pull request to apply
        </a>
      </div>
    </Section>
  );
}

export default Domains;