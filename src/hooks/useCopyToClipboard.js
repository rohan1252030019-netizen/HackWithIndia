import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * `navigator.clipboard` with a legacy fallback.
 *
 * Why the fallback matters here specifically: `navigator.clipboard` is
 * undefined on any `http://` origin and is frequently unavailable inside
 * in-app browsers. Most of this site's traffic is expected to arrive from
 * a WhatsApp in-app webview, so that is the normal case, not an edge case.
 *
 * @param {number} resetMs  How long the "copied" state stays true.
 * @returns {[boolean, (text: string) => Promise<boolean>]}
 */
export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      const ok = await copyText(text);
      if (!ok) return false;

      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetMs);
      return true;
    },
    [resetMs]
  );

  return [copied, copy];
}

/** Standalone copy helper, for callers that hold no state. */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}