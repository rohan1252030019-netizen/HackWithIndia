import { Marquee } from '../ui/Marquee.jsx';

const WORDS = ['HACK', 'WITH', 'INDIA'];

/**
 * Full-bleed kinetic closer. Sits between the final CTA and the footer as a
 * deliberate pause — the last thing that moves before the page comes to rest.
 *
 * aria-hidden: the footer immediately below repeats the same wordmark as real
 * text, so announcing this copy twice would be noise.
 */
export function BigBrandBanner() {
  const strip = (i) => (
    <span key={i} className="inline-flex items-center shrink-0">
      {WORDS.map((word) => (
        <span
          key={word}
          className="font-display font-extrabold uppercase tracking-[-0.045em] text-[15vw] sm:text-[11vw] leading-[0.82] px-4 sm:px-7 text-chalk-3"
        >
          {word}
        </span>
      ))}
      <span className="text-accent text-[5vw] sm:text-[3.4vw] leading-none px-2 sm:px-5 select-none">
        ◆
      </span>
    </span>
  );

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-ink-950 border-t border-line py-10 sm:py-14 select-none"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-etch opacity-70 pointer-events-none"
      />
      {/* Crimson spine through the middle of the band */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 h-px bg-[repeating-linear-gradient(to_right,rgba(255,0,60,0.3)_0_6px,transparent_6px_12px)]"
      />

      <div className="relative marquee-fade">
        <Marquee speed={34}>{[0, 1, 2, 3].map(strip)}</Marquee>
      </div>
    </section>
  );
}
