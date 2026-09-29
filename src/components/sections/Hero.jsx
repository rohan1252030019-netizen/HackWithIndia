import { ArrowRight, Calendar } from 'lucide-react';

import { hero } from '../../data/faqs.js';
import { heroStats } from '../../data/stats.js';
import { navItems, site } from '../../data/site.js';
import { useCounter } from '../../hooks/useCounter.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { Button } from '../ui/Button.jsx';

/**
 * Letter-by-letter cascade for the wordmark.
 *
 * The per-glyph entrance is a CSS keyframe with a `calc()`-derived delay
 * (see `.hero-letter` in index.css). The per-letter hover response is plain
 * CSS too, which is why the keyframe uses `backwards` fill and only declares
 * a `from` state — the element keeps its own final styles afterwards.
 */
function HeroLetterCascade() {
  const shouldReduceMotion = usePrefersReducedMotion();

  const baseClass =
    'font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight font-display text-white drop-shadow-[0_0_35px_rgba(255,0,60,0.3)]';

  // Reduced-motion users get the plain wordmark with no per-glyph animation.
  if (shouldReduceMotion) {
    return (
      <div className="select-none inline-block">
        <div
          className={`flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-7 ${baseClass}`}
        >
          {hero.words.map((word) => (
            <span key={word.text}>{word.text}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="select-none inline-block">
      <div
        className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-7"
        aria-label="Hack With India"
      >
        {hero.words.map((word) => (
          <div key={word.text} className="inline-flex" aria-hidden="true">
            {word.letters.map((char, index) => (
              <span
                key={index}
                className={`hero-letter ${baseClass} inline-block cursor-default`}
                style={{ '--i': index }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ stat }) {
  const [ref, value] = useCounter(stat.rawVal);

  return (
    <div className="p-3.5 sm:p-4 rounded-xl surface-terminal text-left">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-[#ff4d6d] font-semibold tracking-wider">
          [{stat.tag}]
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]/60" />
      </div>
      <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
        <span ref={ref} className="tabular-nums">
          {value}
          {stat.suffix}
        </span>
      </div>
      <div className="text-xs text-zinc-300 mt-0.5 font-medium">{stat.label}</div>
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = usePrefersReducedMotion();

  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const roadmapItem = navItems.find((item) => item.id === 'roadmap');

  // Under reduced motion the entrance class is neutralised in CSS, so the
  // same markup can be rendered either way.
  const rise = (delay, distance = 12) =>
    shouldReduceMotion
      ? undefined
      : { '--hero-delay': `${delay}ms`, '--hero-rise': `${distance}px` };

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-builder-grid"
    >
      {/* Deep Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#ff003c]/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] bg-[#660018]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        {/*
          The wordmark below is built from spans so each glyph can animate
          individually, which means it cannot be the page's h1. This
          visually-hidden heading supplies the single top-level heading the
          document was missing — for screen readers and for search engines —
          without changing anything on screen.
        */}
        <h1 className="sr-only">
          {site.displayName} — {site.chapter}
        </h1>

        {/* Terminal Command Status Pill */}
        <div
          className="hero-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0d0d14]/80 text-zinc-200 text-xs font-mono mb-8 backdrop-blur-md"
          style={rise(0, 10)}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
          <span className="text-[#ff4d6d] font-bold">git checkout</span>
          <span className="text-zinc-300">{hero.repoBranch}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-300">{site.campus.name}</span>
        </div>

        <div className="mb-4">
          <HeroLetterCascade />
        </div>

        <div className="hero-rise mb-6" style={rise(900)}>
          <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            {hero.subtitle}
          </div>
          <div className="text-xs sm:text-sm font-mono text-zinc-300 mt-1">{hero.tagline}</div>
        </div>

        <p
          className="hero-rise text-sm sm:text-lg text-zinc-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal px-2"
          style={rise(1050, 14)}
        >
          {hero.description}
        </p>

        <div
          className="hero-rise flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 px-4"
          style={rise(1200, 14)}
        >
          <Button
            href="#join"
            onClick={(event) => {
              event.preventDefault();
              scrollToId('join');
            }}
            fullWidth
            className="sm:w-auto shadow-xl"
          >
            <span>Join HWI</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Button>

          <Button
            variant="secondary"
            fullWidth
            className="sm:w-auto font-semibold"
            onClick={() => scrollToId(roadmapItem.id)}
          >
            <Calendar size={16} className="text-[#ff4d6d]" aria-hidden="true" />
            <span>{hero.secondaryCtaLabel}</span>
          </Button>
        </div>

        <div
          className="hero-rise grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto pt-6 border-t border-white/[0.08]"
          style={rise(1350, 16)}
        >
          {heroStats.map((stat) => (
            <Stat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
