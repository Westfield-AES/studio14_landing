# iOS arrow rendering — 21 October 2026

The supplied iPhone screenshots show the Unicode northeast arrow rendered as an Apple colour emoji with a blue square background in the header, primary action and collection cards.

All navigation arrows now use the original inline SVG component in `src/components/arrow-icon.tsx`, including the secondary downward arrow. Fixed 18px dimensions prevent flex shrinking, and `currentColor` follows each link's normal and hover colours. The SVGs are hidden from assistive technology and cannot receive focus. Existing link labels, destinations, card circles, motion and reduced-motion handling remain in place. The component renders into the static export without browser JavaScript or font dependencies. Its source is recorded in `ASSET_PROVENANCE.md`.

## Visual evidence

Generated evidence is saved locally under `artifacts/ios-arrows/` (ignored). Chromium and WebKit 26.5 each passed checks at 320, 390, 430 and 1440px with JavaScript disabled: all ten SVG arrows have path geometry, inherit the surrounding colour, remain non-focusable, measure 18×18px when visible, and introduce no horizontal overflow. Desktop card hover colours also pass. These are browser-engine checks, not a physical iPhone test.

- Phone hero: `webkit-390-hero.png`.
- Phone collection: `webkit-390-collection.png`.
- Desktop hero: `webkit-1440-hero.png`.
- Both engines and every width: `results.json`; sixteen screenshots total. The local evidence script is `verify.mjs`.

## Validation

Passed using installed Node 26.7.0:

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (4 tests).
- `pnpm build --webpack` (plain static assets in `out/`). This uses the documented fallback for the environment's previously recorded Turbopack worker restriction.
- `PLAYWRIGHT_PORT=3001 pnpm test:e2e` (9 journeys).
- `PLAYWRIGHT_PORT=3001 pnpm test:a11y` (3 axe scans).
- `PLAYWRIGHT_PORT=3001 pnpm test:motion` (3 checks).
- `pnpm check:links`, `pnpm check:headers`, `pnpm check:secrets`, and `git diff --check`.

Browser checks ran against the actual static export served on localhost. `pnpm check:performance` continues to fail the pre-existing Webpack artifact budget documented in `MOBILE_REFINEMENT_2026-10-21.md`: JavaScript gzip remains exactly 279,538 B (budget 225,280 B); total raw artifact is 2,329,885 B (budget 2,097,152 B). No runtime JavaScript or dependency was added, and no budget was changed. No deployment or phase/launch acceptance is claimed.
