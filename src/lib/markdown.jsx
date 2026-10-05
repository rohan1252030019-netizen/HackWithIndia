/**
 * A tiny, SAFE markdown renderer.
 *
 * WHY NOT A LIBRARY: a markdown library plus a sanitiser is roughly
 * 30 KB gzipped. This section is a README with headings, lists and a
 * checklist in it. That is not worth 30 KB.
 *
 * WHY NOT dangerouslySetInnerHTML: the README is authored in
 * `src/data/about.js`. Even though that file is ours, rendering its
 * contents as raw HTML means one bad string is one XSS. So this parser
 * returns React ELEMENTS. There is no HTML string anywhere in the output
 * path, which makes the class of bug impossible rather than unlikely.
 *
 * SUPPORTED
 *   # ## ###        headings
 *   paragraphs      blank-line separated
 *   **bold**        *italic*    `code`    [text](href)
 *   - item          bullet lists
 *   1. item         ordered lists
 *   - [ ] / - [x]   task lists  → real checkbox inputs, disabled
 *   > quote         blockquotes
 *   ---             horizontal rule
 *   ``` fence       preformatted code block
 *
 * NOT SUPPORTED (and not needed): tables, images, nested lists, HTML.
 * Raw `<` and `>` in the source are escaped by React automatically.
 */

import { Fragment } from 'react';

/** Inline: **bold**, *italic*, `code`, [link](href). Returns nodes. */
function renderInline(text, keyPrefix = 'i') {
  const nodes = [];
  // Order matters: code first, so backticks inside ** ** still work.
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${index}`;
    index += 1;

    if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const internal = href.startsWith('#');
        nodes.push(
          <a
            key={key}
            href={href}
            className="md-link"
            {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
          >
            {label}
          </a>
        );
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key} className="md-strong">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className="md-code">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <em key={key} className="md-em">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** A `- [ ]` / `- [x]` task item. Rendered as a real disabled checkbox. */
function renderTaskItem(token, key) {
  const match = /^-\s+\[([ xX])\]\s+(.*)$/.exec(token);
  const checked = match[1].toLowerCase() === 'x';
  const text = match[2] ?? token;

  return (
    <li key={key} className="md-task">
      <input type="checkbox" checked={checked} readOnly disabled className="md-checkbox" />
      <span className={checked ? 'md-task-done' : undefined}>{renderInline(text, key)}</span>
    </li>
  );
}

/**
 * Parses a markdown string into a list of React elements.
 *
 * @param {string} source
 * @param {object} options
 * @param {number} options.startHeadingLevel  Default 2 — the README sits
 *        under an `<h2>` already, so its own `#` maps to `<h2>`.
 */
export function parseMarkdown(source, { startHeadingLevel = 2 } = {}) {
  if (!source) return [];

  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  const flushParagraph = (buffer) => {
    if (!buffer.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="md-p">
        {renderInline(buffer.join(' '), `p${blocks.length}`)}
      </p>
    );
    buffer.length = 0;
  };

  const paragraph = [];

  while (index < lines.length) {
    const line = lines[index];

    // ── Fenced code block ──
    if (line.trimStart().startsWith('```')) {
      flushParagraph(paragraph);
      const language = line.trim().slice(3).trim();
      const body = [];
      index += 1;
      while (index < lines.length && !lines[index].trimStart().startsWith('```')) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1; // closing fence
      blocks.push(
        <pre key={`code-${blocks.length}`} className="md-pre" data-lang={language || undefined}>
          <code>{body.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // ── Blank line ──
    if (!line.trim()) {
      flushParagraph(paragraph);
      index += 1;
      continue;
    }

    // ── Horizontal rule ──
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      flushParagraph(paragraph);
      blocks.push(<hr key={`hr-${blocks.length}`} className="md-hr" />);
      index += 1;
      continue;
    }

    // ── Heading ──
    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushParagraph(paragraph);
      const level = Math.min(startHeadingLevel + headingMatch[1].length - 1, 6);
      const Tag = `h${level}`;
      blocks.push(
        <Tag key={`h-${blocks.length}`} className={`md-h md-h${level}`}>
          {renderInline(headingMatch[2], `h${blocks.length}`)}
        </Tag>
      );
      index += 1;
      continue;
    }

    // ── Blockquote ──
    if (/^\s*>\s?/.test(line)) {
      flushParagraph(paragraph);
      const body = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        body.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      blocks.push(
        <blockquote key={`q-${blocks.length}`} className="md-quote">
          {renderInline(body.join(' '), `q${blocks.length}`)}
        </blockquote>
      );
      continue;
    }

    // ── Task list ──
    if (/^\s*-\s+\[[ xX]\]\s+/.test(line)) {
      flushParagraph(paragraph);
      const items = [];
      while (index < lines.length && /^\s*-\s+\[[ xX]\]\s+/.test(lines[index])) {
        items.push(lines[index].trim());
        index += 1;
      }
      blocks.push(
        <ul key={`task-${blocks.length}`} className="md-list md-list-tasks">
          {items.map((item, i) => renderTaskItem(item, `t${blocks.length}-${i}`))}
        </ul>
      );
      continue;
    }

    // ── Bullet list ──
    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph(paragraph);
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="md-list">
          {items.map((item, i) => (
            <li key={`li${blocks.length}-${i}`} className="md-li">
              {renderInline(item, `ul${blocks.length}-${i}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list ──
    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph(paragraph);
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="md-list md-list-ol">
          {items.map((item, i) => (
            <li key={`oli${blocks.length}-${i}`} className="md-li">
              {renderInline(item, `ol${blocks.length}-${i}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Paragraph ──
    paragraph.push(line.trim());
    index += 1;
  }

  flushParagraph(paragraph);
  return blocks;
}

/** Convenience wrapper: a keyed Fragment of the parsed blocks. */
export function renderMarkdown(source, options) {
  return <Fragment>{parseMarkdown(source, options)}</Fragment>;
}