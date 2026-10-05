# Design Notes — Hack With India, VIT Pune

Internal document. Written **before** implementation, from the four reference
sites plus the existing codebase.

---

## 0. Method, and its limits — read this first

The brief asked me to open each reference in a real browser at desktop and
360px and inspect behaviour. **I could not do that.** I have no browser
automation tool. What I actually did:

- Fetched each site's HTML over HTTP.
- Three of the four are client-rendered SPAs whose HTML is an empty
  `<div id="root">`, so I followed their compiled CSS and JS bundles and read
  the actual values: real `cubic-bezier()` curves, real `transition-duration`
  values, real `scroll` listener thresholds, real JSX structure.

**So: I observed source code, not rendered pixels.** Every claim below about
*behaviour* (what triggers on scroll, what a keyframe animates) is read
directly out of the shipped bundles and is reliable. Every claim about *visual
result* (how a navbar actually looks at 360px, whether a reveal "feels"
smooth, perceived contrast) is **inferred from source and not visually
verified**. Those are marked accordingly throughout.

Anywhere I could not determine something from source, this document says
**"not observed"**. Nothing is filled in by assumption.

---

## 1. Reference: aisf-vit.online — navbar & motion

**Stack:** React 19 + Vite SPA. No router for the main page; lazy routes for
/events, /team. three.js background. **Not** Tailwind for layout semantics —
it is Tailwind utilities, yes, but every colour is a hardcoded hex.

### Navbar

| Question | Observation |
|---|---|
| Position | **Fixed**, not sticky. `fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none`. A horizontally centred floating pill, not a full-bleed bar. Breakpoint: 768px. |
| Transparent → blurred on scroll | **Yes, and it is JS-driven, not CSS.** A single rAF-throttled passive `scroll` listener normalises `scrollY / 420` to `p ∈ [0,1]`, then runs three stacked ramps off it: `T = max(0,(p-.3)/.7)` drives the chrome, `E = max(0,(p-.5)/.5)` drives links/hamburger, `D = max(0,(p-.75)/.25)` fades the hero out and drifts it +50px. |
| Resulting values | `backgroundColor: rgba(10,14,22, ${.75*T})`, `backdropFilter: blur(18px)` once `T>.05`, `borderColor: rgba(255,255,255,${.12*T})`, `boxShadow: 0 15px 35px -10px rgba(0,0,0,.7)` once `T>.1`. Per-frame inline styles, so **not themable in CSS and not reduced-motion aware**. |
| Active-link state | **not observed on the home page.** `aria-current` appears zero times in the entire bundle. The scroll handler computes an active section into state at a 250px probe line — and then **nothing reads that state**. The desktop link map has no conditional class at all. (The lazy `/events` route *does* mark active, with a background pill `bg-white/[0.08]`.) |
| Highlighted current-event link | **not observed.** Four links, no dot/star/badge on any. |
| Mobile menu | Hamburger `w-9 h-9 rounded-full`, lucide `Menu`⇄`X`. Gated by scroll: invisible and non-interactive until `p > .75` (≈315px). Panel is `fixed top-20 inset-x-4 z-40`, `transition-all duration-300 origin-top`, `opacity-0 scale-95` → `opacity-100 scale-100`. Duration **300ms**, Tailwind default ease `cubic-bezier(.4,0,.2,1)`. |
| Esc / focus trap / outside click | **not observed — all three absent.** Zero `keydown` listeners in app code; zero document-level `click`/`pointerdown` listeners. The only listeners are 2× `scroll` and 2× `resize`. |
| Closes on link click | Yes, every dropdown link carries `onClick: () => setOpen(false)`. |
| Primary CTA | "Contact Us" → `href="#contact"`, an **internal anchor**, not a button-to-register. No `transition-duration`, so it inherits Tailwind's 150ms default. |

### Motion system

**Keyframes:** `scrollDown` (hero chevron bob), `spin`, `pulse`, `bounce`.
Lazy routes add `eventGalleryScroll` (vertical marquee) and `heroImageFloat`
(parallax float with staggered negative delays). No library-generated
keyframes in play.

**Easings — no token layer at all.** Every value is inlined per rule:

