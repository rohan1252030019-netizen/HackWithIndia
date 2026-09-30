import { ArrowRight, Mail } from 'lucide-react';

import { finalCta } from '../../data/faqs.js';
import { site } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';

const STATEMENT = ['BUILD', 'SOMETHING', 'WORTH', 'SHOWING.'];

export function FinalCTA() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative bg-ink-950 border-t border-line py-24 sm:py-36 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[820px] h-[340px] bg-accent/[0.08] blur-[150px] rounded-full pointer-events-none"
      />
      <div aria-hidden="true" className="absolute inset-0 grid-etch pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <p className="mono-label mb-8">{finalCta.badge}</p>

        <h2 id="final-cta-heading" className="display-hero text-chalk">
          {STATEMENT.map((line, i) => (
            <span key={line} className="block">
              {i === STATEMENT.length - 1 ? <span className="text-accent-soft">{line}</span> : line}
            </span>
          ))}
        </h2>

        <Reveal className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <p className="lg:col-span-5 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
            {finalCta.description}
          </p>

          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              href="#join"
              size="lg"
              className="group"
              onClick={(event) => {
                event.preventDefault();
                scrollToId('join');
              }}
            >
              <span>Join HWI</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>

            <Button
              href={`mailto:${site.contact.email}`}
              variant="secondary"
              size="lg"
              className="group"
            >
              <Mail size={16} className="text-accent" aria-hidden="true" />
              <span>Contact Chapter Leads</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
