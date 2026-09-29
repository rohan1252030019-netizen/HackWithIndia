import { ArrowRight, Mail } from 'lucide-react';

import { finalCta } from '../../data/faqs.js';
import { navItems, site } from '../../data/site.js';
import { Button } from '../ui/Button.jsx';

export function FinalCTA() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const joinItem = navItems.find((item) => item.id === 'join');

  return (
    <section className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-gradient-to-b from-[#07070a] via-[#11050a] to-[#050507] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-mono font-bold text-[#ff4d6d] uppercase tracking-wider mb-4 inline-block px-3 py-1 rounded bg-[#ff003c]/15 border border-[#ff003c]/30">
          {finalCta.badge}
        </span>

        <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight mb-5 font-display">
          {finalCta.title}
        </h2>

        <p className="text-sm sm:text-base text-zinc-200 max-w-xl mx-auto mb-8 leading-relaxed px-2">
          {finalCta.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            href="#join"
            size="lg"
            className="w-full sm:w-auto shadow-xl"
            onClick={(event) => {
              event.preventDefault();
              scrollToId(joinItem.id);
            }}
          >
            <span>Join HWI</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Button>

          <Button
            href={`mailto:${site.contact.email}`}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto font-semibold"
          >
            <Mail size={16} className="text-[#ff4d6d]" aria-hidden="true" />
            <span>Contact Chapter Leads</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
