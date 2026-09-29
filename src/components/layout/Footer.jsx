import { Mail } from 'lucide-react';

import { footerNavItems, site } from '../../data/site.js';
import { cn } from '../../lib/cn.js';

export function Footer() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#050507] border-t border-white/[0.08] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-300">
        <div className="flex items-center gap-3">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/hwi-vit-logo-192.png"
              alt="HWI VIT Pune chapter logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-contain drop-shadow-[0_0_8px_rgba(255,0,60,0.5)]"
            />
          </picture>
          <div>
            <span className="font-bold text-white font-display">HACK WITH INDIA</span>
            <span className="ml-2 text-zinc-300 font-mono">· VIT Pune Student Chapter</span>
          </div>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-300 font-medium">
          {footerNavItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(item.id);
                }}
                className={cn(
                  'hover:text-white transition-colors focus-visible:outline-none',
                  'inline-flex items-center gap-1'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-zinc-300 font-mono">
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none"
          >
            <Mail size={12} aria-hidden="true" />
            {site.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
