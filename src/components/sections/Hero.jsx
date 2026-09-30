import { ArrowRight } from 'lucide-react';

import { hero } from '../../data/faqs.js';
import { heroStats } from '../../data/stats.js';
import { site } from '../../data/site.js';
import { useCounter } from '../../hooks/useCounter.js';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';
import { Button } from '../ui/Button.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { Terminal } from '../ui/Terminal.jsx';

/**
 * Letter-by-letter cascade for the wordmark.
 *
 * A CSS keyframe with a `calc()`-derived per-glyph delay (see `.hero-letter`
 * in index.css). The keyframe declares only a `from` state and uses
 * `backwards` fill, so once it finishes each glyph returns to its own styles
 * and the `:hover` rule is free to take over.
 */
function HeroWordmark() {
  const shouldReduceMotion = usePrefersReducedMotion();

  const size = 'clamp(2.5rem, 9.2vw, 7.5rem)';

  return (
    <div className="select-none">
      <h1 className="sr-only">
        {site.displayName} — {site.chapter}
      </h1>

      {shouldReduceMotion ? (
        /* Static wordmark, same size, no per-glyph animation. The wordmark
           must stay visible — only the motion is opted out. */
        <div
          className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6"
          style={{ fontSize: size, lineHeight: 0.86 }}
          aria-hidden="true"
        >
          {hero.words.map((word) => (
            <span
              key={word.text}
              className="font-display font-extrabold tracking-[-0.045em] text-white"
            >
              {word.text}
            </span>
          ))}
        </div>
      ) : (
        /* Glyphs are decorative; the h1 above carries the accessible name. */
        <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6" aria-hidden="true">
          {hero.words.map((word) => (
            <div key={word.text} className="inline-flex">
              {word.letters.map((char, index) => (
                <span
                  key={index}
                  className="hero-letter font-display font-extrabold tracking-[-0.045em] text-white drop-shadow-[0_0_45px_rgba(255,0,60,0.25)] inline-block cursor-default"
                  style={{ '--i': index, fontSize: size, lineHeight: 0.86 }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ stat }) {
  const [ref, value] = useCounter(stat.rawVal);

  return (
    <div className="group relative py-4 pr-4">
      <span className="absolute left-0 top-0 h-px w-full bg-line group-hover:bg-accent/60 transition-colors duration-300" />
      <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <span className="mono-label text-accent-soft">{stat.tag}</span>
        <span className="w-1 h-1 rounded-full bg-accent/70 shrink-0" aria-hidden="true" />
      </div>
      <div className="font-display font-extrabold text-white tracking-tight text-2xl sm:text-3xl">
        <span ref={ref} className="tabular-nums">
          {value}
          {stat.suffix}
        </span>
      </div>
      <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
    </div>
  );
}

export function Hero() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const rise = (delay, distance = 14) =>
    shouldReduceMotion
      ? undefined
      : { '--hero-delay': `${delay}ms`, '--hero-rise': `${distance}px` };

  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="top"
      className="relative bg-ink-950 grid-etch overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6"
    >
      {/* Ambient crimson wash — one soft light source, kept low */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-accent/[0.09] blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Metadata strip ── */}
        <div
          className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 sm:mb-14"
          style={rise(0, 8)}
        >
          {hero.meta.map((item) => (
            <span key={item.key} className="mono-label flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-chalk-4">{item.key}</span>
              <span className="text-chalk-2">{item.value}</span>
            </span>
          ))}
        </div>

        {/* ── Wordmark: full-bleed so it never wraps on desktop ── */}
        <div className="hero-rise" style={rise(60)}>
          <HeroWordmark />
        </div>

        {/* ── Editorial split: statement + terminal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-start mt-10 sm:mt-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="hero-rise flex items-center gap-3" style={rise(380)}>
              <span className="crimson-rule-sm shrink-0" aria-hidden="true" />
              <span className="mono-label-sm text-chalk-2">{hero.subtitle}</span>
            </div>

            <div className="hero-rise mt-8 sm:mt-10" style={rise(520)}>
              <p className="mono-label mb-4">{hero.statement.lead}</p>
              <p className="display-1 text-chalk">
                {hero.statement.body.map((line, i) => (
                  <span key={line} className="block">
                    {i === hero.statement.body.length - 1 ? (
                      <>
                        WE <span className="text-accent-soft">BUILD IT.</span>
                      </>
                    ) : (
                      <>
                        {line}
                        <br className="hidden sm:block" />
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <p
              className="hero-rise mt-7 text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed"
              style={rise(660)}
            >
              {hero.description}
            </p>

            <div
              className="hero-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-9"
              style={rise(790)}
            >
              <Button
                href="#join"
                size="lg"
                className="sm:w-auto group"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId('join');
                }}
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="sm:w-auto group"
                onClick={() => scrollToId(hero.secondaryCtaTarget)}
              >
                <span>{hero.secondaryCta}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-y-1"
                >
                  ↓
                </span>
              </Button>
            </div>
          </div>

          {/* Terminal — right column on desktop, stacks on mobile */}
          <div className="lg:col-span-5 xl:col-span-4 hero-rise lg:pt-2" style={rise(900)}>
            <Terminal
              title="hwi@vit:~/status"
              prompt={hero.terminal.prompt}
              command={hero.terminal.command}
              lines={hero.terminal.lines}
              status={hero.terminal.status}
              className="w-full"
            />

            <p className="mono-label mt-4 flex items-center gap-2">
              <span className="pulse-dot shrink-0" aria-hidden="true" />
              <span>Chapter systems nominal</span>
            </p>
          </div>
        </div>

        {/* ── Domain marquee ──
            The border lives on the clipping wrapper, not on the animated
            element, so the hairline stays put while the type travels. */}
        <div className="hero-rise mt-14 sm:mt-20" style={rise(1040)}>
          <div className="border-y border-line py-3.5 overflow-hidden marquee-fade">
            <Marquee speed={38}>
              {[...hero.domains, ...hero.domains].map((domain, i) => (
                <span key={`${domain.label}-${i}`} className="flex items-center shrink-0">
                  <span className="font-display font-bold text-sm sm:text-base tracking-[0.14em] text-chalk-2 uppercase whitespace-nowrap">
                    {domain.label}
                  </span>
                  <span className="text-accent px-5 sm:px-7 select-none" aria-hidden="true">
                    ◆
                  </span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {/* ── Stat strip ── */}
        <div className="hero-rise mt-12 sm:mt-16" style={rise(1160)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
            {heroStats.map((stat) => (
              <Stat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
