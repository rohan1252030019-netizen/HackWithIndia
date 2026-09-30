import { partnersIntro, partnersRow1, partnersRow2 } from '../../data/partners.js';
import { site } from '../../data/site.js';
import { Marquee } from '../ui/Marquee.jsx';

const ROWS = [
  { partners: partnersRow1, direction: 'left', speed: 32 },
  { partners: partnersRow2, direction: 'right', speed: 38 },
];

function PartnerCard({ partner }) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${partner.name} — ${partner.offer}`}
      className="partner-card mx-2.5 px-6 py-4 border border-line text-center whitespace-nowrap group cursor-pointer focus-visible:outline-none min-w-[210px] sm:min-w-[230px] flex flex-col items-center justify-center"
    >
      <span className="mono-label text-chalk-4 group-hover:text-accent-soft transition-colors duration-300 mb-1.5">
        {partner.category}
      </span>
      <span className="font-display font-bold text-base sm:text-lg text-chalk-3 group-hover:text-chalk transition-colors duration-300">
        {partner.name}
      </span>
      <span className="text-[11px] text-chalk-4 font-mono mt-1.5 transition-all duration-300 group-hover:text-chalk-2 max-w-[220px] text-center whitespace-normal">
        {partner.offer}
      </span>
    </div>
  );
}

export function Partners() {
  return (
    <section
      id="partners"
      className="py-20 sm:py-28 px-4 sm:px-6 border-t border-line bg-ink-900 relative overflow-hidden"
      aria-labelledby="partners-heading"
    >
      <span aria-hidden="true" className="rule-crimson absolute top-0 left-4 sm:left-6" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <p className="mono-label mb-5">{partnersIntro.label}</p>
          <h2 id="partners-heading" className="display-2 text-chalk">
            {partnersIntro.title}
          </h2>
          <p className="text-sm text-zinc-300 mt-4 max-w-2xl leading-relaxed">
            {partnersIntro.description}
          </p>
        </div>
      </div>

      {/* Full-bleed tickers, outside the container so they run edge to edge */}
      <div className="relative -mx-4 sm:-mx-6">
        {ROWS.map((row) => (
          <div key={row.direction} className="relative overflow-hidden py-2.5 select-none">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-ink-900 to-transparent pointer-events-none z-10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-ink-900 to-transparent pointer-events-none z-10"
            />
            <Marquee direction={row.direction} speed={row.speed}>
              {[...row.partners, ...row.partners, ...row.partners].map((partner, index) => (
                <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </Marquee>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-14">
        <p className="mono-label text-chalk-4">Official platform references</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
          {site.officialLinks.map((link) => (
            <li key={link.url} className="flex items-center gap-5">
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="link-slide font-mono text-xs text-zinc-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
