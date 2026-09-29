import { Code2, GraduationCap, Mail } from 'lucide-react';

import { coreTeam, teamIntro } from '../../data/team.js';
import { site } from '../../data/site.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Team() {
  return (
    <Section id="team" tone="raised" className="overflow-hidden">
      {/* Background grid accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-builder-grid opacity-[0.03] pointer-events-none"
      />

      <div className="relative">
        <SectionHeading
          icon="Users"
          label={teamIntro.label}
          title={teamIntro.title}
          description={teamIntro.description}
          align="center"
          className="mb-16"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {coreTeam.map((member, index) => {
            // Personal addresses are withheld by default; see site.showTeamEmails.
            const showEmail = site.showTeamEmails && member.email;
            const mailto = showEmail
              ? `mailto:${member.email}`
              : `mailto:${site.contact.email}?subject=${encodeURIComponent(
                  `HWI VIT Pune — ${member.contactLabel}: ${member.name}`
                )}`;

            return (
              <Reveal
                as="li"
                key={member.name}
                delay={index * 60}
                className="group relative rounded-2xl surface-terminal border border-white/[0.07] hover:border-[#ff003c]/40 p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,0,60,0.12)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-lg shrink-0 select-none"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}33 0%, ${member.color}11 100%)`,
                      border: `1.5px solid ${member.color}55`,
                    }}
                  >
                    <span style={{ color: member.color }}>{member.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-white text-sm leading-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-[#ff003c] text-xs font-semibold font-mono mt-0.5 truncate">
                      {member.designation}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2">
                  <li className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 text-xs font-mono">
                    <Code2 size={10} className="text-zinc-400" aria-hidden="true" /> {member.branch}
                  </li>
                  <li className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 text-xs font-mono">
                    <GraduationCap size={10} className="text-zinc-400" aria-hidden="true" />{' '}
                    {member.year}
                  </li>
                </ul>

                <a
                  href={mailto}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-[#ff4d6d] text-xs font-mono transition-colors focus-visible:outline-none rounded truncate"
                  aria-label={
                    showEmail
                      ? `Email ${member.name} directly`
                      : `Contact the chapter about ${member.contactLabel} — ${member.name}`
                  }
                >
                  <Mail size={11} className="shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {showEmail ? member.email : `Contact · ${member.contactLabel}`}
                  </span>
                </a>

                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }}
                />
              </Reveal>
            );
          })}
        </ul>

        <p className="text-center text-xs text-zinc-400 font-mono mt-10">{teamIntro.footerNote}</p>
      </div>
    </Section>
  );
}