- `cubic-bezier(.16,1,.3,1)` — the signature card ease
- `cubic-bezier(.16,.84,.44,1)` — the Team page's `--ease` token
- `cubic-bezier(.76,0,.24,1)` — gallery image zoom
- `cubic-bezier(.4,0,.6,1)` — pulse
- `cubic-bezier(.8,0,1,1)` / `cubic-bezier(0,0,.2,1)` — inside `bounce`

**Durations:** `.15s` (unqualified `transition-colors`), `.2s`, `.3s`, `.5s`,
`.7s`. No duration tokens exist — only Tailwind v4's own
`--default-transition-duration: .15s` and
`--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`.

**Scroll reveal:** **not observed.** Zero `IntersectionObserver` in app code.
There is no `.reveal` class and nothing is authored in an "unrevealed" state.
Reveals are two elements driven by inline styles off the same scroll ramp
(hero fades + drifts +50px; scroll indicator fades out by `p=0.33`).

**Card hover** (`.glass-card`, the one reusable surface class):
`translateY(-3px)`, `background #030406 → #000`,
`border #ffffff14 → #38bdf873`, and a shadow bloom
`0 10px 30px -10px #2563eb2e` → `0 18px 45px -8px #2563eb59`. 300ms on the
`.16,1,.3,1` curve. Buttons add `active:scale-95`.

**`prefers-reduced-motion`:** **not observed anywhere.** Zero matches across
all CSS chunks and both JS bundles; `matchMedia` appears zero times in app
code. This is a real accessibility gap and we will not copy it.

**Libraries:** no framer-motion, no gsap, no anime.js, no swiper. three.js r185
imperatively for a constellation background; `@react-three/fiber` on the
Events route only. Motion is otherwise hand-written `requestAnimationFrame`
lerps with `1 - Math.exp(-k*t)` damping.

### What I am taking, and what I am not

**Take:** the *shape* of the idea — navbar gains a background, a blur and a
hairline as you scroll, and the links come in after the chrome, so the bar
"assembles" rather than snapping on. Their `cubic-bezier(.16,1,.3,1)` curve is
genuinely good and it is the one easing both this site and Genesis use
independently. Hover lift of 3px with a border-colour shift plus glow is the
right amount of restraint.

**Leave:** three stacked scroll ramps computed per frame in JS. It is
un-themable, it costs a re-render path, and it cannot be disabled for
reduced-motion users. I will do the same *effect* with two CSS transitions on
one class toggle, which is cheaper and respects the preference query. Their
missing reduced-motion block is a bug to avoid, not a pattern to copy.

---

## 2. Reference: code-arambh.netlify.app — footer, order, redirects

**Stack:** React 19 SPA, React Router (multi-page), **framer-motion**
(`AnimatePresence`, `useMotionValue`, `useSpring`, `layoutId`, `whileInView`),
axios, lucide + 4 hand-inlined brand SVGs, Tailwind v4.

### Component order

The Home page render tree, in order: hero → about → stats strip → tracks grid
→ team → closing CTA → "Organized & Powered By" → **sponsors** → footer.
Footer last, on every route except the dashboards and one research page.

**The sponsor block is the last content on the page, immediately before the
footer.** That is the placement I am copying.

### Footer structure — four stacked blocks

- **A — Deadline + prize banner.** A full-width gradient card above the
  columns: pulsing red dot, `Registration Deadline: 10th October 2026`, a
  sub-line, and a prize-pool chip on the right.
- **B — Four columns.** 1: logo + tagline + social row. 2: "Quick Navigation"
  with `⚡`-prefixed mono links. 3: "Spooky Tracks" — plain text, **not
  links**. 4: "Event Location" card + partner logos underneath.
- **C — Bottom bar.** Copyright left, credit link right.

### Redirects — the useful finding

**Every "quick link" is an internal SPA route (`/about`, `/timeline`,
`/rules`, `/instructions`), not a `#anchor`.** The only anchor ids in the
whole app live on `/instructions` and the footer links to none of them.

**Every registration CTA — 9 of them across 6 surfaces — points at the same
place: the internal `/register` route.** Navbar, hero, closing CTA, About,
Rules, Instructions (two different spots), and a sticky bottom bar. The
result is that the visitor can register from anywhere without ever hitting a
dead link.

