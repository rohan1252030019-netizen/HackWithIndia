import { useEffect, useRef, useState } from 'react';

import { contact, isPending, REGISTRATION_OPEN } from '../../data/config.js';
import { runCommand } from '../../lib/cli.js';
import {
  bootLines,
  branchList,
  checklist,
  closedState,
  formFields,
  registerIntro,
  suggestions,
  statusOutput,
  successState,
  whoamiOutput,
} from '../../data/register.js';
import { Button } from '../ui/Button.jsx';
import { Chip } from '../ui/Chip.jsx';
import { Field } from '../ui/Field.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { TerminalShell } from '../ui/Terminal.jsx';

/**
 * STOP 07 — REGISTER
 *
 * A genuinely working terminal.
 *
 * `lib/cli.js` tokenises and parses whatever is typed — quotes, `--flag=value`,
 * aliases, the lot — and the parsed values write straight into the form
 * below. Type `register --team "chai squad" --size 4` and watch the form
 * fill itself. That is the whole point: it is not a screenshot of a
 * terminal, it is a terminal.
 *
 * ── REGISTRATION IS CLOSED ───────────────────────────────────────
 * So it tells you so. It does not print a seat count, a confirmation, or
 * a fake success — we do not know those things. The checklist shows what
 * it *parsed*, never what it *saved*.
 *
 * ── SCROLLING ────────────────────────────────────────────────────
 * History is rendered in a log with a real `role="log"`, so it is
 * announced as output rather than silently growing. The view
 * auto-scrolls only while the visitor is already at the bottom — if they
 * have scrolled up to read something, we do not yank them back down.
 */

/** Build the context `runCommand` needs to answer --help and friends. */
function commandContext(onConfetti) {
  return {
    onConfetti,
    helpLines: [
      'usage: hackwithindia <command> [options]',
      '',
      'commands:',
      '  register --team "<name>" --size <n>   register a team',
      '  status                                is registration open?',
      '  whoami                                eligibility rules',
      '  apply                                 open the apply stop',
      '  branches                              list domain branches',
      '',
      'easter eggs: sudo win · git blame chai',
    ],
    statusLines: statusOutput.lines,
    whoamiLines: whoamiOutput,
    branchLines: branchList,
  };
}

