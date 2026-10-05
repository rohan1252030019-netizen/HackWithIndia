import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import { DEVANAGARI } from '../../data/config.js';
import { repo } from '../../data/config.js';
import { stops } from '../../data/route.js';
import { TerminalOutput, TerminalShell } from '../ui/Terminal.jsx';

/**
 * 404.
 *
 * A joke, but a useful one: the joke names the actual failure (the branch
 * does not exist) and then gives someone a way back. A 404 that is only
 * funny is a dead end.
 *
 * Rendered on any path that is not the site root, since this is a
 * one-pager with no routes.
 */
export function NotFound() {
  // Read once during render — `window.location` cannot change without a
  // navigation, so this does not need to be an effect.
  const [path] = useState(() => window.location.pathname);

  const goHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative px-4 py-28 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto max-w-2xl">
        <p className="mono-label mb-5">error 404</p>

        <h1 className="display-1 text-chalk">
          git checkout:{' '}
          <span className="text-accent-soft">route not found</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-chalk-2">
          <code className="font-mono text-sm text-warn">{path || '/…'}</code> is not a stop on
          this route. Even PMPML is on time more often than this URL.
        </p>

        <TerminalShell title={`hwi@vit:~$ git checkout ${path || '/'}`} className="mt-8">
          <TerminalOutput
            lines={[
              { text: `error: pathspec '${path || '/'}' did not match any file(s) known to git`, tone: 'error' },
              { text: '', tone: 'dim' },
              { text: `hint: this repository is '${repo.owner}/${repo.name}', ${stops.length} stops long`, tone: 'dim' },
              { text: 'hint: nothing here has been merged yet either', tone: 'dim' },
            ]}
          />
        </TerminalShell>

        {/* The ten stops, so a lost visitor is one click from anywhere. */}
        <nav aria-label="Page sections" className="mt-8">
          <p className="mono-label mb-3">Available stops</p>
          <ul className="flex flex-wrap gap-1.5">
            {stops.map((stop) => (
              <li key={stop.id}>
                <a
                  href={`#${stop.id}`}
                  className="chip chip-toggle"
                  onClick={(event) => {
                    event.preventDefault();
                    goHome();
                    setTimeout(
                      () =>
                        document.getElementById(stop.id)?.scrollIntoView({ behavior: 'smooth' }),
                      60
                    );
                  }}
                >
                  <span className="text-chalk-4">{stop.number}</span>
                  {stop.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button" onClick={goHome} className="btn btn-primary mt-8">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to the depot
        </button>

        <p className="deva mt-10 text-center text-xl text-chalk-4" lang="mr">
          {DEVANAGARI}
        </p>
      </div>
    </div>
  );
}

export default NotFound;