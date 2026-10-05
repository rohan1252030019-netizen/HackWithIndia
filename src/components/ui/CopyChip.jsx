import { useState } from 'react';

import { cn } from '../../lib/cn.js';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js';

/**
 * Copy-to-clipboard control.
 *
 * `navigator.clipboard` is undefined on http:// and frequently
 * unavailable inside in-app webviews — and most of this site's traffic is
 * expected to arrive from a WhatsApp link, so that is the normal case
 * rather than an edge case.
 *
 * So there are three tiers: the async Clipboard API, an
 * `execCommand('copy')` fallback, and finally selecting the text so a
 * manual copy still works. Silently doing nothing is not one of them.
 *
 * Announced via a polite live region, and the label itself flips — a
 * colour-only or icon-only confirmation is invisible to most people.
 */
export function CopyChip({ text, label = 'Copy', copiedLabel = 'Copied', className }) {
  const [copied, copy] = useCopyToClipboard();
  const [failed, setFailed] = useState(false);

  const handleCopy = async () => {
    const ok = await copy(text);

    if (!ok) {
      // Last resort: select the whole document so ⌘C / Ctrl+C still works.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.body);
      selection?.removeAllRanges();
      selection?.addRange(range);
      setFailed(true);
      return;
    }
    setFailed(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={cn('btn btn-ghost btn-sm', copied && 'text-ok', className)}
        aria-label={`${label}: ${text}`}
      >
        <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
        <span>{copied ? copiedLabel : label}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied
          ? `${label}ed to clipboard`
          : failed
            ? 'Copy failed — the page text has been selected, press Ctrl or Cmd plus C'
            : ''}
      </span>
    </>
  );
}