The "Apply with Devfolio" button is a **third-party embed only**, never the
registration mechanism. Slug is hardcoded, target URL resolved remotely by
the SDK.

**Not observed:** any "become a sponsor" CTA. Zero matches for
`sponsorship` / `become a sponsor` across the main bundle and all 13 chunks.

### Sponsors

**A single centred card, not a grid, not a marquee.** `max-w-xl` header, then
one `max-w-md` card: top gradient hairline, blurred glow, chip, logo plate on
white, title, "Apply with Devfolio" button, and a `Connect:` row of three
small brand icons. The only looping animation is a pulsing status dot. **No
logo ticker.**

### Theme defects worth learning from

This site has **no `--shadow-*` tokens and no `@theme` block at all** — every
glow is an arbitrary value like `shadow-[0_0_15px_rgba(249,115,22,0.4)]`,
with 8 distinct orange-glow shadows that differ only in blur radius. It also
loads Outfit and Space Grotesk from Google Fonts and **references neither**
— zero matches in the CSS and JS, dead render-blocking request.

**Take:** the banner-above-columns footer, and the discipline of one
registration URL repeated at every entry point. **Leave:** the ad-hoc glow
shadows — we will define three shadow tokens and use only those.

---

## 3. Reference: genesishacks.com — event flow & theme discipline

**Stack:** Create React App. React Router with lazy chunks. **framer-motion +
GSAP + ScrollTrigger**, all three. `localStorage`-backed event CMS. This is
the most useful reference for *flow* and the most cautionary for *theme*.

### Event management flow

**There is no first-party registration form.** All six register CTAs dead-end
at `hackculture.io`. Five paths converge on it:

- hero CTA → scrolls in-page to `#upcoming` → external link
- sticky header CTA → external link (hardcoded, not data-driven)
- mega-menu → Events → Join/ → external link
- events archive → card click opens a **modal** (no route change, no history
  entry) → external link
- certificate page is the *only* real backend: `POST /api/certificate`

**Event status is strictly binary:** `"upcoming" | "past"`. **`"ongoing"` does
not exist in the codebase.** Labels are `"● Upcoming"` and `"Past ·
Archived"`; emerald for upcoming, purple for past.

**Not observed:** any "Notify me" / waitlist / "Sold out" pattern. Zero
occurrences of `Notify me`, `waitlist`, `Eligibility`. There is, however,
dead scaffolding: eight `rsvp*` test-ids defined with zero usages — evidence
of an RSVP form that was removed.

**Not observed:** any testimonials or social-proof section. Zero occurrences
of `testimonial` / `Social Proof` / `Loved by` / `Trusted by`.

**No speaker or mentor section exists at all.** Mentors appear only as prose
inside blurb strings — there is no mentor data array to populate or empty.

**Two real bugs in their event data layer, worth avoiding:**
1. `getEvents()` contains a hard override that silently replaces any event
   with id `evt-upcoming-01` **or whose title contains `"no agenda"`** with a
   hardcoded seed record on every read. CMS edits to that event do nothing.
2. The events-archive modal resolves its "Official Event Link" by walking
   `media` → `attendees` → `luma` and taking the first that parses as a URL.
   `attendees` is the *headcount* field, which in seed data holds values like
   `"700"` — and in one case a Google Sheets URL. So a headcount can become
   the primary link.

### Theme consistency — this is where it fails, and it's instructive

