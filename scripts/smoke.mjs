/**
 * Smoke test for the terminal parser and the data layer's honesty rules.
 * Run with: node scripts/smoke.mjs
 *
 * Not a substitute for a test runner — this project has none. It exists
 * because the Register terminal and the "never invent data" rule are both
 * load-bearing, and both are easy to break silently.
 */

import { tokenize, parseArgs, parseRegisterCommand, runCommand } from '../src/lib/cli.js';

let failures = 0;
const check = (label, actual, expected) => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  if (!pass) {
    failures += 1;
    console.log(`  FAIL ${label}`);
    console.log(`       expected ${JSON.stringify(expected)}`);
    console.log(`       actual   ${JSON.stringify(actual)}`);
  } else {
    console.log(`  ok   ${label}`);
  }
};

console.log('\ntokenize');
check(
  'quoted value collapses to one token',
  tokenize('register --team "chai squad" --size 4'),
  ['register', '--team', 'chai squad', '--size', '4']
);
check('single quotes work', tokenize("register --team 'chai squad'"), [
  'register', '--team', 'chai squad',
]);
check('escaped space', tokenize('register --team chai\\ squad'), ['register', '--team', 'chai squad']);
check('empty input', tokenize('   '), []);

console.log('\nparseArgs');
check('space-separated flag', parseArgs(['--team', 'chai', '--size', '4']).flags, { team: 'chai', size: '4' });
check('inline value', parseArgs(['--size=4']).flags, { size: '4' });
check('short flag', parseArgs(['-s', '3']).flags, { s: '3' });
check('positional', parseArgs(['git', 'blame', 'chai']).positional, ['git', 'blame', 'chai']);
check('bare flag', parseArgs(['--open']).flags, { open: true });

console.log('\nparseRegisterCommand');
const happy = parseRegisterCommand('hackwithindia register --team "chai squad" --size 4');
check('parses the canonical command', happy.ok, true);
check('team name captured', happy.form.team, 'chai squad');
check('size captured', happy.form.size, '4');

check('alias --name', parseRegisterCommand('register --name x --members 2').ok, true);
check('no prefix needed', parseRegisterCommand('register --team x --size 2').ok, true);
check('missing team rejected', parseRegisterCommand('register --size 4').ok, false);
check('non-numeric size rejected', parseRegisterCommand('register --team x --size four').ok, false);
check('empty team rejected', parseRegisterCommand('register --team "" --size 2').ok, false);

console.log('\nrunCommand');
const ctx = { helpLines: ['help'], statusLines: ['closed'], whoamiLines: ['rules'], branchLines: ['main'] };
check('register returns a form', runCommand('register --team "x y" --size 2', ctx).form.team, 'x y');
check('clear action', runCommand('clear', ctx).action, 'clear');
check('unknown command errors', runCommand('hackwithindia wat', ctx).lines[0].tone, 'error');
check('sudo win is an egg, no code', JSON.stringify(runCommand('sudo win', ctx).lines).includes('Nice try'), true);
check('sudo win reveals no code', JSON.stringify(runCommand('sudo win', ctx).lines).includes('HWIN'), false);
check('git blame chai works', runCommand('git blame chai', ctx).lines.length > 0, true);

/* ─────────────────────────────────────────────────────────────────
   HONESTY CHECKS
   Any number, date or URL that looks fabricated must be flagged. This is
   the rule that is easiest to violate by accident during a content edit.
   ───────────────────────────────────────────────────────────────── */
console.log('\ndata honesty');

const { contributors } = await import('../src/data/team.js');
const { sponsors } = await import('../src/data/sponsors.js');
const { faqs } = await import('../src/data/faqs.js');
const { pullRequests } = await import('../src/data/clubEvents.js');
const { speakers, hackathon } = await import('../src/data/aboutEvents.js');
const { branches } = await import('../src/data/domains.js');
const { activeSocials } = await import('../src/data/socials.js');

check('no invented team members', contributors.length, 0);
check('no invented sponsors', sponsors.length, 0);
check('no invented FAQs', faqs.length, 0);
check('no announced speakers', speakers.length, 0);
check('no invented tracks', hackathon.tracks.length, 0);
check('no invented prizes', hackathon.prizes.length, 0);
check('no invented rules', hackathon.rules.length, 0);
check('hackathon has no date', hackathon.startDate, null);
check('hackathon has no venue', hackathon.venue, null);
check('no domain leads', branches.every((b) => b.lead === null), true);
check('no social handles resolve yet', activeSocials.length, 0);
check('exactly two events', pullRequests.length, 2);
// `status` is the git state ('open'); `statusLabel` is what a visitor reads.
check('both PRs are open', pullRequests.every((pr) => pr.status === 'open'), true);
check('both labelled Upcoming', pullRequests.every((pr) => pr.statusLabel === 'Upcoming'), true);
check('both undated', pullRequests.every((pr) => pr.date === null), true);
check('registration closed on both', pullRequests.every((pr) => pr.registrationOpen === false), true);

console.log(failures ? `\n${failures} failing\n` : '\nall passing\n');
process.exit(failures ? 1 : 0);