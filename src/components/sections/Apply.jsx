import { useState } from 'react';

import { contact, isPending } from '../../data/config.js';
import {
  applyIntro,
  checks,
  domainOptions,
  fields,
  labels,
  prTemplate,
  roleOptions,
  successState,
  years,
} from '../../data/apply.js';
import { Button } from '../ui/Button.jsx';
import { Chip, ToggleChip } from '../ui/Chip.jsx';
import { CopyChip } from '../ui/CopyChip.jsx';
import { Field } from '../ui/Field.jsx';
import { Section } from '../layout/Section.jsx';
import { StopHeading } from '../layout/StopHeading.jsx';

/**
 * STOP 06 -- APPLY
 *
 * "Open a pull request" against the chapter.
 *
 * NO BACKEND, AND IT DOES NOT PRETEND OTHERWISE
 * `config.apply.endpoint` is still a TODO. Rather than fake a success,
 * submit runs the checks, reveals them one at a time, then hands the
 * visitor a copyable summary and a prefilled mail draft. The endpoint to
 * POST to is documented in `data/apply.js`; wiring it is a one-liner.
 *
 * The stagger between the four checks is CSS, not a chain of JS timers --
 * see `.check-row` in index.css. One state change, four staggered
 * reveals, nothing to clean up.
 *
 * Validation is real: required fields, email shape, and errors wired
 * through aria-invalid + aria-describedby in `Field`.
 */

