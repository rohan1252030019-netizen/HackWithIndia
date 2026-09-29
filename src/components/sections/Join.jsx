import { Check, Mail } from 'lucide-react';

import { join, joinIntro, joinPerks, joinSteps, joinWho } from '../../data/join.js';
import { isPending, site } from '../../data/site.js';
import { Icon } from '../../lib/icons.jsx';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const interestSubject = encodeURIComponent('HWI VIT Pune — membership interest');

export function Join() {
  // Until the official application form exists, the primary action is a
  // pre-filled email to the chapter inbox — something a student can actually
  // do today — rather than a link to an unrelated site or a dead button.
  const applicationPending = isPending(join.applicationUrl);

  return (
    <Section id="join" tone="raised">
      <SectionHeading
        icon="Sparkles"
        label={joinIntro.label}
        title={joinIntro.title}
        description={joinIntro.description}
        align="center"
        className="mb-12"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Who can join */}
        <Reveal as="article" className="p-6 rounded-2xl surface-terminal border-white/[0.07]">
          <h3 className="font-bold text-white text-base mb-4 font-display flex items-center gap-2">
            <Icon name="Users" size={18} className="text-[#ff003c]" aria-hidden="true" />
            {joinWho.title}
          </h3>
          <ul className="space-y-3">
            {joinWho.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                <Check
                  size={14}
                  className="text-[#ff003c] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* What members get */}
        <Reveal
          as="article"
          delay={60}
          className="p-6 rounded-2xl surface-terminal border-[#ff003c]/30"
        >
          <h3 className="font-bold text-white text-base mb-4 font-display flex items-center gap-2">
            <Icon name="Trophy" size={18} className="text-[#ff003c]" aria-hidden="true" />
            {joinPerks.title}
          </h3>
          <ul className="space-y-3">
            {joinPerks.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                <Check
                  size={14}
                  className="text-[#ff003c] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* How to join */}
        <Reveal
          as="article"
          delay={120}
          className="p-6 rounded-2xl surface-terminal border-white/[0.07]"
        >
          <h3 className="font-bold text-white text-base mb-4 font-display flex items-center gap-2">
            <Icon name="TerminalSquare" size={18} className="text-[#ff003c]" aria-hidden="true" />
            {joinSteps.title}
          </h3>
          <ol className="space-y-4">
            {joinSteps.steps.map((step) => (
              <li key={step.index} className="flex items-start gap-3">
                <span className="font-mono text-[10px] font-bold text-[#ff4d6d] border border-[#ff003c]/40 bg-[#ff003c]/10 rounded px-1.5 py-0.5 mt-0.5 shrink-0">
                  {step.index}
                </span>
                <span>
                  <span className="block text-xs sm:text-sm font-semibold text-white">
                    {step.title}
                  </span>
                  <span className="block text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    {step.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Action row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-12">
        {applicationPending ? (
          <Button
            href={`mailto:${join.contactEmail}?subject=${interestSubject}`}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Mail size={16} aria-hidden="true" />
            <span>{join.applicationPendingLabel}</span>
          </Button>
        ) : (
          <Button href={join.applicationUrl} size="lg" className="w-full sm:w-auto">
            <span>{join.applicationLabel}</span>
            <Icon name="ArrowRight" size={16} aria-hidden="true" />
          </Button>
        )}

        <Button
          href={`mailto:${site.contact.email}?subject=${interestSubject}`}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto font-semibold"
        >
          <Mail size={16} className="text-[#ff4d6d]" aria-hidden="true" />
          <span>{join.contactLabel}</span>
        </Button>
      </div>

      {applicationPending && (
        <p className="text-center text-xs text-zinc-400 font-mono mt-5 max-w-md mx-auto">
          Our application form is being set up. Email us in the meantime and we will add you to the
          next orientation.
        </p>
      )}
    </Section>
  );
}
