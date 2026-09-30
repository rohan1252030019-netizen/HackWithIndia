import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';

import { Hero } from './components/sections/Hero.jsx';
import { Overview } from './components/sections/Overview.jsx';
import { Objectives } from './components/sections/Objectives.jsx';
import { Ecosystem } from './components/sections/Ecosystem.jsx';
import { Impact } from './components/sections/Impact.jsx';
import { Benefits } from './components/sections/Benefits.jsx';
import { Events } from './components/sections/Events.jsx';
import { Roadmap } from './components/sections/Roadmap.jsx';
import { Partners } from './components/sections/Partners.jsx';
import { Team } from './components/sections/Team.jsx';
import { Gallery } from './components/sections/Gallery.jsx';
import { Join } from './components/sections/Join.jsx';
import { FAQ } from './components/sections/FAQ.jsx';
import { FinalCTA } from './components/sections/FinalCTA.jsx';
import { BigBrandBanner } from './components/sections/BigBrandBanner.jsx';

/**
 * Single-page composition. Every section is imported eagerly on purpose:
 *
 * This is an anchor-linked one-pager, so every section must be in the DOM
 * before the user can jump to it. Splitting them into lazy chunks adds 13
 * extra requests and a layout shift, while saving almost nothing — the
 * section components are plain JSX and the payload is dominated by React and
 * the small amount of Framer Motion that remains. The real weight removed in
 * this refactor was the unused `three` dependency and the per-card
 * `whileInView` motion instances, both of which are gone.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-chalk selection:bg-accent/30 selection:text-white">
      {/* Film grain. Fixed, non-interactive, one rasterised layer — gives the
          flat black a physical surface without any per-frame cost. */}
      <div aria-hidden="true" className="grain-layer" />

      <Navbar />

      <main id="main" className="relative z-[2]">
        <Hero />
        <Overview />
        <Objectives />
        <Ecosystem />
        <Impact />
        <Benefits />
        <Events />
        <Roadmap />
        <Partners />
        <Team />
        <Gallery />
        <Join />
        <FAQ />
        <FinalCTA />
        <BigBrandBanner />
      </main>

      <Footer />
    </div>
  );
}
