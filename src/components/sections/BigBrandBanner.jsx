import { Marquee } from '../ui/Marquee.jsx';

const WORD = 'HACKWITHINDIA VIT PUNE';
const REPEATS = 6;

export function BigBrandBanner() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-[#050507] border-t border-white/[0.08] select-none pt-12 pb-14"
    >
      {/* Edge Vignette Fades */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050507] to-transparent pointer-events-none z-20" />

      {/* Main illuminated marquee row */}
      <Marquee className="whitespace-nowrap flex items-center relative z-10">
        {Array.from({ length: REPEATS }, (_, index) => (
          <span
            key={index}
            className="inline-block banner-text-metallic font-black tracking-[-0.04em] text-[13vw] leading-none px-8 uppercase font-display cursor-default"
          >
            {WORD}
          </span>
        ))}
      </Marquee>

      {/* Inverted mirror floor reflection */}
      <Marquee className="whitespace-nowrap flex items-center reflection-fade mt-1">
        {Array.from({ length: REPEATS }, (_, index) => (
          <span
            key={index}
            className="inline-block text-[#ff003c] font-black tracking-[-0.04em] text-[13vw] leading-none px-8 uppercase font-display"
          >
            {WORD}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
