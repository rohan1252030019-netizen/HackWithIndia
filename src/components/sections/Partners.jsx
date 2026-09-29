import { partnersIntro, partnersRow1, partnersRow2 } from '../../data/partners.js';
import { site } from '../../data/site.js';
import { Marquee } from '../ui/Marquee.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

/** One partner card. Rendered in a grid, not as a list item, to match the ticker layout. */
function PartnerCard({ partner }) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${partner.name} — ${partner.offer}`}
      className="partner-card mx-2.5 px-6 py-4 rounded-xl surface-terminal text-center whitespace-nowrap group cursor-pointer focus-visible:outline-none min-w-[210px] sm:min-w-[240px] flex flex-col items-center justify-center"
    >
      <div className="flex items-center gap-2 justify-center mb-1">
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#ff4d6d] border border-white/10">
          {partner.category}
        </span>
      </div>
      <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#ff003c] transition-colors font-display">
        {partner.name}
      </div>
      <div className="text-[11px] text-zinc-300 font-mono mt-1 transition-all duration-300 sm:opacity-80 group-hover:opacity-100 group-hover:text-white max-w-[220px] text-center whitespace-normal">
        {partner.offer}
      </div>
    </div>
  );
}

function TickerRow({ partners, direction, speed }) {
  return (
    <div className="relative w-full overflow-hidden py-3 select-none">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050507] to-transparent pointer-events-none z-10"
      />

      <Marquee direction={direction} speed={speed}>
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </Marquee>
    </div>
  );
}

export function Partners() {
  return (
    <Section id="partners" tone="base" width="max-w-6xl" className="overflow-hidden">
      <SectionHeading
        icon="Globe"
        label={partnersIntro.label}
        title={partnersIntro.title}
        description={partnersIntro.description}
        align="center"
        className="mb-14"
      />

      <TickerRow partners={partnersRow1} direction="left" speed={32} />
      <TickerRow partners={partnersRow2} direction="right" speed={38} />

      {/* Official References Bar */}
      <div className="mt-14 text-center text-xs text-zinc-400 font-mono flex flex-wrap items-center justify-center gap-4">
        <span>Official Platform References:</span>
        {site.officialLinks.map((link, index) => (
          <span key={link.url} className="flex items-center gap-4">
            {index > 0 && <span aria-hidden="true">·</span>}
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-white underline decoration-zinc-500 transition-colors focus-visible:outline-none"
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </Section>
  );
}
