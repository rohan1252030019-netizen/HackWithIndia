import { useEffect, useState } from 'react';

import { KONAMI } from '../lib/ascii.js';

/**
 * The Konami code, plus a plain-text alternative.
 *
 * Matching the sequence with a keyboard listener is an accessibility
 * liability: it fires while someone is typing in the Register terminal,
 * which would fire confetti mid-sentence. So the sequence is only
 * captured when focus is NOT inside a text field, and the sequence can
 * also be typed as the literal string `konami` anywhere.
 *
 * @param {object} options
 * @param {() => void} options.onTrigger
 * @returns {boolean} Whether it has fired at least once.
 */
export function useKonami({ onTrigger }) {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const sequence = [];

    const isTyping = (target) =>
      target instanceof HTMLElement &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable);

    const onKeyDown = (event) => {
      if (isTyping(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      sequence.push(key);
      if (sequence.length > KONAMI.length) sequence.shift();

      const matched =
        sequence.length === KONAMI.length && sequence.every((k, i) => k === KONAMI[i]);

      // The literal-string escape hatch, for people who will never find
      // the arrow keys on a keyboard.
      const spelled = sequence.join('').endsWith('konami');

      if (matched || spelled) {
        sequence.length = 0;
        setFired(true);
        onTrigger?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onTrigger]);

  return fired;
}