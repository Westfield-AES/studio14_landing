# Studio14 landing asset provenance

Status: development-preview register  
Last updated: 21 October 2026

The three assets below are original synthetic concept images created for this Studio14 landing-page redesign. No customer photograph, scraped moodboard image, external photographer work, logo or supplied likeness was used as an input. The depicted people are synthetic adults and are not presented as customers or endorsements.

These records cover the development preview. Product/legal owners must include them in the final marketing-rights review before production publication, alongside the complete launch checklist.

| Asset | SHA-256 | Creator/source | People shown | Intended use and permitted edits | Attribution/term | Review state |
|---|---|---|---|---|---|---|
| `public/images/studio14-signature-triptych.webp` | `ed234b245a7026b3fd2c6df5797c82350596e2712c99b8d2f3d3b458cc0fa0fa` | OpenAI built-in image generation, commissioned in this repository on 2026-08-15; no reference image | One synthetic adult, repeated across three generated frames | Studio14 landing development preview; responsive crops, colour-preserving compression and layout treatment allowed | No attribution requested; review again before public launch | Development preview approved by product request; production legal/rights review open |
| `public/images/studio14-after-hours.webp` | `72ad305bf4007a3002731fc5581a5e33ff60598c7c112c8a675138eecf028bbe` | OpenAI built-in image generation, commissioned in this repository on 2026-08-15; no reference image | One synthetic adult | Studio14 landing development preview; responsive crops, colour-preserving compression and layout treatment allowed | No attribution requested; review again before public launch | Development preview approved by product request; production legal/rights review open |
| `public/images/studio14-in-full-colour.webp` | `77dd7bfcd9e2386942ff26e2581c54dd04eadf88fd8516acec6512879fe36f28` | OpenAI built-in image generation, commissioned in this repository on 2026-08-15; no reference image | One synthetic adult | Studio14 landing development preview; responsive crops, colour-preserving compression and layout treatment allowed | No attribution requested; review again before public launch | Development preview approved by product request; production legal/rights review open |

## Navigation icons

The inline navigation arrows in `src/components/arrow-icon.tsx` are original SVG path geometry authored in this repository on 21 October 2026. They use no third-party icon library, font, image or reference asset and are maintained as project source code.

## Browser and Apple icons

`src/app/icon.svg`, `src/app/favicon.ico` (16, 32 and 48px) and `src/app/apple-icon.png` (180px) derive from the existing, user-supplied `public/Studio14-logo-asset-pack/studio14-symbol-colour.svg`. Its original paths and colours are preserved, centred on a square dark Studio14 background (`#0D061F`). The SVG is rasterised with the already-installed Sharp library for PNG and ICO variants; no new font, artwork, external source or runtime dependency is introduced. Next.js file-based metadata supplies the icon links in the static export.

The owner's request authorises use of the supplied Studio14 brand asset for this site's browser and bookmark icons. The source/reconstruction notes and underlying-rights qualifications in `public/Studio14-logo-asset-pack/README.txt` continue to apply; this entry does not claim an independent rights clearance or designer release.

## Generation prompts

### Signature triptych

```text
Use case: photorealistic-natural
Asset type: Studio14 landing page hero triptych
Primary request: Create one high-fashion studio photography contact sheet containing exactly three distinct vertical portrait frames of the same adult Black woman from the same luxury editorial shoot. She should look confident, magnetic, contemporary and approachable.
Scene/backdrop: controlled seamless studio sets using deep aubergine, soft stone and electric cobalt backdrops, one backdrop per frame.
Subject: the same adult model in every frame, consistent facial identity, short sculptural natural hair, wearing the same elegant black tailored suit with subtle satin texture and minimal jewellery. Frame one is a composed three-quarter standing pose, frame two is a close portrait with direct gaze, frame three is a dynamic seated or leaning pose with hands naturally visible.
Style/medium: photorealistic premium fashion and portrait photography, modern international editorial campaign, realistic skin texture, tasteful retouching, medium-format camera character.
Composition/framing: wide landscape canvas divided into exactly three clean edge-to-edge vertical photographic panels, no gutters and no graphic borders; keep the subject clearly readable within each third so the website can crop the panels responsively.
Lighting/mood: sculpted studio flash, clean highlights, rich blacks, sophisticated, celebratory, energetic.
Color palette: aubergine, black, soft stone, cobalt, with restrained hints of cyan and warm gold.
Constraints: same adult person and same outfit in all three panels; professional studio portrait only; realistic anatomy and hands; no text; no numbers; no UI; no logo; no watermark.
Avoid: collage stickers, film sprockets, camera interface, duplicated limbs, extra fingers, plastic skin, sci-fi styling, neon cyberpunk, national symbols, flags, ethnic-pattern clichés.
```

### After Hours

```text
Use case: photorealistic-natural
Asset type: Studio14 landing page collection portrait
Primary request: a magnetic high-end studio portrait for a collection called After Hours.
Scene/backdrop: deep oxblood seamless studio background with a subtle pool of warm amber light.
Subject: stylish adult Black man with close-cropped hair, wearing a sharply tailored dark burgundy velvet dinner jacket over a black shirt, relaxed confident expression, one hand naturally adjusting the cuff.
Style/medium: photorealistic luxury editorial portrait photography, refined international fashion campaign, realistic skin and fabric texture, medium-format camera character.
Composition/framing: vertical fashion portrait, knees-up, slight low angle, subject fills the frame while leaving modest breathing room around the head.
Lighting/mood: crisp direct studio flash balanced with sculpted side light, after-dark energy, cinematic but believable.
Color palette: oxblood, black, amber, subtle violet shadows.
Constraints: adult subject; realistic anatomy and hands; no text; no logo; no watermark.
Avoid: national symbols, cultural costume, ethnic-pattern clichés, neon cyberpunk, plastic skin, extra fingers, excessive jewellery.
```

### In Full Colour

```text
Use case: photorealistic-natural
Asset type: Studio14 landing page collection portrait
Primary request: a joyful high-end studio portrait for a collection called In Full Colour.
Scene/backdrop: clean warm coral seamless studio with a large soft cyan light shape falling across one edge.
Subject: stylish adult South Asian woman with shoulder-length textured dark hair, wearing a sculptural electric-violet dress with elegant modern tailoring, laughing naturally while turning toward camera.
Style/medium: photorealistic premium fashion and portrait photography, sophisticated global editorial campaign, realistic skin texture and fabric detail, medium-format camera character.
Composition/framing: vertical three-quarter portrait with dynamic movement in the fabric, subject fully readable and cleanly separated from backdrop.
Lighting/mood: bright studio flash, warm, exuberant, celebratory, polished without looking artificial.
Color palette: coral, electric violet, cyan accent, warm natural skin tones.
Constraints: adult subject; realistic anatomy and hands; no text; no logo; no watermark.
Avoid: national symbols, cultural costume, ethnic-pattern clichés, fantasy styling, plastic skin, extra fingers, confetti, props.
```
