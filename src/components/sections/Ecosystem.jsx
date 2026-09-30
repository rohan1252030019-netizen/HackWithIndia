import { useState } from 'react';

import { ecosystemIntro, ecosystemMosaic, projectTracks } from '../../data/ecosystem.js';
import { cn } from '../../lib/cn.js';
import { Icon } from '../../lib/icons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

/**
 * Domain map.
 *
 * Built as a 3x3 CSS grid with the HWI hub in the centre cell rather than as
 * absolutely-positioned nodes on a circle. A circle cannot hold six labelled
 * boxes without either a huge container or overlap; the grid is collision-free
 * at every width, needs no trigonometry, and still reads as a map because a
 * dashed crimson axis runs through the hub to every cell.
 *
 * Row 3 spans the full width so the block stays visually balanced at 7 items.
 */
function TrackCell({ track, index, active, onActivate, className }) {
  const isActive = active === index;
  return (
    <button
      type="button"
      onClick={() => onActivate(isActive ? null : index)}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      aria-expanded={isActive}
      className={cn('map-node w-full text-left', isActive && 'map-node-active', className)}
    >
      <span className="mono-label text-chalk-4 block mb-1.5">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex items-start gap-2">
        <Icon
          name={track.icon}
          size={15}
          aria-hidden="true"
          className={cn('shrink-0 mt-0.5', isActive ? 'text-accent' : 'text-chalk-3')}
        />
        <span className="font-display font-bold text-sm text-white leading-tight">
          {track.title}
        </span>
      </span>
    </button>
  );
}

export function Ecosystem() {
  const [active, setActive] = useState(null);
  const t = projectTracks;

  return (
    <Section id="ecosystem" tone="alt">
      <SectionHeading
        index="02"
        icon="Layers"
        label={ecosystemIntro.label}
        title={ecosystemIntro.title}
        description={ecosystemIntro.description}
      />

      {/* ── Desktop: hub-and-spoke map ── */}
      <div className="hidden lg:block">
        <div className="relative max-w-4xl mx-auto">
          {/* Dashed axis through the hub */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 h-px bg-[repeating-linear-gradient(to_right,rgba(255,0,60,0.3)_0_6px,transparent_6px_12px)]"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-1/2 w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,0,60,0.3)_0_6px,transparent_6px_12px)]"
          />

          <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
            <TrackCell track={t[0]} index={0} active={active} onActivate={setActive} />
            <TrackCell track={t[1]} index={1} active={active} onActivate={setActive} />
            <TrackCell track={t[2]} index={2} active={active} onActivate={setActive} />

            <TrackCell track={t[3]} index={3} active={active} onActivate={setActive} />

            <div className="grid place-items-center py-2">
              <div className="map-hub text-accent-soft text-2xl">
                <span className="relative z-10">HWI</span>
              </div>
            </div>

            <TrackCell track={t[4]} index={4} active={active} onActivate={setActive} />

            <div className="col-span-3">
              <TrackCell track={t[5]} index={5} active={active} onActivate={setActive} />
            </div>
          </div>
        </div>

        {/* Detail panel — fixed height so the axis above never shifts */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="surface-flat p-5 sm:p-6 border-l-2 border-l-accent min-h-[88px] flex items-center">
            {active === null ? (
              <p className="mono-label text-chalk-4">
                Hover or focus a domain to read what the chapter does in it
              </p>
            ) : (
              <>
                <p className="mono-label text-accent-soft mb-2">
                  {String(active + 1).padStart(2, '0')} // {t[active].title}
                </p>
                <p className="text-sm text-zinc-200 leading-relaxed max-w-2xl">{t[active].desc}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile: clean stacked disclosure list, same data ── */}
      <ul className="lg:hidden space-y-2.5">
        {t.map((track, i) => (
          <Reveal as="li" key={track.title} delay={i * 50}>
            <details className="group surface-flat">
              <summary className="flex items-center gap-3 p-4 cursor-pointer list-none focus-visible:outline-none">
                <span className="mono-label text-accent-soft shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon
                  name={track.icon}
                  size={16}
                  className="text-chalk-3 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-display font-bold text-sm text-white flex-1">
                  {track.title}
                </span>
                <span
                  className="text-accent text-xs transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="px-4 pb-4 pl-[3.1rem] text-xs text-zinc-300 leading-relaxed">
                {track.desc}
              </p>
            </details>
          </Reveal>
        ))}
      </ul>

      {/* ── Programme mosaic ── */}
      <div className="mt-16 sm:mt-24">
        <p className="mono-label mb-8">Running programmes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {ecosystemMosaic.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 60}
              className="group relative bg-ink-900 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] hover:bg-ink-850 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="mono-label text-accent-soft">{item.tag}</span>
                  <span className="mono-label-sm text-chalk-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="display-3 text-chalk mb-3 group-hover:text-accent-soft transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-200 leading-relaxed">{item.desc}</p>
              </div>

              <p className="mono-label-sm mt-6 pt-4 border-t border-line text-chalk-3 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                {item.meta}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