| Axis | Finding |
|---|---|
| **Buttons** | **~35 distinct treatments. Two reusable classes** (`.btn-cinema`, `.btn-ghost`). Everything else is a copy-pasted inline Tailwind string. `/admin-events` reinvents the primary button four separate times with three different glow radii. `.btn-cinema` uses `.32s` and `.btn-ghost` uses `.3s` — the two primary buttons disagree by 20ms on the same interaction. |
| **Cards** | **Zero reusable classes.** ~30+ inline treatments. Radius appears at 24px, 16px, 2px and **0** for the same conceptual object. **31 distinct near-black surface hexes** for what is conceptually one dark panel. Three border opacities for the same role. |
| **Radius scale** | Effectively three disjoint ladders: 4/12/16/24px, a *broken* 0/2px pair (shadcn `--radius:.125rem` override makes `rounded-lg` render 2px and `rounded-md` render 0px), and one off-scale 14px. |
| **Spacing** | **Genuinely rigorous** — stock Tailwind, everything on the 0.25rem grid. The only leakage is in the hand-written layer. |
| **Colour** | Two systems: a proper 3-step token scale (`--text` / `--text-dim` / `--text-faint`) **and** a 15-step `text-white/NN` scale used ad-hoc — 23 distinct white-alpha hexes in the compiled CSS. |
| **Tokens** | **Two `:root` blocks. 17 shadcn HSL tokens ship dead**, and the one live consumer emits `hsl(rgba(255,255,255,.14))`, which is invalid and gets dropped. `/events`, `/admin-events` and the detail page **ignore every token** and use raw hex — the entire event-management surface, i.e. the product's core feature, is off-token. |
| **Fonts** | `--font-mono` and `--font-display` are **the same family** (`Gridular`, a proportional face), so every "mono" utility renders proportional. Only weight 400 ships for both families, yet 500–900 are all used and therefore **all synthesised fake-bold**. |
| **Dead code** | `@keyframes btn-outline-breathe` and `btn-scan` are referenced but **never defined** — the signature button's entire hover animation is a silent no-op. `.team-grid-bg` referenced, never defined. 8 orphaned `rsvp*` test-ids. |

**Reduced motion: present and correct** — a global
`animation-duration:.01ms; animation-iteration-count:1; transition-duration:.01ms`
block plus a `scroll-behavior:auto` override. Gaps: the JS-injected grain
keyframes ignore it, and GSAP ScrollTrigger pin/scrub has no reduced-motion
branch.

**Easing is the one thing they got right:** `cubic-bezier(.16,1,.3,1)` appears
25× across both CSS and framer-motion and is unmistakably the house curve.
**Timing is not** — 39 framer durations plus 13 CSS durations.

### What I am taking

**Take:** the *binary* event status model (upcoming / past) — it is the
honest one for a club with zero past events, and it forces the empty state to
exist rather than be fudged. **Take** the modal-over-route pattern for event
detail on a one-pager. **Take** the reminder that spacing is the axis you can
be rigorous about cheaply.

**Leave:** everything about their surface system. 31 near-black hexes and 35
button treatments is the failure mode this project is explicitly avoiding.

---

## 4. Reference: vishwaconclave.com/vc26 — theme & hero patterns

**Stack:** Next.js 15 App Router, **server-rendered**, client islands only
(`StarBackground` canvas, `Navbar`). framer-motion for reveals. Self-hosted
Geist Sans + Geist Mono via `next/font`. Full HTML in the initial response —
this one I could read directly, not via bundles.

### Navbar

| Question | Observation |
|---|---|
| Position | `fixed top-0 left-0 right-0 z-50`, full-bleed, `h-16`. |
| Transparent → blurred on scroll | **Not observed — there is no scroll state at all.** The Navbar component has exactly one `useState` and **zero** `useEffect`, zero scroll listeners. The glass is permanent: a background image + `bg-black/60 backdrop-blur-sm` from the first paint. |
| Links | Six, all **internal multi-page routes**: `VC'26` ⭐ → `/vc26`, About, Speakers, Narratives, Merch, Contact. |
| Current-event link | Marked by a **star glyph + dashed-border pill**, and it is **hardcoded, not conditional**: `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 border border-dashed border-amber-400/50 rounded-lg">⭐VC'26</span>`. **No `aria-current` anywhere on the page** (zero occurrences). |
| Link animation | Shared underline child: `absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full`. 300ms. |
| Mobile menu | Three bars morphing to an X via Tailwind transforms, `duration-300`. Panel `overflow-hidden` + conditional `max-h-96 opacity-100` ⇄ `max-h-0 opacity-0`. Closes on link click: yes. Esc, focus trap, outside-click, scroll lock: **not observed — all absent.** Hamburger has **no `aria-label`, no `aria-expanded`, no `aria-controls`.** |
| Header socials | **Mobile panel only** — there is no social row in the desktop bar. Instagram / X / YouTube / LinkedIn, all `target="_blank" rel="noopener noreferrer"`, and **none has an `aria-label`.** |
| CTA button | **None.** No register button in the navbar at all. |

