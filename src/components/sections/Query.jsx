import { useState } from 'react';

import { contact, isPending } from '../../data/config.js';
import { faqs } from '../../data/faqs.js';
import {
  closedEmpty,
  formFields,
  issueLabels,
  prefill,
  queryIntro,
  reassurance,
  successState,
} from '../../data/query.js';
import { Button } from '../ui/Button.jsx';
import { Chip, ToggleChip } from '../ui/Chip.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { Field } from '../ui/Field.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';
import { Reveal } from '../ui/Reveal.jsx';

/**
 * STOP 08 — QUERY
 *
 * A "New Issue" form with the three real labels, plus closed issues.
 *
 * `faqs.js` ships EMPTY — we have never answered a question on this site
 * — so the closed list renders "No closed issues yet. Be the first to
 * ask." The previous version of that file contained six confident answers
 * about eligibility and partnerships that nobody had asked yet. That was
 * the single worst piece of invented content on the old site, and it is
 * gone.
 *
 * Like Apply, there is no backend: submit produces a copyable issue and a
 * prefilled mail draft rather than a fake "issue #412 created".
 */
export function Query() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [label, setLabel] = useState('question');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const issueBody = [
    '### ' + (title || '(untitled)'),
    '',
    body,
    '',
    `**label:** ${label}`,
    email ? `**contact:** ${email}` : '',
    '',
    '---',
    'Filed from hackwithindia-vit-pune.vercel.app',
  ]
    .filter(Boolean)
    .join('\n');

  const mailtoHref = isPending(contact.email)
    ? undefined
    : `mailto:${contact.email}?subject=${encodeURIComponent(
        `[${label}] ${title || 'Question'}`
      )}&body=${encodeURIComponent(issueBody)}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!title.trim()) next.title = 'One line is enough.';
    if (!body.trim() || body.trim().length < 8) next.body = 'Tell us a little more.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSubmitted(true);
  };

  return (
    <Section id="query" tone="base">
      <StopHeading
        number="09"
        command={queryIntro.command}
        icon="CircleHelp"
        label="Query"
        title={queryIntro.title}
        description={queryIntro.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* ── New issue ── */}
        <div className="surface p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold tracking-tight text-chalk">
              New issue
            </h3>
            <span className="font-mono text-[11px] text-chalk-4">{queryIntro.repo}</span>
          </div>

          {submitted ? (
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Chip tone="ok">filed</Chip>
                <p className="font-display text-base font-bold text-chalk">
                  {successState.heading}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-chalk-3">{successState.body}</p>

              <div className="mt-4 rounded-card border border-warn/30 bg-warn/[0.05] p-4">
                <p className="font-mono text-[11px] leading-relaxed text-warn">
                  No issue tracker is connected, so this was not submitted anywhere. Copy
                  the text and send it, or wire up an endpoint.
                </p>
                <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-chip bg-ink-950 p-3 font-mono text-[11px] leading-relaxed text-chalk-2">
                  {issueBody}
                </pre>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => navigator.clipboard?.writeText(issueBody)}>
                    Copy issue
                  </Button>
                  {mailtoHref && (
                    <a href={mailtoHref} className="btn btn-primary btn-sm">
                      Send by email
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Write another
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-4">
              {/* Labels. Three, and they mean three different things.
                  ToggleChip keeps this on the site's one chip system
                  rather than hand-rolling a third button treatment. */}
              <fieldset>
                <legend className="mono-label mb-2">Labels</legend>
                <div className="flex flex-wrap gap-1.5">
                  {issueLabels.map((item) => (
                    <ToggleChip
                      key={item.id}
                      selected={label === item.id}
                      onClick={() => setLabel(item.id)}
                      title={item.hint}
                    >
                      {item.label}
                    </ToggleChip>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-chalk-4">
                  {issueLabels.find((item) => item.id === label)?.hint}
                </p>
              </fieldset>

              <Field
                label={formFields.title.label}
                placeholder={formFields.title.placeholder}
                required={formFields.title.required}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrors((c) => ({ ...c, title: undefined }));
                }}
                error={errors.title}
              />

              <Field
                label={formFields.body.label}
                type="textarea"
                rows={formFields.body.rows}
                placeholder={formFields.body.placeholder}
                required={formFields.body.required}
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                  setErrors((c) => ({ ...c, body: undefined }));
                }}
                error={errors.body}
              />

              <Field
                label={formFields.email.label}
                type="email"
                placeholder={formFields.email.placeholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <div>
                <Button type="submit">File this issue</Button>
              </div>
            </form>
          )}

          {/* Prefill chips. These are the questions people actually ask. */}
          {!submitted && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="mono-label mb-2">Common questions</p>
              <div className="flex flex-wrap gap-1.5">
                {prefill.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => {
                      setTitle(question);
                      setBody('');
                      setErrors({});
                    }}
                    className="chip chip-toggle"
                  >
                    {question.length > 46 ? `${question.slice(0, 44)}…` : question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Reassurance ── */}
        <aside className="surface content-start p-4">
          <p className="mono-label mb-3">Before you ask</p>
          <ul className="grid gap-2.5">
            {reassurance.map((line) => (
              <li key={line} className="flex gap-2 text-sm leading-relaxed text-chalk-3">
                <span className="text-accent" aria-hidden="true">
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>

          {!isPending(contact.email) && (
            <a
              href={`mailto:${contact.email}`}
              className="btn btn-secondary btn-sm mt-5 w-full"
            >
              Email instead
            </a>
          )}
        </aside>
      </div>

      {/* ── Closed issues ── */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="display-3 text-chalk">Closed issues</h3>
          <span className="font-mono text-[11px] text-chalk-4">
            {faqs.length} closed
          </span>
        </div>

        {faqs.length ? (
          <ul className="mt-5 grid gap-3">
            {faqs.map((issue, index) => (
              <Reveal key={issue.id} delay={index * 45} className="surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="ok">✓ closed</Chip>
                  <span className="font-mono text-[11px] text-chalk-4">{issue.number}</span>
                  <span className="chip">{issue.label}</span>
                </div>
                <h4 className="mt-2.5 font-display text-base font-bold text-chalk">
                  {issue.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-chalk-3">{issue.body}</p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-5"
            icon="CircleCheck"
            title={closedEmpty.title}
            body={closedEmpty.body}
          />
        )}
      </div>
    </Section>
  );
}

export default Query;