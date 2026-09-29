import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import { navItems } from '../../data/site.js';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../lib/cn.js';

const SECTION_IDS = navItems.map((item) => item.id);

/**
 * "Join" is already the header CTA, and Impact/Gallery would crowd the link
 * row at the lg breakpoint. Both stay in the mobile drawer and the footer.
 */
const DESKTOP_NAV_ITEMS = navItems.filter((item) => !item.hideInDesktop && item.id !== 'join');

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeId = useScrollSpy(SECTION_IDS, { offset: 120 });
  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the drawer if the viewport grows past the lg breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const handleChange = (event) => event.matches && setMobileOpen(false);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // Escape closes the drawer.
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event) => event.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const scrollToId = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const joinItem = useMemo(() => navItems.find((item) => item.id === 'join'), []);

  const linkClasses = (isActive) =>
    cn(
      'transition-colors focus-visible:outline-none',
      isActive ? 'text-white' : 'text-zinc-200 hover:text-white'
    );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg btn-crimson text-sm font-bold"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass-header py-3' : 'bg-transparent py-4 border-b border-white/[0.06]'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand. min-w-0 + truncate so the wordmark shrinks instead of
              pushing the menu button off-screen at 320px. */}
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left group focus-visible:outline-none"
          >
            <picture className="shrink-0">
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/hwi-vit-logo-192.png"
                alt="HackWithIndia VIT Pune chapter logo"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain drop-shadow-[0_0_12px_rgba(255,0,60,0.55)] group-hover:scale-105 transition-transform duration-200"
              />
            </picture>

            <div className="min-w-0">
              <div className="font-extrabold text-[13px] sm:text-base tracking-tight text-white flex items-center gap-1.5 sm:gap-2 font-display min-w-0">
                <span className="truncate">HACK WITH INDIA</span>
                <span className="shrink-0 px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/40 whitespace-nowrap">
                  VIT PUNE
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-300 font-mono tracking-tight flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] shrink-0" />
                <span className="truncate">Student Chapter</span>
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-6">
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(item.id);
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      linkClasses(isActive),
                      'relative text-xs font-medium tracking-wide py-1'
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-[#ff003c] transition-opacity duration-200',
                        isActive ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + menu toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#join"
              onClick={(event) => {
                event.preventDefault();
                scrollToId(joinItem.id);
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-crimson text-xs font-bold tracking-wide active:scale-95 focus-visible:outline-none"
            >
              <span>Join HWI</span>
              <ArrowRight size={13} />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden p-2 text-zinc-200 hover:text-white transition-colors focus-visible:outline-none"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/*
          Always mounted. `.mobile-drawer` animates with grid-template-rows and
          `visibility`, so the close transition plays without a presence hook
          and the collapsed links stay out of the tab order.
        */}
        <div id="mobile-nav" data-open={mobileOpen} className="mobile-drawer lg:hidden">
          <div className="mobile-drawer-inner">
            <div className="border-b border-white/10 bg-[#09090d]/98 backdrop-blur-2xl px-6 py-5 shadow-2xl">
              <ul className="flex flex-col gap-2.5">
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToId(item.id);
                        }}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'block text-left text-sm font-medium py-2 border-b border-white/[0.05] focus-visible:outline-none',
                          isActive ? 'text-[#ff4d6d]' : linkClasses(isActive)
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#join"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(joinItem.id);
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg btn-crimson text-xs font-bold focus-visible:outline-none"
              >
                Join HWI
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
