# INNTW brand assets

Everything in this folder is generated from the Illustrator vector master in
`INNTW Branding/Logos/Official Logo/`. **You do not need to supply anything —
the vector already existed.**

## The mark

| File | Use |
|---|---|
| `inntw-mark.svg` | `fill="currentColor"` — the source of truth. Inherits colour from CSS. |
| `inntw-mark-black.svg` | `#000000` — paper-world sites, print, press pack |
| `inntw-mark-white.svg` | `#FFFFFF` — on cobalt, on photography, on black |
| `inntw-mark-cobalt.svg` | `#024FDA` — on paper or cream grounds only |
| `inntw-mark-brown.svg` | `#85431E` — accent brown, guidelines-sanctioned |

All five are the same geometry: one compound path, `fill-rule="evenodd"`,
`viewBox="0 0 652.73 652.73"`. The artwork is square.

### Where it came from

The build prompt said a PNG was all that existed and asked for an SVG to be
dropped in. That turned out not to be the case — `INNTW - Official Logo -
WHITE-svg.svg` in the branding folder is a true vector export from the
Illustrator master. These files were generated from it by:

1. Taking the 13 `<path>` elements (the artwork).
2. Discarding the stray `<line>` element, an inert Illustrator export
   artifact with `fill` and no `stroke` — it renders nothing.
3. Merging the subpaths into one compound path with `fill-rule="evenodd"`,
   which preserves the counter of the **O** and the crossbar gaps.

Renders were compared against the original at 700px; they are identical.

**To regenerate** after a new export from Illustrator, re-run the generator
documented in the root `README.md` under "Regenerating the mark".

### React

Prefer the component over the files — it inlines the path, inherits
`currentColor`, and carries the accessible name:

```tsx
import { Mark } from "@inntw/brand";

<Mark size="clamp(240px, 42vw, 520px)" />        // named for assistive tech
<Mark size="34px" decorative />                   // adjacent text already names it
```

Each app also copies the static files into its own `public/` at install time
so `/inntw-mark-black.svg` resolves for JSON-LD, OG images and downloads.

## A note on the palette

The build prompt specified `muted #767674`. Against the paper ground
`#FAFAF8` that measures **4.31:1**, which fails WCAG AA (4.5:1) for text
below 24px — and muted is used for captions and meta at 14px.

The token ships as **`#6E6E6C`** (**4.84:1**) instead. The difference is
imperceptible side by side; the compliance difference is not. Every other
value in the prompt is used exactly as specified.

Raw value lives at `--brand-muted` in `src/tokens.css`.

## Fonts

Nothing to add here. `Archivo` and `Newsreader` are pulled by `next/font/google`
and self-hosted at build time. Helvetica Neue — used on `project` and `now` to
match the invite — is a system face and is never bundled.

`@fontsource/archivo` is a dependency purely so the OG image generator has a
real font file to hand to Satori.

## What is deliberately not here

Product photography, founder portrait, and the press asset pack ZIP. Those are
per-app and live in each app's `public/` — see `apps/press/public/README.md`.
