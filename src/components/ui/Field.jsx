import { useId } from 'react';

import { cn } from '../../lib/cn.js';
import { Chip } from './Chip.jsx';

/**
 * Labelled form field.
 *
 * Every input on this site goes through here, which is what makes the
 * label, id, hint, error and focus treatment consistent. The wiring that
 * matters:
 *   • `useId` gives a real, unique id — no hand-written ones to collide.
 *   • `aria-describedby` points at both hint and error, so a screen reader
 *     announces the reason a field is invalid.
 *   • `aria-invalid` is set from the error state.
 *   • Required fields are marked `aria-required` AND visually, because
 *     `required` alone fails silently on a 360px screen.
 */
export function Field({
  label,
  type = 'text',
  placeholder,
  required = false,
  options,
  rows,
  hint,
  error,
  value,
  onChange,
  className,
  ...rest
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  const shared = {
    id,
    name: rest.name ?? label?.toLowerCase().replace(/\s+/g, '-'),
    value,
    onChange,
    placeholder,
    required,
    'aria-required': required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="mono-label flex items-center gap-1.5">
        {label}
        {required && (
          <span className="text-accent" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="text-chalk-4 normal-case tracking-normal">(optional)</span>}
      </label>

      {type === 'select' ? (
        <select {...shared} className="select">
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...shared} rows={rows ?? 4} className="textarea" />
      ) : (
        <input {...shared} type={type} className="input" />
      )}

      {hint && !error && (
        <p id={hintId} className="text-[11px] leading-snug text-chalk-4">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-[11px] leading-snug text-warn">
          <Chip tone="warn">!</Chip>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}