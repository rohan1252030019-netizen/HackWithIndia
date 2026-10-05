/**
 * A small, forgiving shell-command parser.
 *
 * Powers the Register stop. It exists so the terminal is genuinely
 * interactive rather than a video of a terminal: whatever the visitor
 * types is parsed, validated and reflected in the form behind it.
 *
 * DELIBERATELY SMALL SCOPE. It handles flags, quoted values and a couple
 * of aliases. It is not a shell, it does not expand anything, and it
 * never evaluates input.
 *
 * ── WHAT IT PARSES ───────────────────────────────────────────────
 *   hackwithindia register --team "chai squad" --size 4
 *   hackwithindia register --name 'chai squad' --members 4
 *   register --team="chai squad" --size=4
 *   hackwithindia status
 *   git blame chai
 *
 * Aliases, so people do not get stuck:
 *   --team | --name  → team
 *   --size | --members | -s → size
 *   --email | -e     → email
 */

/**
 * Splits a command line into tokens, honouring single and double quotes
 * and backslash escapes. Written as a character walk rather than a regex
 * because `"(a) (b)"` must stay one token.
 */
export function tokenize(input) {
  const tokens = [];
  let current = '';
  let quote = null;
  let escaped = false;

  for (const char of input.trim()) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      if (current) tokens.push(current);
      current = '';
      continue;
    }
    current += char;
  }

  if (current) tokens.push(current);
  return tokens;
}

/**
 * Turns tokens into { name, args, flags, positional }.
 *
 * `--size 4`      → flags.size = '4'
 * `--size=4`      → flags.size = '4'
 * `-s 4`          → flags.s = '4'
 * `git blame chai`→ positional = ['git', 'blame', 'chai']
 */
export function parseArgs(tokens) {
  const positional = [];
  const flags = {};

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token.startsWith('--')) {
      const [rawKey, inlineValue] = splitOnce(token.slice(2), '=');
      if (inlineValue !== undefined) {
        flags[rawKey] = inlineValue;
      } else if (tokens[i + 1] !== undefined && !tokens[i + 1].startsWith('-')) {
        flags[rawKey] = tokens[i + 1];
        i += 1;
      } else {
        flags[rawKey] = true;
      }
      continue;
    }

    if (token.startsWith('-') && token.length > 1) {
      const [rawKey, inlineValue] = splitOnce(token.slice(1), '=');
      if (inlineValue !== undefined) flags[rawKey] = inlineValue;
      else if (tokens[i + 1] !== undefined && !tokens[i + 1].startsWith('-')) {
        flags[rawKey] = tokens[i + 1];
        i += 1;
      } else flags[rawKey] = true;
      continue;
    }

    positional.push(token);
  }

  return { positional, flags };
}

function splitOnce(value, separator) {
  const index = value.indexOf(separator);
  if (index === -1) return [value, undefined];
  return [value.slice(0, index), value.slice(index + 1)];
}

/** Aliases, kept in one place so the parser stays readable. */
const ALIASES = {
  team: ['team', 'name', 't'],
  size: ['size', 'members', 's'],
  email: ['email', 'e'],
};

/** Reads an aliased flag, returning the first one that is present. */
export function readFlag(flags, key) {
  const names = ALIASES[key] ?? [key];
  for (const name of names) {
    const value = flags[name];
    if (value !== undefined && value !== true) return String(value);
  }
  return null;
}

/**
 * Parses `hackwithindia register --team "x" --size 4` into a form shape.
 *
 * Returns `{ ok, form, errors }`. `ok` is true only when the command was
 * recognised AND both required fields parsed. Validation messages are
 * written to be read on a 360px screen.
 */
export function parseRegisterCommand(input) {
  const tokens = tokenize(input);
  if (!tokens.length) return { ok: false, form: {}, errors: [] };

  // Accept the command with or without the `hackwithindia` prefix.
  let args = tokens;
  if (args[0] === 'hackwithindia') args = args.slice(1);
  if (args[0] !== 'register') return { ok: false, form: {}, errors: [] };

  const { flags } = parseArgs(args.slice(1));

  const form = {
    team: readFlag(flags, 'team') ?? '',
    size: readFlag(flags, 'size') ?? '',
    email: readFlag(flags, 'email') ?? '',
  };

  const errors = [];
  if (!form.team) errors.push('--team "<name>" is required');
  if (!form.size) errors.push('--size <n> is required');
  else if (!/^\d+$/.test(form.size)) errors.push(`--size must be a number, got "${form.size}"`);

  return { ok: errors.length === 0, form, errors };
}

