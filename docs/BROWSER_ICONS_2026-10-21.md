# Studio14 browser icons — 21 October 2026

The site previously had no browser icon files or icon metadata. It now uses the existing Studio14 colour symbol, centred on its dark brand background, through Next.js file conventions: `src/app/icon.svg`, `src/app/favicon.ico` (16/32/48px) and `src/app/apple-icon.png` (180px). No client code or dependency was added. Source and rights notes are recorded in `ASSET_PROVENANCE.md`.

Validation passed using Node 26.7.0: lint, typecheck, four unit tests, `pnpm build --webpack`, nine browser journeys, three axe scans, link/header/secret checks and `git diff --check`. The documented Webpack artifact-budget overrun remains: JavaScript gzip 279,552 B and total raw artifact 2,349,505 B; no budget was changed.

Chromium and WebKit verified the actual static export at 390 and 1440px with JavaScript disabled: all three generated icon links are present, their assets return HTTP 200, SVG/PNG images decode, the Apple icon declares 180×180px, and the ICO contains 16/32/48px entries. Actual-size icon previews on light and dark backgrounds are saved in ignored `artifacts/browser-icons/`, including `webkit-390.png`, `webkit-1440.png` and `results.json`. These previews show the icon artwork at tab sizes rather than a screenshot of browser chrome. No deployed-site or physical iPhone verification is claimed.