export function Register({ onConfetti }) {
  const [history, setHistory] = useState(() =>
    bootLines.map((line) => ({ ...line, kind: 'boot' }))
  );
  const [draft, setDraft] = useState('');
  const [form, setForm] = useState({ team: '', size: '', email: '' });
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const pinnedToBottom = useRef(true);

  /** Keep the log pinned to the bottom only if the visitor is already there. */
  useEffect(() => {
    const node = logRef.current;
    if (!node || !pinnedToBottom.current) return;
    node.scrollTop = node.scrollHeight;
  }, [history]);

  const run = (input) => {
    const command = input.trim();
    if (!command) return;

    pinnedToBottom.current = true;
    setHistory((current) => [
      ...current,
      { kind: 'echo', text: `${registerIntro.user}@${registerIntro.host}:~$ ${command}` },
    ]);

    const result = runCommand(command, commandContext(onConfetti));

    setHistory((current) => [...current, ...(result.lines ?? [])]);

    if (result.form) setForm((current) => ({ ...current, ...result.form }));
    if (result.action === 'clear') setHistory([]);
    if (result.action === 'scroll:apply') {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      run(draft);
      setDraft('');
      return;
    }
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setHistory([]);
      setDraft('');
    }
  };

  const parsed = Boolean(form.team && form.size);

  return (
    <Section id="register" tone="alt">
      <StopHeading
        number="08"
        command="hackwithindia register"
        icon="SquareTerminal"
        label="Register"
        title={registerIntro.title}
        description={registerIntro.description}
      />

      {/* ── Closed-state banner. Shown because it is true. ── */}
      {!REGISTRATION_OPEN && (
        <div className="mb-6 rounded-card border border-warn/30 bg-warn/[0.06] p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="warn">not open</Chip>
            <p className="font-display text-base font-bold text-chalk">{closedState.heading}</p>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-chalk-2">{closedState.body}</p>
          <a href={`#${closedState.ctaTarget}`} className="btn btn-secondary btn-sm mt-4">
            {closedState.cta}
          </a>
        </div>
      )}

      {/* ── The terminal ── */}
      <TerminalShell
        title={`${registerIntro.user}@${registerIntro.host}:~/register`}
        barExtra={<Chip tone="accent">v0.1.0</Chip>}
        className="surface"
      >
        {/*
          role="log" + aria-live="polite" so new output is announced rather
          than silently appearing. aria-relevant="additions" keeps it to the
          new lines.
        */}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Terminal output"
          onScroll={(event) => {
            const node = event.currentTarget;
            pinnedToBottom.current =
              node.scrollHeight - node.scrollTop - node.clientHeight < 24;
          }}
          className="max-h-72 overflow-y-auto px-4 py-4 sm:px-5"
        >
          {history.length === 0 ? (
            <p className="term-dim">type `help` to see what this thing can do</p>
          ) : (
            history.map((line, index) => (
              <p
                key={index}
                className={
                  line.kind === 'echo'
                    ? 'mt-2 text-chalk'
                    : line.tone === 'ok'
                      ? 'term-ok'
                      : line.tone === 'error'
                        ? 'term-error'
                        : line.tone === 'dim'
                          ? 'term-dim'
                          : ''
                }
              >
                {line.text || ' '}
              </p>
            ))
          )}
        </div>

        {/* The prompt. A real <label> + <input>, so it is reachable and
            announced; the fake prompt glyphs are aria-hidden. */}
        <div className="flex items-center gap-2 border-t border-line px-4 py-3 sm:px-5">
          <label htmlFor="term-input" className="term-prompt shrink-0 font-mono text-xs">
            <span aria-hidden="true">{registerIntro.user}@</span>
            <span className="sr-only">Terminal command</span>
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder='register --team "your team" --size 4'
            aria-describedby="term-help"
            className="w-full bg-transparent font-mono text-xs text-chalk outline-none placeholder:text-chalk-4/70"
          />
          <span className="cursor-block shrink-0" aria-hidden="true" />
        </div>
        <p id="term-help" className="px-4 pb-3 text-[10px] text-chalk-4 sm:px-5">
          Try <code className="font-mono">sudo win</code> or{' '}
          <code className="font-mono">git blame chai</code>. Ctrl+L clears.
        </p>
      </TerminalShell>

      {/* ── Suggestion chips ── */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.command}
            type="button"
            onClick={() => {
              setDraft('');
              run(suggestion.command);
              inputRef.current?.focus();
            }}
            className="chip chip-toggle"
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      {/* ── The form behind the terminal ── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
        <form
          className="surface p-4 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (!parsed) {
              inputRef.current?.focus();
              return;
            }
            run(`register --team "${form.team}" --size ${form.size}`);
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold tracking-tight text-chalk">
              {REGISTRATION_OPEN ? 'Register your team' : 'Register your team (preview)'}
            </h3>
            <span className="font-mono text-[11px] text-chalk-4">
              {REGISTRATION_OPEN ? 'live' : 'not live — nothing is sent'}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label={formFields.team.label}
              placeholder={formFields.team.placeholder}
              required={formFields.team.required}
              value={form.team}
              onChange={(event) => setForm((c) => ({ ...c, team: event.target.value }))}
              hint="Typing `register --team ...` above fills this in."
            />
            <Field
              label={formFields.size.label}
              type="select"
              /* An empty leading option, so the select can actually be
                 "unset". Without it the first option would display while
                 the value stayed '' — a control that lies about itself. */
              options={['—', ...formFields.size.options]}
              required={formFields.size.required}
              value={form.size}
              onChange={(event) => setForm((c) => ({ ...c, size: event.target.value }))}
            />
            <Field
              label={formFields.email.label}
              type="email"
              placeholder={formFields.email.placeholder}
              required={formFields.email.required}
              value={form.email}
              onChange={(event) => setForm((c) => ({ ...c, email: event.target.value }))}
              className="sm:col-span-2"
            />
          </div>

          <Button type="submit" className="mt-5">
            {REGISTRATION_OPEN ? 'Register' : 'Notify me when it opens'}
          </Button>

          {!REGISTRATION_OPEN && (
            <p className="mt-3 text-[11px] leading-relaxed text-chalk-4">
              Registration is closed, so this form does not send anything yet. Once it
              opens, <code className="font-mono">config.js</code> flips
              <code className="font-mono"> REGISTRATION_OPEN</code> to true and every
              Register button on this site starts working.
            </p>
          )}
        </form>

        {/* ── Checklist: shows what was PARSED, never what was saved ── */}
        <aside className="surface content-start p-4">
          <p className="mono-label mb-3">Registration state</p>

          <ul className="grid gap-2">
            {checklist.map((item) => {
              const done =
                (item.id === 'team' && Boolean(form.team)) ||
                (item.id === 'size' && Boolean(form.size)) ||
                (item.id === 'email' && Boolean(form.email));

              return (
                <li key={item.id} className="flex items-center gap-2.5">
                  <span
                    className={
                      done
                        ? 'grid h-4 w-4 place-items-center rounded-chip bg-ok/20 text-[9px] text-ok'
                        : 'grid h-4 w-4 place-items-center rounded-chip border border-line-strong text-[9px] text-chalk-4'
                    }
                    aria-hidden="true"
                  >
                    {done ? '✓' : '·'}
                  </span>
                  <span className={`font-mono text-[11px] ${done ? 'text-chalk-2' : 'text-chalk-4'}`}>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t border-line pt-4">
            {parsed ? (
              <p className="font-mono text-[11px] leading-relaxed text-chalk-3">
                {form.team || '(unnamed)'} · {form.size} member
                {form.size === '1' ? '' : 's'}
                <br />
                {REGISTRATION_OPEN
                  ? successState.body
                  : 'Parsed. Not saved — registration is closed.'}
              </p>
            ) : (
              <p className="font-mono text-[11px] leading-relaxed text-chalk-4">
                nothing parsed yet
              </p>
            )}
          </div>

          {!isPending(contact.email) && (
            <a href={`mailto:${contact.email}`} className="btn btn-ghost btn-sm mt-4 w-full">
              {contact.email}
            </a>
          )}
        </aside>
      </div>
    </Section>
  );
}

export default Register;