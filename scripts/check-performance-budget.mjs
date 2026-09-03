import { readdir, readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const outputDirectory = path.resolve("out");
const budgets = {
  javascriptGzip: 220 * 1024,
  cssGzip: 40 * 1024,
  totalRaw: 2 * 1024 * 1024,
};

async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? filesWithin(target) : [target];
    }),
  );
  return nested.flat();
}

try {
  await stat(outputDirectory);
} catch {
  throw new Error("Missing out/. Run the production build before the performance check.");
}

const files = await filesWithin(outputDirectory);
let totalRaw = 0;
let javascriptGzip = 0;
let cssGzip = 0;

for (const file of files) {
  const contents = await readFile(file);
  totalRaw += contents.byteLength;
  if (file.endsWith(".js")) javascriptGzip += gzipSync(contents).byteLength;
  if (file.endsWith(".css")) cssGzip += gzipSync(contents).byteLength;
}

const failures = [
  ["JavaScript gzip", javascriptGzip, budgets.javascriptGzip],
  ["CSS gzip", cssGzip, budgets.cssGzip],
  ["total raw artifact", totalRaw, budgets.totalRaw],
].filter(([, actual, budget]) => actual > budget);

if (failures.length > 0) {
  const details = failures
    .map(([label, actual, budget]) => `${label}: ${actual} bytes > ${budget} bytes`)
    .join("; ");
  throw new Error(`Landing performance budget exceeded: ${details}`);
}

console.log(
  `Performance budget passed: JS gzip ${javascriptGzip} B, CSS gzip ${cssGzip} B, artifact ${totalRaw} B.`,
);
