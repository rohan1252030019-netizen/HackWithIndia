import { renderMarkdown } from '../../lib/markdown.jsx';
import { cn } from '../../lib/cn.js';

/**
 * Renders a markdown string as React elements.
 *
 * The component is deliberately thin — all parsing lives in
 * lib/markdown.jsx. Note there is NO dangerouslySetInnerHTML anywhere in
 * this path: the parser produces elements, so raw HTML in a data file can
 * never execute.
 */
export function Markdown({ source, className, startHeadingLevel = 2 }) {
  if (!source) return null;

  return (
    <div className={cn('markdown', className)}>{renderMarkdown(source, { startHeadingLevel })}</div>
  );
}

export default Markdown;