import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ignoredNames = new Set([
  ".git",
  ".pnpm-store",
  "cache",
  "coverage",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const patterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["live secret key", /\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub token", /\bgh[opusr]_[A-Za-z0-9_]{24,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{30,}\b/],
  ["SendGrid API key", /\bSG\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\b/],
  ["credential in URL", /https?:\/\/[^\s/:]+:[^\s/@]+@/],
  ["client-exposed secret variable", /NEXT_PUBLIC_[A-Z0-9_]*(?:PRIVATE|SECRET|TOKEN)[A-Z0-9_]*/],
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoredNames.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else if (entry.isFile()) files.push(target);
  }
  return files;
}

const failures = [];
for (const file of await walk(process.cwd())) {
  if (file.endsWith("scripts/check-secrets.mjs")) continue;
  if ((await stat(file)).size > 2 * 1024 * 1024) continue;
  const contents = await readFile(file);
  if (contents.includes(0)) continue;
  const text = contents.toString("utf8");
  for (const [label, pattern] of patterns) {
    if (pattern.test(text)) failures.push(`${path.relative(process.cwd(), file)}: ${label}`);
  }
}

if (failures.length > 0) throw new Error(`Potential secret material found:\n${failures.join("\n")}`);
console.log("Secret-pattern scan passed for source and available build artifacts.");
