import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const outDir = resolve(root, 'out');
const railsSamplePath = resolve(root, 'ops/recon/rails.sample.csv');
const eventsSamplePath = resolve(outDir, 'events.sample.json');
const reconScriptPath = resolve(root, 'ops/recon/recon.py');
const reportPath = resolve(outDir, 'recon.report.json');

mkdirSync(outDir, { recursive: true });

if (!existsSync(eventsSamplePath)) {
  console.error(
    `Missing ${relative(root, eventsSamplePath)}. Run "pnpm run demo:simulate-dvp" first.`,
  );
  process.exit(1);
}

const pythonCandidates = process.platform === 'win32'
  ? [
      ['python'],
      ['python3'],
      ['py', '-3'],
      ['py'],
    ]
  : [
      ['python3'],
      ['python'],
    ];

const pythonArgs = [reconScriptPath, railsSamplePath, eventsSamplePath];
let successResult = null;
let lastErrorMessage = null;

for (const candidate of pythonCandidates) {
  const [command, ...commandArgs] = candidate;
  const result = spawnSync(command, [...commandArgs, ...pythonArgs], {
    encoding: 'utf-8',
  });

  if (result.error) {
    lastErrorMessage = result.error.message;
    continue;
  }

  if (result.status === 0) {
    successResult = result;
    break;
  }

  lastErrorMessage =
    result.stderr?.trim() ||
    `Command "${[command, ...commandArgs].join(' ')}" exited with code ${result.status ?? 'unknown'}`;
}

if (!successResult) {
  console.error(
    `Unable to run Python recon script${
      lastErrorMessage ? `: ${lastErrorMessage}` : ''
    }`,
  );
  process.exit(1);
}

writeFileSync(reportPath, successResult.stdout);

const trimmed = successResult.stdout.trim();
if (trimmed.length > 0) {
  console.log(trimmed);
} else {
  console.log(`Recon report written to ${relative(root, reportPath)}`);
}
