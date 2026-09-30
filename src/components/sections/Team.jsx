import { Mail } from 'lucide-react';

import { coreTeam, teamIntro } from '../../data/team.js';
import { site } from '../../data/site.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

export function Team() {
  return (
    <Section id="team" tone="raised">
      <SectionHeading
        index="08"
        icon="Users"
        label={teamIntro.label}
        title={teamIntro.title}
        description={teamIntro.description}
      />

      {/* Editorial roster — one row per member, not a wall of equal cards */}
      <ul>
        {coreTeam.map((member, index) => {
          // Personal addresses stay private by default; see site.showTeamEmails.
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
              delay={index * 45}
              className="group grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-3 py-6 border-t border-line last:border-b"
            >
              {/* Index */}
              <span className="mono-label text-chalk-4 sm:col-span-1 pt-2">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Portrait placeholder — initials, since there are no photos */}
              <div className="sm:col-span-1">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 border grid place-items-center font-display font-extrabold text-base transition-colors duration-300"
                  style={{
                    borderColor: `${member.color}55`,
                    background: `linear-gradient(135deg, ${member.color}33, ${member.color}11)`,
                    color: member.color,
                  }}
                >
                  {member.initials}
                </div>
              </div>

              {/* Name + role */}
              <div className="sm:col-span-5">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-chalk tracking-[-0.03em] leading-tight group-hover:text-accent-soft transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="mono-label text-accent-soft mt-1.5">{member.designation}</p>
              </div>

              {/* Branch / year / contact */}
              <div className="sm:col-span-5 flex sm:flex-col sm:items-end gap-2 sm:gap-1.5 sm:pt-1.5">
                <span className="flex items-center gap-2">
                  <span className="mono-label-sm">{member.branch}</span>
                  <span className="text-chalk-4" aria-hidden="true">
                    ·
                  </span>
                  <span className="mono-label-sm">{member.year}</span>
                </span>
                <a
                  href={mailto}
                  className="mono-label-sm inline-flex items-center gap-1.5 hover:text-accent-soft transition-colors max-w-full min-w-0"
                  aria-label={
                    showEmail
                      ? `Email ${member.name} directly`
                      : `Contact the chapter about ${member.contactLabel} — ${member.name}`
                  }
                >
                  <Mail size={11} aria-hidden="true" className="shrink-0" />
                  <span className="truncate">
                    {showEmail ? member.email : `Contact · ${member.contactLabel}`}
                  </span>
                </a>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <p className="mono-label mt-10">{teamIntro.footerNote}</p>
    </Section>
  );
}
