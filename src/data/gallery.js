/**
 * Gallery.
 *
 * Deliberately EMPTY. No stock photography is used — fake event photos would
 * misrepresent the chapter.
 *
 * To add real HWI photography:
 *   1. Drop the files in `public/gallery/` (prefer .webp, ~1600px wide, <200 KB).
 *   2. Add an entry below.
 *   3. Set `enabled: true`.
 *
 * Until then the Gallery section renders a designed empty state that explains
 * what belongs there and invites submissions, rather than showing nothing.
 */

export const galleryIntro = {
  label: 'Chapter Archive',
  title: 'From Our Sessions',
  description: 'Workshops, sprints, demo days and hackathon floors from the chapter.',
};

export const gallery = {
  enabled: false,
  items: [
    // Example of the expected shape — do not uncomment without a real file:
    // {
    //   src: '/gallery/xxx.webp',
    //   alt: 'TODO_DESCRIBE_IMAGE',
    //   event: 'TODO_EVENT_NAME',
    //   year: 'TODO_YEAR',
    //   caption: 'TODO_CAPTION',
    // },
  ],
  emptyState: {
    title: 'The archive is being compiled',
    body: 'We are curating verified photographs from our workshops, sprints and demo days. Nothing goes up here that did not actually happen at VIT Pune.',
    actionLabel: 'Send us your photos',
  },
};
