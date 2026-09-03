# Studio14 Landing Repository Instructions

Scope: standalone static public Studio14 marketing site. Do not implement customer account, upload, generation, payment fulfilment or admin capability here.

At the start of every task read:

1. `../studio14/docs/implementation/PHASE_STATUS.md`.
2. The current phase in `../studio14/docs/implementation/IMPLEMENTATION_GUIDE_v1.0.md`.
3. `../studio14/docs/product/PRD_v2.0.md` sections 1–3 and 12–15.
4. `../studio14/docs/product/UI_UX_SPEC_v2.0.md` sections 1–3, 13 and 15.
5. Applicable decisions and legal/rights requirements.

Repository rules:

- Next.js TypeScript static export; the final artifact must be deployable as plain static assets.
- Original Nigeria-first/Africa-first editorial art direction. “Awwwards quality” means craft, not copying another site's code, assets, text, compositions or trade dress.
- Use only documented rights-cleared images/fonts/audio/assets. Record asset source/release.
- Ordinary copy presents a virtual photography studio; privacy/legal surfaces remain accurate about automated image-generation.
- No prompts, robot/AI clichés or unsubstantiated “perfect/indistinguishable/always cheaper” claims.
- No secrets or private API credentials. Public catalogue content must have a static fallback.
- Mobile-first semantic HTML, keyboard/focus, WCAG 2.2 AA target, reduced-motion and no-JS/readable fallbacks.
- Motion supports hierarchy and must pass the repository performance budget/Core Web Vitals checks.
- Optional analytics is consent-gated and must never receive source/result/job/account/payment content.

Use canonical project scripts from `package.json`; do not invent commands without updating the README/CI. For each change run lint, typecheck, affected tests, static build, Playwright/axe and performance/link checks proportional to the scope. Report screenshots or visual evidence at representative breakpoints.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
