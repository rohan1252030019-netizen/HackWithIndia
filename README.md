# HackWithIndia — VIT Pune Student Chapter

Official website for the HWI VIT Pune chapter: a faculty-supported, student-led
technical community running hackathons, workshops, open-source sprints and
industry mentorship across the academic year.

Single-page Vite + React 19 + Tailwind CSS v4 site. No backend, no router, no
TypeScript.

---

## Commands

| Command                | What it does                       |
| ---------------------- | ---------------------------------- |
| `npm install`          | Install dependencies               |
| `npm run dev`          | Dev server with HMR                |
| `npm run build`        | Production build into `dist/`      |
| `npm run preview`      | Serve the production build locally |
| `npm run lint`         | oxlint                             |
| `npm run format`       | Prettier, write                    |
| `npm run format:check` | Prettier, verify only              |

---

## Architecture

```
src/
├─ data/          ← ALL site content lives here. Edit these, not components.
│   site.js         identity, contact, nav order, socials, academic year
│   stats.js        hero metrics + impact figures
│   objectives.js   objectives, overview copy, benefits
│   ecosystem.js    ecosystem mosaic + project tracks
│   roadmap.js      academic-year timeline
│   partners.js     partner network
│   team.js         core team + open roles
│   events.js       chapter events
│   gallery.js      gallery images (empty until real photos exist)
│   join.js         membership copy
│   faqs.js         FAQ + hero + final-CTA copy
│
├─ components/
│   layout/        Navbar, Footer, Section, SectionHeading
│   ui/            Button, Card, Badge, Accordion, Marquee, Reveal
│   sections/      one file per section, composed in App.jsx
│
├─ hooks/          useCounter, useReveal, useScrollSpy,
│                  useLockBodyScroll, usePrefersReducedMotion
│
└─ lib/            cn (classname joiner), iconRegistry, icons
```

**The one rule that matters:** changing content means editing a file in
`src/data/`, not a component. Every section reads from `src/data/`.

`App.jsx` is composition only — it imports sections and renders them in order.

---

## ⚠️ Values that still need your input

These are deliberate placeholders. The site renders an honest "to be
announced" state for each one rather than inventing a value. Find them all with:

```bash
grep -rn "TODO_" src/ index.html public/
```

| Placeholder                     | Where                                                | What to put                                                   |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| `TODO_UPDATE_PRODUCTION_DOMAIN` | `site.js`, `index.html`, `robots.txt`, `sitemap.xml` | Live origin, no trailing slash                                |
| `TODO_ADD_JOIN_FORM_URL`        | `site.js`, `join.js`, `events.js`                    | Official HWI join / registration form URL                     |
| `TODO_UPDATE_CHAPTER_EMAIL`     | `site.js`                                            | The chapter's own inbox, if different from the national one   |
| `TODO_UPDATE_THIS`              | `site.js`                                            | Real social handles (GitHub, LinkedIn, Instagram, Discord, X) |
| `TODO_TIME`                     | `events.js`                                          | Start times, once the committee confirms them                 |

Also awaiting real content:

- **`gallery.js`** is empty and renders a designed "archive is being compiled"
  state. Add real photos to `public/gallery/` and set `enabled: true`. Do not
  use stock photography.
- **`events.js`** entries are derived from the chapter's own roadmap, not from
  announcements. Each has `needsConfirmation: true` — flip it to `false` once
  the dates are real.
- **`site.showTeamEmails`** is `false`, so individual member email addresses are
  not rendered (several embed a VIT roll number). Flip to `true` if the
  committee wants them public.

---

## Notable decisions

- **No animation library.** All animation is CSS: the hero wordmark cascade,
  scroll reveals, the mobile drawer and the FAQ accordion. This removed
  `framer-motion` (~40 kB gzipped) without changing how anything looks or feels.
  The accordion and drawer use `grid-template-rows` plus `visibility: hidden`,
  so collapsed content is properly removed from the tab order and the
  accessibility tree.
- **Reduced motion is respected at two layers** — a JS hook
  (`usePrefersReducedMotion`) and the `prefers-reduced-motion` block in
  `index.css`, so nothing animates and nothing stays invisible.
- **Sections are imported eagerly.** This is an anchor-linked one-pager, so
  every section must exist before it can be jumped to. Splitting them into lazy
  chunks would add requests and layout shift for almost no saving.
- **One source of truth for the academic year** (`site.academicYear`).
- **`archive/`** holds the retired Three.js component. See `archive/README.md`.

---

## Accessibility

- Semantic landmarks, one `h1` (visually hidden in the hero), ordered headings
- Skip-to-content link, visible focus rings on every interactive element
- Real `<button>` / `<a>` elements; accordions wired with `aria-expanded`,
  `aria-controls`, `aria-labelledby`
- Active nav state exposed via `aria-current` (including the Join CTA)
- Mobile drawer: body scroll locks, and it closes on `Escape`, on a tap outside,
  and when the viewport grows past `lg`
- Collapsed accordion and drawer content use `visibility: hidden`, so it leaves
  both the tab order and the accessibility tree
- Motion is opt-out via `prefers-reduced-motion`

### Text contrast floor

All body-sized text is at least `zinc-400` (`#a1a1aa`, 7.6:1 on the card
surface). Measured in-browser against the real surfaces:

| Colour     | On `#0d0d12` | On `#07070a` | Verdict      |
| ---------- | -----------: | -----------: | ------------ |
| `zinc-300` |         13.1 |         13.6 | AA + AAA     |
| `zinc-400` |          7.6 |          7.9 | AA           |
| `zinc-500` |          4.0 |          4.2 | **FAILS AA** |

Do not use `zinc-500` or lighter for text at 14px or below — WCAG AA requires
4.5:1. Decorative separators and hairline borders are exempt.

---

## Before deploying

1. Replace every `TODO_` value (see the table above).
2. Add `public/og-image.jpg` at 1200×630, or update the `og:image` paths.
3. `npm run build` and deploy `dist/`.
