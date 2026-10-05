import { activeSocials, gitIdentity, socialsIntro } from '../../data/socials.js';
import { DEVANAGARI, isPending } from '../../data/config.js';
import { CopyChip } from '../ui/CopyChip.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { getSocialIcon } from '../../lib/socialIconMap.js';

/**
 * STOP 09 — OFFICIAL HANDLES, as `git remote -v`.
 *
 * ── ONLY REAL REMOTES RENDER ─────────────────────────────────────
 * `socials.js` ships with every URL as a TODO placeholder, so this section
 * currently renders an empty state rather than five dead links. That is
 * the correct output for a brand-new club with no accounts yet: five
 * rows of "coming soon" would look worse than saying nothing.
 *
 * Drop the real URLs into `data/socials.js` and five clickable, copyable
 * remotes appear with no code change. Remove a platform entirely by
 * deleting its entry, or set `url: null`.
 */
export function Handles() {
  const remotes = activeSocials;
  const identityPending = isPending(gitIdentity.value);

  /**
   * The whole block for one-click copy, formatted the way git would print
   * it. Rebuilt from whatever remotes actually exist, so it can never
   * contain a URL that is not on the page.
   */
  const blockText = [
    socialsIntro.command,
    ...remotes.map((remote) => `${remote.url} (fetch)\n${remote.url} (push)`),
    ...(identityPending ? [] : [`\nuser.email ${gitIdentity.value}`]),
  ].join('\n');

  return (
    <Section id="handles" tone="raised">
      <StopHeading
        number="10"
        command={socialsIntro.command}
        icon="Network"
        label="Handles"
        title="Official Handles"
        description={socialsIntro.description}
      />

      {/* ── Terminal ── */}
      <div className="term">
        <div className="term-bar">
          <span className="term-dot" aria-hidden="true" />
          <span className="term-dot" aria-hidden="true" />
          <span className="term-dot" aria-hidden="true" />
          <span className="mono-label ml-1 truncate">hwi@vit:~/remotes</span>
          {remotes.length > 0 && (
            <span className="ml-auto">
              <CopyChip text={blockText} label={socialsIntro.copyAllLabel} copiedLabel={socialsIntro.copiedLabel} />
            </span>
          )}
        </div>

        <div className="px-4 py-4 sm:px-5">
          <p className="term-prompt">
            <span aria-hidden="true">{'> '}</span>
            {socialsIntro.command}
          </p>

          {remotes.length ? (
            <ul className="mt-3 grid gap-2.5">
              {remotes.map((remote) => {
                const IconComponent = getSocialIcon(remote.icon);
                return (
                  <li key={remote.id} className="group">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={remote.url}
                        target="_blank"
                        rel="noreferrer me"
                        className="flex min-w-0 items-center gap-2 text-accent-soft underline underline-offset-4 transition-colors duration-150 hover:text-chalk"
                      >
                        {IconComponent && (
                          <IconComponent
                            width={14}
                            height={14}
                            className="shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate font-mono text-[11.5px]">{remote.url}</span>
                      </a>
                      <CopyChip
                        text={remote.url}
                        label="copy"
                        className="ml-auto shrink-0 opacity-0 transition-opacity duration-150 focus-visible:opacity-100 group-hover:opacity-100"
                      />
                    </div>
                    <p className="mt-0.5 flex flex-wrap items-baseline gap-2 pl-6 text-[11px] text-chalk-4">
                      <span className="font-mono">{remote.platform}</span>
                      <span>{remote.handle}</span>
                      <span className="text-chalk-3">{remote.note}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-chalk-3">
              no remotes configured
              <br />
              <span className="text-chalk-4">
                Add the real URLs to <span className="text-accent">src/data/socials.js</span> and
                they appear here.
              </span>
            </p>
          )}

          {/* The git identity line, once there is an inbox to show. */}
          {!identityPending && (
            <p className="mt-5 border-t border-line pt-3 font-mono text-[11.5px] text-chalk-3">
              <span className="text-accent-soft">git config</span> {gitIdentity.label}{' '}
              <span className="text-chalk-2">{gitIdentity.value}</span>
            </p>
          )}
        </div>
      </div>

      {/* ── Empty state, only when there is genuinely nothing ── */}
      {remotes.length === 0 && (
        <EmptyState
          className="mt-6"
          icon="Network"
          title="No remotes yet"
          body="Hack With India is a brand-new club, so the social accounts have not been created yet. We will post the links here the moment they exist — this section is wired up and waiting."
        />
      )}

      {/* ── Impersonation warning ── */}
      <div className="mt-8 rounded-card border border-line p-4">
        <p className="text-sm leading-relaxed text-chalk-3">{socialsIntro.disclaimer}</p>
      </div>

      {/* ── Devanagari sign-off ── */}
      <p className="deva mt-10 text-center text-2xl text-accent-soft" lang="mr">
        {DEVANAGARI}
      </p>
    </Section>
  );
}

export default Handles;