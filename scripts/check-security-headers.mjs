import { readFile } from "node:fs/promises";

const contract = await readFile("public/_headers", "utf8");
const required = [
  "Content-Security-Policy:",
  "frame-ancestors 'none'",
  "Permissions-Policy:",
  "Referrer-Policy:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
];
const missing = required.filter((header) => !contract.includes(header));

if (missing.length > 0) throw new Error(`Missing static-host header contract: ${missing.join(", ")}`);
console.log("Static-host security header contract passed.");