### Hero — the pattern I was told to confirm

Order: `h1` (theme title) → gradient divider rule → event name → **date/location pill** → **two register buttons** → scroll cue.

**Date and Location are label/value pairs** inside one glass pill, separated
by a vertical rule:

```html
<span class="text-[11px] uppercase tracking-[0.2em] text-white/60">Date</span>
<span class="text-sm font-semibold text-white">21–22 March 2026</span>
```

Icon chips are `w-9 h-9 rounded-full bg-[#f5b942]/15`.

**Two register buttons split by audience**, identical styling, both
`target="_blank"`:

- `Register (VIT Students)` → `https://learner.vierp.in/`
- `Register (Non-VIT)` → `https://learner.vierp.in/events`

Secondary anchor CTA: "Explore Speakers" → `#speakers`, with a `tracking-[0.4em]`
label and a gradient hairline beneath.

**Not observed:** any countdown timer. No `setInterval`, no target date
string, no timer markup anywhere in nine JS chunks or the CSS.
**Not observed:** any badge or eyebrow above the `h1` — the title is first.

### Day-wise timeline

Flat data: `[{ day: "Day 1 — 21st March", events: ["Opening Ceremony", …] }, …]`.
Layout `md:grid-cols-2`, one column per day, gold spine gradient down the
left, dot per item, cards in a vertical `space-y-10` list.

**There are no hour labels.** No times, no `start`/`end` fields, no clock
icons — the data shape is `string[]` and has no room for them. All ten blocks
are populated; **no TBA state exists** and there is no conditional empty
rendering path.

### Footer

Four blocks: **A** brand column (logo + tagline + socials) · **B** Quick links
· **C** Event Details (address row, email row, a "Contact Us Directly"
mailto button) · **D** bottom bar — **which is genuinely empty in source**,
`<div class="…border-t …pt-6 md:pt-6 -pb-6"></div>` with no children. It
renders a bare divider strip.

Two real bugs: the brand block links to `#home`, and **no `id="home"` exists**.
The Facebook link renders the **LinkedIn** icon with `sr-only` text
"Linkedin". The displayed email `vishwaconclave@vit.edu` differs from the
mailto target `vishwaconclave.com@vit.edu`.

Header and footer social sets **differ in membership** (header has LinkedIn,
footer has Facebook) and in URL tracking params.

### Theme defects

**Four competing golds:** `#ffd700` (the brand, 60×), `#fcbb00`
(`amber-400`, used for *every* nav hover and underline), `#ffee32`
(`--primary`, footer link hover), `#ffd100` (`--secondary`, unused). Plus CSS
named `gold` in an unused class.

- **`xs:` breakpoint used 33× but never defined** in `@theme` — silently
  compiles to nothing. Because `xs:` sorts below `sm:` in the class strings,
  the un-prefixed size always wins on small screens.
- **`backdrop-blur-4xl` is undefined** — the theme stops at `--blur-3xl`, so
  all ten timeline cards render with `bg-white/5` and no blur.
- **Playfair Display declared 8× inline, loaded 0×.** No `@font-face`, no
  `next/font`, no `<link>`. Every heading silently falls back to system serif.
- **`prefers-reduced-motion`: not present in CSS.** Zero matches across both
  chunks. Twelve infinite CSS animations run unconditionally; only the canvas
  starfield checks the query, in JS.
- Two motion systems disagree — CSS at 300/500ms on Tailwind's default ease,
  framer-motion at 500–1000ms on `easeOut`, sometimes on the same element.
- **Zero reusable components.** Four button variants and four card variants,
  all one-off inline Tailwind strings. The two "same" gold buttons have
  **inverted gradient direction** and different hover behaviour
  (`scale-105` vs `brightness-110`). Card border opacity varies four ways
  across four variants.
- 8 of 16 custom animation classes are dead.

### What I am taking

**Take:** the hero structure — title, then date/location as explicit
label/value pairs, then **two audience-split register buttons**, then a
secondary anchor CTA. That is exactly the register flow the brief specified
and it works. **Take** the star-marked current-event nav link as a pattern,
but implemented *conditionally* and with `aria-current`, which they omitted.

