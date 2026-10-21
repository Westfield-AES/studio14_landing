# Mobile landing refinement — 21 October 2026

The owner requested a quieter mobile page, corrected portrait framing, and removal of the decorative “Yours” panel on mobile, with desktop unchanged.

All presentation changes are inside the existing `max-width: 620px` media query in `src/app/globals.css`. Existing photographs, marketing text, desktop styles, catalogue destinations and product behaviour are unchanged. No assets were created or modified; the existing asset register continues to apply.

## Result

- Three aligned, static hero portraits replace the overlapping phone composition. The main action stays prominent.
- Mobile hides the marquee, repeated shoot-reveal section, section numbers, secondary hero link, repeated introductory copy, step illustrations, “Yours” artwork and closing decorations.
- Collection portraits anchor to the top, preserving faces and hair. The Signature shows exactly its first image panel without part of the neighbouring portrait.
- Smaller headings and section gaps, compact process rows, shorter pricing cards, and a compact footer reduce scrolling. All three collections, privacy and retention information, pricing details, native FAQ disclosures and the automated-generation disclosure remain available.
- Phone header/home/footer links have at least 44px-high targets. Existing focus styles, reduced-motion handling and no-JavaScript readability remain available.

## Visual evidence

Screenshots and machine-readable measurements are saved locally in `artifacts/mobile-refinement/` (ignored generated evidence). `before-*.png` uses the original phone CSS from `HEAD`; `after-*.png` uses the revised CSS. Both use the same rendered page, image decoding, reduced-motion setting and browser viewport. The source outside that media query was also checked for exact equality with `HEAD`.

| Width | Original height | Revised height | Reduction | Before/after pixels identical |
|---|---:|---:|---:|---|
| 320px | 11,419px | 7,183px | 37.1% | Mobile changed |
| 390px | 11,751px | 7,310px | 37.8% | Mobile changed |
| 430px | 12,043px | 7,529px | 37.5% | Mobile changed |
| 620px | 13,147px | 8,142px | 38.1% | Mobile changed |
| 621px | 10,344px | 10,344px | 0% | Yes |
| 900px | 10,978px | 10,978px | 0% | Yes |
| 1440px | 9,212px | 9,212px | 0% | Yes |

Representative details: `mobile-hero.png`, `mobile-collection-grid.png`, `mobile-process.png`, `mobile-privacy.png`, and `mobile-pricing.png`. No horizontal overflow was observed at any checked width.

## Validation

Passed:

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (4 unit tests).
- `PLAYWRIGHT_PORT=3001 pnpm test:e2e` (9 journeys including phone geometry at four widths, no-JavaScript keyboard FAQ operation, catalogue links and desktop preservation).
- `PLAYWRIGHT_PORT=3001 pnpm test:a11y` (3 axe checks at 320, 430 and 1440px).
- `PLAYWRIGHT_PORT=3001 pnpm test:motion` (3 checks including desktop and phone scroll responsiveness).
- `pnpm build --webpack` produces a plain-static export in `out/`.
- `pnpm check:links`, `pnpm check:headers`, `pnpm check:secrets`.

Open validation limitations:

- `pnpm check` cannot complete its default Turbopack build in this execution environment: the PostCSS compiler worker receives `Operation not permitted` while binding a local port. Retrying with escalation and the installed Node 26 version produced the same error. The default shell has Node 22, below the repository's declared Node >=24.10 requirement.
- The successful Webpack fallback fails the existing performance budget: JavaScript gzip 279,538 B against 225,280 B, and total artifact 2,314,004 B against 2,097,152 B. An isolated, unchanged `HEAD` checkout built with the same Webpack command also fails: JavaScript gzip 280,297 B and total artifact 2,306,712 B. This establishes that the fallback budget failure predates the mobile changes. No budget was relaxed, no dependency was added, and no runtime JavaScript was changed.

The Playwright port override is documented in the README because another project already uses port 3000; Studio14's preview uses port 3001. No deployment or phase/launch acceptance is claimed.

## Follow-up — restore the curved mobile hero

The owner subsequently requested that the three hero portraits retain the desktop's curved, overlapping composition and animations on mobile. This supersedes the aligned, static hero treatment recorded above. The other mobile refinements remain in place.

The phone stage now scales with its width, raises the centre frame, tilts the outside frames and preserves the existing staggered entrance and passive scroll response. Mobile frames use 36% width with a thin border and shadow. No image, asset rights, copy, dependency or runtime JavaScript changed. Reduced motion explicitly disables frame entrance animations while retaining the static curved arrangement, including without JavaScript.

The existing mobile smoke assertions now check that the centre frame is raised and the portraits fit the viewport. The motion journeys additionally verify that the actual frame transforms respond to scrolling on both phone and desktop.

Validation passed: lint, typecheck, four unit tests, the Webpack static build, nine browser journeys, three axe scans, three motion/performance journeys, exported links, headers and secret checks. An initial standalone typecheck raced the build's regeneration of `.next/types`; rerunning after generation passed. The existing artifact-budget failure remains: JavaScript gzip 279,538 B (unchanged), total artifact 2,329,902 B. No budget was relaxed.

Visual and geometry evidence is in ignored `artifacts/mobile-hero/`: Chromium and WebKit each passed entrance animation, scroll-transform, reduced-motion and overflow checks at 320, 390, 430, 620 and 1440px. Screenshots include `webkit-390-hero.png`, `webkit-430-hero.png`, `webkit-1440-hero.png` and no-JavaScript variants; measurements are in `results.json`. These are browser-engine checks rather than a physical iPhone test. Earlier page-height and before/after equality measurements above describe the initial refinement, not this follow-up.