/**
 * Full dispatch for the terminal.
 *
 * Every branch returns `{ lines, form?, action? }` where `lines` are
 * already-coloured strings (`tone` maps to a CSS class in the component).
 * Keeping the formatting here means the component stays presentational.
 */
export function runCommand(rawInput, context = {}) {
  const input = rawInput.trim();
  if (!input) return { lines: [] };

  const tokens = tokenize(input);

  // Easter eggs first — they are commands too.
  const egg = matchEasterEgg(input);
  if (egg) return egg(context);

  // Bare `hackwithindia` or `help`.
  const bare = tokens.length === 0 || (tokens.length === 1 && tokens[0] === 'hackwithindia');
  if (bare || input === 'help') return { lines: context.helpLines ?? [] };

  if (input === 'clear') return { lines: [], action: 'clear' };

  const normalised = tokens[0] === 'hackwithindia' ? tokens.slice(1) : tokens;
  const command = normalised[0];

  switch (command) {
    case '--help':
    case '-h':
      return { lines: context.helpLines ?? [] };

    case 'register': {
      const parsed = parseRegisterCommand(input);
      if (!parsed.ok) {
        return {
          lines: [
            { text: parsed.errors[0] ?? 'could not parse that command', tone: 'error' },
            { text: 'usage: hackwithindia register --team "<name>" --size <n>', tone: 'dim' },
          ],
        };
      }
      return {
        lines: [
          { text: 'parsed --team ' + JSON.stringify(parsed.form.team), tone: 'ok' },
          { text: 'parsed --size ' + parsed.form.size, tone: 'ok' },
        ],
        form: parsed.form,
        action: 'register',
      };
    }

    case 'status':
      return {
        lines: (context.statusLines ?? []).map((line) => ({ text: line, tone: 'dim' })),
      };

    case 'whoami':
      return {
        lines: (context.whoamiLines ?? []).map((line) => ({ text: line, tone: 'dim' })),
      };

    case 'branches':
      return {
        lines: (context.branchLines ?? []).map((line) => ({ text: line, tone: 'dim' })),
      };

    case 'apply':
      return {
        lines: [{ text: 'opening the apply stop…', tone: 'ok' }],
        action: 'scroll:apply',
      };

    default:
      return {
        lines: [
          { text: `hackwithindia: unknown command '${command}'`, tone: 'error' },
          { text: 'run `hackwithindia --help` to see what exists', tone: 'dim' },
        ],
      };
  }
}

/**
 * Easter eggs.
 *
 * `sudo win` reveals NO discount code. We do not have offers, so the joke
 * is that there is nothing to win — which is funnier and, unlike a fake
 * code, does not put a lie in front of visitors.
 */
function matchEasterEgg(input) {
  const normalised = input.trim().toLowerCase();

  if (normalised === 'sudo win' || normalised === 'sudo su') {
    return (context) => {
      context.onConfetti?.();
      return {
        lines: [
          { text: 'sudo: 1 incorrect password attempt', tone: 'dim' },
          { text: 'Nice try. Register for real :)', tone: 'ok' },
          { text: 'no cheat codes. we are a student club, not a scam.', tone: 'dim' },
        ],
        action: 'easter-egg',
      };
    };
  }

  if (normalised === 'git blame chai') {
    return () => ({
      lines: [
        { text: 'c0ffee00  (Nobody  1970-01-01) chai.run();', tone: 'dim' },
        { text: 'c0ffee00  (Nobody  1970-01-01) // blame this and you find nobody', tone: 'dim' },
        { text: '', tone: 'dim' },
        { text: 'The club has not made any chai yet. That is the honest log.', tone: 'ok' },
      ],
      action: 'easter-egg',
    });
  }

  return null;
}