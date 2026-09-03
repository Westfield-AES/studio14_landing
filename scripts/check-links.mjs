import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(target);
      return entry.name.endsWith(".html") ? [target] : [];
    }),
  );
  return nested.flat();
}

const pages = await htmlFiles(outputDirectory);
const knownPaths = new Set(
  pages.map((file) => {
    const relative = path.relative(outputDirectory, file);
    return relative === "index.html" ? "/" : `/${relative.replace(/\/index\.html$/, "")}`;
  }),
);
const failures = [];

for (const page of pages) {
  const html = await readFile(page, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith("#") && !ids.has(href.slice(1))) {
      failures.push(`${path.basename(page)} has missing anchor ${href}`);
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const route = href.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
      if (!knownPaths.has(route) && !route.includes(".")) {
        failures.push(`${path.basename(page)} has missing route ${route}`);
      }
    }
  }
}

if (failures.length > 0) throw new Error(failures.join("\n"));
console.log(`Link check passed for ${pages.length} exported HTML file(s).`);
