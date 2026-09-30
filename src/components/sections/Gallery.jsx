import { Camera } from 'lucide-react';

import { gallery, galleryIntro } from '../../data/gallery.js';
import { site } from '../../data/site.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const mailtoSubject = encodeURIComponent('HWI VIT Pune — gallery photo submission');

/**
 * Editorial masonry spans. Each entry picks the cell it occupies so the grid
 * never reads as a uniform tile wall. Cycles through the list, so adding a
 * photo needs no layout change.
 */
const SPANS = [
  'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'sm:col-span-2 aspect-[16/9]',
  'aspect-[4/3]',
  'aspect-[4/3]',
];

export function Gallery() {
  const hasPhotos = gallery.enabled && gallery.items.length > 0;

  return (
    <Section id="gallery" tone="alt">
      <SectionHeading
        index="09"
        icon="Image"
        label={galleryIntro.label}
        title={galleryIntro.title}
        description={galleryIntro.description}
      />

      {hasPhotos ? (
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-min">
          {gallery.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.src}
              delay={index * 50}
              className={`img-reveal group border border-line ${SPANS[index % SPANS.length]}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mono-label text-accent-soft block">{item.event}</span>
                {item.year && <span className="mono-label-sm">{item.year}</span>}
                {item.caption && (
                  <span className="block text-[11px] text-zinc-300 mt-1 leading-snug">
                    {item.caption}
                  </span>
                )}
              </figcaption>
            </Reveal>
          ))}
        </ul>
      ) : (
        /* Honest empty state. No stock photography, no fake event shots — the
           section architecture is ready, the archive simply is not compiled yet. */
        <div className="max-w-3xl mx-auto border border-dashed border-line-strong p-8 sm:p-14 text-center relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[repeating-linear-gradient(to_right,rgba(255,0,60,0.35)_0_6px,transparent_6px_12px)]"
          />

          <div className="w-12 h-12 border border-line bg-ink-850 grid place-items-center mx-auto mb-6">
            <Camera size={20} className="text-accent" aria-hidden="true" />
          </div>

          <h3 className="display-3 text-chalk mb-3">{gallery.emptyState.title}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-lg mx-auto">
            {gallery.emptyState.body}
          </p>

          <a
            href={`mailto:${site.contact.email}?subject=${mailtoSubject}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-line text-chalk font-mono text-xs font-semibold hover:border-accent/50 hover:bg-accent/[0.06] transition-colors"
          >
            {gallery.emptyState.actionLabel}
          </a>

          <p className="mono-label mt-8">Event photos appear here after our sessions</p>
        </div>
      )}
    </Section>
  );
}
