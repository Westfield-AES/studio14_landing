# Studio14 landing motion laboratory

This laboratory is the Phase 3 approval boundary for motion used by the public landing experience. A pattern must preserve readable static markup, keyboard access and the reduced-motion experience before it may be used on the page.

## Approved patterns

| Pattern | Implementation | Reduced-motion behaviour | Status |
|---|---|---|---|
| Section reveal | `data-reveal` plus `IntersectionObserver` | Content is made visible immediately; translation and transition are suppressed | Approved |
| Three-frame contact sheet | CSS transforms on the fixed triptych composition | Frames keep a stable, readable arrangement without animated movement | Approved |
| Hero scroll response | One passive scroll listener, coalesced through `requestAnimationFrame`, updating transform variables only | Controller does not attach the scroll response | Approved |
| Editorial marquee | CSS-only decorative loop with duplicated `aria-hidden` copy | Global reduced-motion rule collapses animation duration | Approved |

No pattern may hijack scrolling, require motion to understand content, animate customer content, or add a runtime animation dependency without a measured need and an ADR review.

## Enforced budgets

- JavaScript gzip: at most 220 KiB.
- CSS gzip: at most 40 KiB.
- Complete static artifact: at most 2 MiB.
- Approved scroll exercise: no long task may reach 250 ms.
- Reduced motion: all reveal content is immediately visible and animation duration is at most 1 ms.

Run `pnpm check`, `pnpm test:a11y` and `pnpm test:motion`. CI runs all three before the static artifact can be accepted. Promotion requires the desktop and 320px journey checks to remain readable and free of horizontal overflow.
