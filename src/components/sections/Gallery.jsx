import { Camera } from 'lucide-react';

import { gallery, galleryIntro } from '../../data/gallery.js';
import { site } from '../../data/site.js';
import { Reveal } from '../ui/Reveal.jsx';
import { Section } from '../layout/Section.jsx';
import { SectionHeading } from '../layout/SectionHeading.jsx';

const mailtoSubject = encodeURIComponent('HWI VIT Pune — gallery photo submission');

export function Gallery() {
  const items = gallery.items;
  const hasPhotos = gallery.enabled && items.length > 0;

  return (
    <Section id="gallery" tone="alt">
      <SectionHeading
        icon="Image"
        label={galleryIntro.label}
        title={galleryIntro.title}
        description={galleryIntro.description}
        align="center"
      />

      {hasPhotos ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.src}
              delay={index * 50}
              className="group relative overflow-hidden rounded-xl surface-terminal aspect-[4/3]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent text-[10px] font-mono text-zinc-200">
                <span className="text-[#ff4d6d]">{item.event}</span>
                {item.year ? ` · ${item.year}` : ''}
                {item.caption ? <span className="block text-zinc-400">{item.caption}</span> : null}
              </figcaption>
            </Reveal>
          ))}
        </ul>
      ) : (
        /* Honest empty state — no stock photography standing in for real events. */
        <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-2xl surface-terminal border-dashed border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#14141c] border border-white/10 flex items-center justify-center mx-auto mb-5">
            <Camera size={22} className="text-[#ff4d6d]" aria-hidden="true" />
          </div>

          <h3 className="text-lg font-bold text-white font-display mb-2">
            {gallery.emptyState.title}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-6 max-w-md mx-auto">
            {gallery.emptyState.body}
          </p>

          <a
            href={`mailto:${site.contact.email}?subject=${mailtoSubject}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-secondary text-xs font-bold focus-visible:outline-none"
          >
            {gallery.emptyState.actionLabel}
          </a>
        </div>
      )}
    </Section>
  );
}