**Leave:** hardcoded pills, undefined breakpoints, and the empty footer bar.

---

## 5. Our design tokens

All tokens live once in the Tailwind v4 `@theme` block in `src/index.css`.
Nothing below is hardcoded anywhere in a component.

### Colour

```
ink-950 #080808   ink-900 #0c0c0c   ink-850 #101010   ink-800 #151515
ink-700 #1a1a1a   ink-600 #242424
surface   #111111   surface-2 #161616   surface-3 #1c1c1c
line rgba(255,255,255,.08)   line-mid .13   line-strong .22
accent #ff003c   accent-soft #ff4d6d   accent-deep #c4002d
chalk #f4f4f6    chalk-2 #d4d4d8    chalk-3 #a1a1aa    chalk-4 #71717a
ok #4ade80        warn #ffb020
```

**Contrast, measured against the surfaces these actually render on:**

| Token | Value | On | Ratio | Verdict |
|---|---|---|---|---|
| `chalk` | `#f4f4f6` | `#111111` | ~17.4:1 | AAA |
| `chalk-2` | `#d4d4d8` | `#111111` | ~12.9:1 | AAA |
| `chalk-3` | `#a1a1aa` | `#111111` | ~7.6:1 | AA (and AAA for large text) |
| `accent-soft` | `#ff4d6d` | `#111111` | ~5.3:1 | AA |
| `ok` | `#4ade80` | `#111111` | ~10.4:1 | AAA |
| `warn` | `#ffb020` | `#111111` | ~10.1:1 | AAA |

**Hard rule, carried forward from the existing codebase:** `chalk-4`
(`#71717a`) is ~4.1:1 on `#111111` and **fails WCAG AA for body text**. It is
permitted for decorative hairlines and non-essential decoration only — never
for text below 18px. Body and UI text uses `chalk-3` as its floor.

### Radius

`--radius-chip: 2px` (mono chips, terminal) · `--radius-card: 4px` (all
surfaces) · `--radius-panel: 6px` (modals, mobile sheet) · `--radius-pill:
999px`. Four values, no arbitrary radii anywhere. This is the direct lesson
from Genesis' three broken ladders and VC'26's `rounded-[2.5rem]`.

### Type

`--font-display` Cabinet Grotesk (800/700) · `--font-sans` Inter ·
`--font-mono` JetBrains Mono · `--font-deva` Mukta (Devanagari, hero +
footer only).

Display scale is `clamp()`-driven so it works 360px → 1920px with no
breakpoint jump: `display-hero` `clamp(2.6rem, 9vw, 7rem)`,
`display-1` `clamp(2rem, 5.6vw, 4.5rem)`, `display-2`
`clamp(1.6rem, 3.4vw, 2.75rem)`, `display-3` `clamp(1.2rem, 2vw, 1.6rem)`.

### Shadow — three, and only three

```
--shadow-card:    0 1px 0 rgba(255,255,255,.04) inset, 0 12px 32px -16px rgba(0,0,0,.9)
--shadow-lift:    0 1px 0 rgba(255,255,255,.07) inset, 0 20px 44px -18px rgba(0,0,0,.95)
--shadow-glow:    0 0 0 1px rgba(255,0,60,.35), 0 8px 28px -8px rgba(255,0,60,.35)
```

CodeArambh has eight near-identical orange glows differing only in blur
radius. That is the failure mode. Three named shadows, no arbitrary values.

---

## 6. Our motion tokens

One system. Two durations for interactive feedback, one for entrances, one
for ambient loops.

```
--dur-fast:   140ms    colour, border, opacity
--dur-base:   240ms    transform, layout, drawer
--dur-slow:   520ms    entrances, reveals
--dur-loop:   1800ms   ambient only (cursor blink, pulse)

--ease-out:    cubic-bezier(.16, 1, .3, 1)     ← the house curve
--ease-inout:  cubic-bezier(.65, 0, .35, 1)   ← ambient loops
--ease-exit:   cubic-bezier(.4, 0, 1, 1)      ← dismissals
```

