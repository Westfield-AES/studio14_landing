# Studio14 Landing

Static, independently deployable marketing site for Studio14. The visual foundation follows the approved “Contact Sheet” direction and contains no authenticated product logic.

## Requirements

- Node.js 24.10.0
- pnpm 10.34.5

## Local development

```text
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Quality commands

```text
pnpm check
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:a11y
pnpm test:motion
```

`pnpm check` also verifies exported links, the explicit compressed-JavaScript/CSS and total-artifact performance budgets, the static-host security-header contract, and common secret formats. `pnpm build` writes the deployable static site to `out/`.

`MOTION_LAB.md` records the approved motion patterns, reduced-motion contract and executable interaction-performance budget. Studio calls to action derive the `/studio` catalogue route from `NEXT_PUBLIC_STUDIO_APP_URL`.

## Deployment contract

- Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_STUDIO_APP_URL` to approved HTTPS production origins. The committed `.example` hosts are intentional non-production placeholders.
- Publish only `out/` to the static host/CDN.
- Configure the host to consume `public/_headers` or apply an equivalent header set. The build fails if the contract loses a required control, but the hosting preview must still prove the headers are actually served.
- `robots.txt` and `sitemap.xml` are generated through Next metadata files using `NEXT_PUBLIC_SITE_URL`.
- System font stacks are intentional: they avoid a third-party font request, consent ambiguity and render-blocking dependency in the public shell.

Keep this repository free of sessions, private API calls, uploaded media, and product account state. See `OWNERS.md`, `CONTRIBUTING.md` and `SECURITY.md` before opening the repository to collaborators.