export function Apply() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    domain: '',
    role: '',
    why: '',
  });
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleLabel = (id) =>
    setSelectedLabels((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'We need something to call you.';
    if (!values.email.trim()) next.email = 'Required - this is how we reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'That does not look like an email address.';
    if (!values.branch.trim()) next.branch = 'Which branch are you in?';
    if (!values.domain) next.domain = 'Pick a domain - "not decided yet" is fine.';
    if (!values.why.trim() || values.why.trim().length < 10)
      next.why = 'A couple of sentences, so we know what you want to build.';
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      // Move focus to the first problem so keyboard users are not hunting.
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSubmitted(true);
  };

  /**
   * The pull-request body. Also exactly what a future endpoint would
   * receive, so this doubles as the payload contract.
   */
  const summary = [
    '## What I want to work on',
    '',
    values.why,
    '',
    '## Branch',
    `${values.branch}${values.year ? ` / ${values.year}` : ''}`,
    '',
    '## Domain',
    domainOptions.find((option) => option.id === values.domain)?.label ?? '',
    '',
    '## Role',
    values.role || 'Not sure yet',
    '',
    '## Labels',
    selectedLabels.length
      ? selectedLabels.map((id) => labels.find((l) => l.id === id)?.label).join(', ')
      : 'none',
    '',
    '## Contact',
    `${values.name} <${values.email}>`,
  ].join('\n');

  const inboxPending = isPending(contact.email);
  const mailtoHref = inboxPending
    ? undefined
    : `mailto:${contact.email}?subject=${encodeURIComponent(
        `[HWI join] ${values.name}`
      )}&body=${encodeURIComponent(summary)}`;

  if (submitted) {
    return (
      <Section id="apply" tone="base">
        <StopHeading
          number="07"
          command="gh pr view --web"
          label="Apply"
          title={applyIntro.title}
          description={applyIntro.description}
        />

        <div className="surface overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-2.5">
            <span className="font-mono text-xs text-chalk-2">PR / your-branch to main</span>
            <span className="chip chip-ok ml-auto">{successState.checksPassing}</span>
          </div>

          <div className="px-4 py-5 sm:px-5">
            <ul className="grid gap-2">
              {checks.map((check, index) => (
                <li
                  key={check.id}
                  className="check-row"
                  data-passed="true"
                  style={{ '--i': index }}
                >
                  <span className="check-box" aria-hidden="true">
                    &#10003;
                  </span>
                  <span className="check-label">{check.label}</span>
                  <span className="check-detail">{check.detail}</span>
                </li>
              ))}
            </ul>

            <h3 className="display-3 mt-7 text-chalk">{successState.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-chalk-3">{successState.body}</p>

            {/* No endpoint, so hand over the payload rather than
                pretending it was stored. */}
            <div className="mt-5 rounded-card border border-warn/30 bg-warn/[0.05] p-4">
              <p className="font-mono text-[11px] leading-relaxed text-warn">
                No endpoint is wired up yet, so this was not sent anywhere. Copy the
                summary below into an email, or wire <code className="font-mono">apply.endpoint</code>{' '}
                in config.js and it will POST itself.
              </p>

              <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-chip bg-ink-950 p-3 font-mono text-[11px] leading-relaxed text-chalk-2">
                {summary}
              </pre>

              <div className="mt-3 flex flex-wrap gap-2">
                <CopyChip text={summary} label="Copy pull request" />
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
                  Edit and reopen
                </button>
              </div>
            </div>

            <a href={`#${successState.ctaTarget}`} className="btn btn-secondary btn-sm mt-6">
              {successState.cta}
            </a>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="apply" tone="base">
      <StopHeading
        number="07"
        command="gh pr create"
        icon="GitPullRequestArrow"
        label="Apply"
        title={applyIntro.title}
        description={applyIntro.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <form onSubmit={handleSubmit} noValidate className="surface p-4 sm:p-6">
          <p className="mono-body mb-5 text-chalk-3">
            <span className="text-accent-soft">{applyIntro.repo}</span>
            <span className="text-chalk-4"> / base: {applyIntro.base}</span>
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={fields.name.label}
              placeholder={fields.name.placeholder}
              required={fields.name.required}
              value={values.name}
              onChange={set('name')}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label={fields.email.label}
              type="email"
              placeholder={fields.email.placeholder}
              required={fields.email.required}
              value={values.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label={fields.branch.label}
              placeholder={fields.branch.placeholder}
              required={fields.branch.required}
              value={values.branch}
              onChange={set('branch')}
              error={errors.branch}
            />
            <Field
              label={fields.year.label}
              type="select"
              options={['-', ...years]}
              value={values.year}
              onChange={set('year')}
            />
            <Field
              label={fields.domain.label}
              type="select"
              options={domainOptions.map((option) => option.label)}
              value={values.domain}
              onChange={set('domain')}
              required={fields.domain.required}
              error={errors.domain}
              className="sm:col-span-2"
            />
            <Field
              label={fields.role.label}
              type="select"
              options={roleOptions}
              value={values.role}
              onChange={set('role')}
              className="sm:col-span-2"
            />
          </div>

          {/* Domain labels, as selectable chips. */}
          <fieldset className="mt-5">
            <legend className="mono-label mb-2">Labels</legend>
            <div className="flex flex-wrap gap-1.5">
              {labels.map((label) => (
                <ToggleChip
                  key={label.id}
                  selected={selectedLabels.includes(label.id)}
                  onClick={() => toggleLabel(label.id)}
                  title={label.hint}
                >
                  {label.label}
                </ToggleChip>
              ))}
            </div>
          </fieldset>

          <Field
            label={fields.why.label}
            type="textarea"
            rows={fields.why.rows}
            placeholder={fields.why.placeholder}
            required={fields.why.required}
            value={values.why}
            onChange={set('why')}
            error={errors.why}
            className="mt-5"
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg">
              Create pull request
            </Button>
            <span className="font-mono text-[11px] text-chalk-4">{applyIntro.reviewTime}</span>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-chalk-4">
            {applyIntro.privacyNote}
          </p>
        </form>

        {/* Sidebar: what the pull request will look like. */}
        <aside className="grid content-start gap-3">
          <div className="surface p-4">
            <p className="mono-label mb-2">Status</p>
            <p className="font-mono text-xs text-chalk-2">{applyIntro.statusLine}</p>
            <div className="mt-3 flex flex-col gap-1.5 font-mono text-[11px] text-chalk-3">
              <span>
                <span className="text-accent">&larr;</span> {applyIntro.compare}
              </span>
              <span className="text-chalk-4">no commits yet</span>
            </div>
          </div>

          <div className="surface p-4">
            <p className="mono-label mb-2">Description template</p>
            <pre className="max-h-56 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-chalk-3">
              {prTemplate}
            </pre>
          </div>

          <div className="surface p-4">
            <p className="mono-label mb-2">Roles on offer</p>
            <ul className="flex flex-wrap gap-1.5">
              {roleOptions.slice(1, 5).map((role) => (
                <li key={role}>
                  <Chip tone="neutral">{role}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

export default Apply;