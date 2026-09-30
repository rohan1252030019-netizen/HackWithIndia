import { ArrowUp, Mail } from 'lucide-react';

import { footerNavItems, site } from '../../data/site.js';

const WORDS = ['HACK', 'WITH', 'INDIA'];

export function Footer() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-ink-950 border-t border-line px-4 sm:px-6 pt-16 sm:pt-24 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Oversized wordmark ── */}
        <p className="display-hero text-chalk select-none" aria-hidden="true">
          {WORDS.map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </p>

        <div className="rule mt-10 mb-8" />

        {/* ── Meta row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/hwi-vit-logo-192.png"
                alt="HackWithIndia VIT Pune chapter logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-contain"
              />
            </picture>
            <div>
              <p className="font-display font-extrabold text-sm text-chalk">HACK WITH INDIA</p>
              <p className="mono-label mt-0.5">VIT Pune · {site.academicYear}</p>
            </div>
          </div>

          <a
            href={`mailto:${site.contact.email}`}
            className="link-slide font-mono text-xs text-zinc-300 hover:text-white inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <Mail size={13} aria-hidden="true" className="text-accent" />
            {site.contact.email}
          </a>
        </div>

        {/* ── Nav + back to top ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(item.id);
                    }}
                    className="link-slide font-mono text-xs text-zinc-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-zinc-300 hover:text-white border border-line px-4 py-2.5 hover:border-accent/50 transition-colors"
          >
            Back to top
            <ArrowUp size={13} aria-hidden="true" className="text-accent" />
          </button>
        </div>

        <div className="rule mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="mono-label">
            © {site.academicYearSlug.slice(0, 4)} {site.displayName} — {site.chapter}
          </p>
          <p className="mono-label">Built by students · {site.campus.shortName}</p>
        </div>
      </div>
    </footer>
  );
}