**`--ease-out` is adopted deliberately.** It is independently the signature
easing on both aisf-vit *and* Genesis — two unrelated codebases converged on
it. It has a fast start and a long settle, which is what makes a 3px hover
lift feel like the card is being handed to you rather than dragged.

**Every value is a token.** No component may write `240ms` or
`cubic-bezier(...)` inline. This is the direct fix for CodeArambh's
`.32s`-vs-`.3s` and VC'26's two disagreeing motion systems.

**Ambient loops** (the only `infinite` animations on the site): terminal
cursor blink, status pulse, one slow rotating ring on the branch graph.
Nothing else loops. No marquees, no parallax, no float.

**Reveals** are IntersectionObserver → one class toggle → a
`transform`/`opacity` transition on `--dur-slow` with a per-index
`--reveal-delay` of 45ms, capped at 6 steps.

**Reduced motion is a first-class branch, not a bolt-on.** Both reference
sites are missing it (aisf-vit: zero occurrences; VC'26: only the canvas
checks). We ship one global `prefers-reduced-motion` block that zeroes
durations and forces every reveal to its end state, plus explicit guards so
nothing is ever left invisible.

---

## 7. Patterns we are copying, and the file that implements each

| Reference pattern | Where it lands |
|---|---|
| Scroll-reactive navbar chrome (aisf-vit) — as CSS, not per-frame JS | `layout/Navbar.jsx` + `.glass-header` |
| Star / dot marked current-event nav link (VC'26) — but conditional and `aria-current`'d | `data/route.js` → `Navbar.jsx` |
| Two audience-split register buttons, label/value date+location (VC'26) | `Hero.jsx`, `Register.jsx` |
| Binary event status, honest empty state (Genesis) | `data/clubEvents.js`, `ClubEvents.jsx` |
| Event detail in a modal, not a route (Genesis) | `EventCard.jsx` |
| Banner-above-columns footer + sponsors immediately before footer (CodeArambh) | `layout/Footer.jsx` |
| One registration URL repeated at every entry point (CodeArambh, 9 CTAs) | `data/config.js` → every CTA |
| `cubic-bezier(.16,1,.3,1)` house curve (aisf-vit + Genesis, independently) | `--ease-out` |
| 300ms drawer (aisf-vit, VC'26 — same number, independently) | `--dur-base` |
| Sponsors render only when they exist; otherwise a "Partner with us" CTA | `Footer.jsx` + `data/sponsors.js` |

## 8. Patterns we are deliberately refusing

- **Three.js / R3F canvas background.** A brand-new club does not need a WebGL
  starfield, and it is the single largest byte cost available to us.
- **framer-motion.** Explicitly out of scope, and unnecessary: reveals,
  drawers, the drawer/accordion height trick and the branch-graph draw-in are
  all CSS-transitionable.
- **GSAP ScrollTrigger pin/scrub.** Not observable under reduced motion,
  breaks under keyboard nav, and fights the route rail.
- **Hardcoded "current" pills** (VC'26). Ours is derived from scroll position.
- **Unreachable anchors** (VC'26 `#home`; CodeArambh footer ignoring every id
  it defines). Every anchor on this site resolves to a real element, and the
  rail is generated from the same array that assigns the ids.
- **Invented content of any kind.** Covered in the next section.

---

## 9. The honesty rule, and how it is enforced mechanically

The brief's absolute rule: never invent data. This is treated as an
architectural constraint, not a copywriting preference.

1. **`src/data/config.js` is the only place a URL lives.** If it is absent,
   the component renders a "Notify me" capture instead of a dead link.
2. **`isPending()` gates every unknown.** Any value beginning `TODO_` renders
   an explicit `TBA` chip, never a plausible-looking stand-in.
3. **There are no seed events, no seed team, no seed sponsors, no seed FAQs.**
   The arrays ship empty. Components are written to render a designed empty
   state, and those empty states are the first thing you will see.
4. **No counters, no "trusted by", no stat strips.** A brand-new club with no
   past events has no numbers. There is no `useCounter` on this site.
5. **No test site impersonation.** The devtools easter egg runs `join()` and
   gets a real "we are recruiting" message, not a joke discount code.

Empty-state design is the deliverable here, not a fallback.