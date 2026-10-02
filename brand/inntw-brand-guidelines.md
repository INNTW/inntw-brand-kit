# INNTW — brand guidelines

What this is: the INNTW mark, colour, worlds, type, surface, motion and voice, read out of the shipped code.
Source of truth: `inntw-brand-kit/src/tokens.css` (`@inntw/brand`, `github:INNTW/inntw-brand-kit#main`). Words: `INNTW-Brain/canon/04-voice.md`. Designed version: `inntw-brand-guidelines.html` beside this file.

Where an older reference (the 2026 *INNTW Brand Guidelines.pdf*) disagrees with the code, the code wins. Disagreements are flagged below.

## 1 The mark

The mark is a **drawn asset**, not type. Eleven brush-drawn letterforms carry all sixteen letters of the phrase: six read once, five read twice (the N and O of the first row, the H, E and N of the second). The shared columns hold a T over a W, so it reads *if not / then* and *if now / when* at once. One compound path, 13 subpaths, generated from the Illustrator master in `INNTW Branding/Logos/Official Logo/`.

| Property | Value | Why |
|---|---|---|
| Artwork | One compound path, `fill-rule="evenodd"` | Keeps the O's counter and the crossbar gaps open |
| Grid | `viewBox="0 0 652.73 652.73"`, square | Scale proportionally or not at all; width + `aspect-ratio: 1 / 1` means no layout shift |
| Fill | One flat colour; `currentColor` in the component | Never a gradient, never two colours, never a knockout |
| Words | Five: IF, NOT, NOW, THEN, WHEN | When split into parts, split by word. Never IF NOT or IF NOW |
| Accessible name | `INNTW — If Not Now Then When` | Pass `decorative` when adjacent text already names the brand |
| Letterforms | Brush-drawn, irregular | Never redraw, smooth or retrace. Never set the phrase in a typeface and call it the mark |

**Clear space:** `x` = the height of the W in either shared column = 138 of 652.73 units, one fifth of the mark. Keep `x` empty on all four sides: no type, rule, image edge or other logo. Never express it in px. At least once in any layout the mark sits alone and large.

**Minimum size:** 32 px digital minimum, 48 px comfortable, 96 px where the hand reads. Print: 10 mm or wider. Embroidery and debossing: 20 mm and a simplified stitch file, not this vector.

**Colourways — five, and no sixth:**

| Name | Mark | Ground | Use |
|---|---|---|---|
| Black on paper | `#000000` | `#fafaf8` | The default. Paper sites, print, press pack |
| White on cobalt | `#ffffff` | `#024fda` | The cobalt world |
| White on black | `#ffffff` | `#000000` | Footer masthead on every property, photography |
| Cobalt on paper | `#024fda` | `#fafaf8` | Paper or white grounds only; the sky share card |
| Accent brown on cream | `#85431e` | `#dad3c8` | On cream only |

```tsx
import { Mark } from "@inntw/brand";
<Mark size="clamp(240px, 42vw, 520px)" />  // named for assistive tech
<Mark size="34px" decorative />             // adjacent text already names it
```

**Never:** stretched, rotated, outlined, on pattern, tinted back, in a box or keyline or badge.

The hourglass drawing exists only as PNGs in `INNTW Branding/Logos/Hourglass Logo/`. Not in the kit; no usage rules yet.

## 2 Colour

From the guidelines (Pantone in the code; CMYK from the PDF only, not proofed):

| Name | Hex | Variable | Pantone | CMYK | Role in the code today |
|---|---|---|---|---|---|
| Black | `#000000` | `--brand-black` | — | 100 100 100 100 | Mark and display type (paper), paper CTA fill, footer ground |
| Cobalt | `#024fda` | `--brand-cobalt` | 293 C | 100 63 0 35 | Cobalt world ground, sky CTA, paper focus ring, a mark colourway |
| Cream (white-brown) | `#dad3c8` | `--brand-white-brown` | — | 13.57 13.1 18.79 0 | Cobalt CTA, footer body text, store borders and hover, brown colourway ground |
| White | `#ffffff` | `--brand-white` | — | 0 0 0 0 | Sky world ground; mark and type on cobalt and black |
| Main brown | `#5b3427` | `--brand-main-brown` | 4695 C | 0 43 57 64 | Store only: headings, primary buttons, selected variant |
| Accent brown | `#85431e` | `--brand-accent-brown` | 7517 C | 0 50 77 48 | Brown mark colourway, on cream. Nothing else |
| Green | `#006c3f` | `--brand-green` | 3500 C | 85 26 83 7 | **Unused.** Tailwind `green`; no surface uses it |
| Shine | `#ffa300` | `--brand-shine` | 137 C | 0 36 100 0 | **Unused.** Tailwind `shine`; 1.92:1 on paper, never text |

Paper neutrals:

| Name | Hex | Variable | Role |
|---|---|---|---|
| Paper | `#fafaf8` | `--brand-paper` | Ground of Origin, Lockup, Studios, the magazine |
| Body | `#232323` | `--brand-body` | Running text |
| Muted | `#6e6e6c` | `--brand-muted` | Captions, meta, rail labels |
| Rule | `#dededa` | `--brand-rule` | Hairlines, field borders, quiet button borders |

Derivatives (use through the semantic layer only):

| Name | Hex | Variable | Role |
|---|---|---|---|
| Cobalt mid | `#034bd0` | `--brand-cobalt-mid` | 55% stop of the cobalt canvas |
| Cobalt deep | `#023fb4` | `--brand-cobalt-deep` | Foot of the cobalt canvas; sky CTA hover |
| Cream 200 | `#c9c0b2` | `--brand-cream-200` | Cream CTA hover on cobalt |
| Cream 50 | `#f4f0ea` | `--brand-cream-50` | Defined for cream focus/active; used nowhere |
| Ink 900 | `#0a0a0a` | `--brand-ink-900` | Text on cream; sky display type; footer ground on cobalt and sky |
| On-cobalt body | `#e8eaf2` | `--brand-on-cobalt-body` | Running text on cobalt |
| On-cobalt muted | `#cbd5f0` | `--brand-on-cobalt-muted` | Meta on cobalt |
| Sky body | `#2b3040` | `--fg-body` in `.world-sky` | Running text, sky |
| Sky muted | `#5b6276` | `--fg-muted` in `.world-sky` | Meta, sky |
| Inverse muted | `#a8a49c` | `--inverse-muted` | Footer quiet text, current-page item |

**What the PDF says vs what ships.** The PDF ranks white, main brown, accent brown and green as primary. On the websites the working palette is black, paper, cobalt and cream. Main brown is store-only (Shopify `config/settings_data.json`, scheme-1). Accent brown is the brown colourway only. Green and Shine are used nowhere. The paper ground is `#fafaf8`, not white; white is the ground only in the sky world. The build brief asked for muted `#767674` (4.36:1 on paper, fails AA at 14 px); it ships as `#6e6e6c` (4.89:1).

**Proportion.** Paper world: paper and black, body grey for running text, cobalt only as the keyboard focus ring. Origin allows no second colour at all. Cobalt world: cobalt end to end, white and cream type, cream CTA. Sky world: white with cobalt light at the foot, cobalt CTA. A colour the world does not name does not appear in it.

Contrast (computed, WCAG 2):

| Text | On | Ratio | Use |
|---|---|---|---|
| Black | Paper | 20.09 | Display, the mark |
| Body | Paper | 15.04 | Running text |
| Muted `#6e6e6c` | Paper | 4.89 | Captions at 14 px, passes AA |
| Cobalt | Paper | 6.41 | Cobalt mark colourway, focus ring |
| White | Cobalt | 6.70 | Display on cobalt |
| On-cobalt body | Cobalt | 5.58 | Running text on cobalt |
| On-cobalt muted | Cobalt | 4.57 | Meta on cobalt; just passes, never lighten the ground under it |
| Ink 900 | Cream | 13.32 | Cream CTA label |
| Sky muted | White | 6.08 | Meta, sky |
| Cream | Black | 14.13 | Footer body |
| Inverse muted | Black | 8.46 | Footer meta (code comment says 6.9:1; true figure is higher) |
| White | Main brown | 10.69 | Store primary button |
| Accent brown | Cream | 5.01 | Brown colourway |
| Shine | Paper | 1.92 | **Fails.** Never text, never a hairline |
| Muted `#767674` (rejected) | Paper | 4.36 | **Fails** AA at caption size |

**Do:** read colour through `--ground`, `--fg`, `--fg-body`, `--fg-muted`, `--rule`, `--accent`. Keep paper to paper and black. Cream is the CTA on cobalt.
**Never:** `var(--brand-*)` inside a component. Text in Shine. Green or Shine on a site without a canon decision first. `#767674`.

## 3 Three worlds

| World | Class | Properties | Ground | Display | CTA |
|---|---|---|---|---|---|
| Paper | none (default) | Origin and /press, Lockup, Studios, the magazine | `#fafaf8`, flat | Archivo, black | Black, paper label |
| Cobalt | `.world-cobalt` | The invite treatment | Cobalt canvas, white glow | Helvetica Neue 800, white | Cream, ink label |
| Sky | `.world-sky` | inntw.now, the Project | White, cobalt light from below | Helvetica Neue 700, ink | Cobalt, white label |

Switching is one class on `<html>` or on a wrapper. Paper has no gradients and no shadows.

**3.1 Cobalt canvas** — 180deg, stops 0 / 55 / 100. The top 55% stays within a hair of Pantone 293 C, where the headline sits; the deepening is held to the lower half.

```css
--canvas:
  radial-gradient(circle at 88% 70%, rgba(255, 255, 255, 0.1), transparent 55%),
  radial-gradient(circle at 8% 18%, rgba(255, 255, 255, 0.06), transparent 55%),
  linear-gradient(180deg, var(--brand-cobalt) 0%, var(--brand-cobalt-mid) 55%, var(--brand-cobalt-deep) 100%);
--sky-opacity: 0.55;
```

**3.2 Sky light** — main ellipse centred at 118%, below the bottom edge, so light rises into the page from off it; a fainter wash top right.

```css
--canvas:
  radial-gradient(ellipse 120% 60% at 50% 118%, rgba(2, 79, 218, 0.3), transparent 62%),
  radial-gradient(ellipse 70% 40% at 78% 8%, rgba(2, 79, 218, 0.07), transparent 70%),
  var(--brand-white);
--sky-opacity: 1;
--sky-blend: normal;
--glow: rgba(2, 79, 218, 0.55); /* the typing light */
```

**3.3 Derived recipes**

```css
/* The sky layer: a .sky child of .canvas. Screen on cobalt; inert on paper (--sky-opacity: 0). */
.canvas > .sky {
  position: absolute; inset: 0; pointer-events: none;
  opacity: var(--sky-opacity);
  mix-blend-mode: var(--sky-blend, screen);
  background:
    radial-gradient(ellipse 800px 360px at 100% 50%, rgba(255, 255, 255, 0.18), transparent 70%),
    radial-gradient(ellipse 500px 240px at 92% 38%, rgba(255, 255, 255, 0.1), transparent 70%),
    radial-gradient(ellipse 600px 220px at 85% 78%, rgba(255, 255, 255, 0.07), transparent 70%);
}

/* The sky share card (og.tsx): white held to 58%, cobalt mark on top. */
background: linear-gradient(180deg, #ffffff 0%, #ffffff 58%, #dfe7fb 100%);
```

**Do:** switch worlds with one class; keep the light at the edges, type on the flat part; scope a world to a wrapper when only part of a page needs it.
**Never:** a gradient or shadow in paper; a gradient on the mark or on type; move the cobalt stops (0 / 55 / 100 is the canvas); mix worlds inside one component.

## 4 Typography

| Slot | Paper | Cobalt | Sky |
|---|---|---|---|
| `--font-display`, `--font-ui` | Archivo | Helvetica Neue | Helvetica Neue |
| `--font-read` | Newsreader | Newsreader | Newsreader |
| `--font-script` | — | — | Newsreader Italic |

| Face | Source | Licence | Fallback |
|---|---|---|---|
| Archivo (variable, `wdth` in use) | `next/font/google`, self-hosted at build | SIL OFL | ui-sans-serif, system-ui, -apple-system, Segoe UI |
| Newsreader | `next/font/google`, self-hosted at build | SIL OFL | ui-serif, Georgia, Times New Roman |
| Helvetica Neue | System face, never bundled | Commercial; print/design files need a licensed copy | Helvetica, Arial, Liberation Sans (metric compatible) |

The kit's `assets/fonts/archivo-400.woff`, `archivo-600.woff` and `src/og-fonts.ts` (base64) are for Open Graph images only.

**PDF vs code.** The PDF sets headers in Helvetica Neue, Bugaki and Aileron and paragraphs in Calps. Bugaki, Aileron and Calps are referenced in no INNTW repo and no font file exists. The store theme uses Shopify's generic sans. Bringing any of them back is a canon decision first.

**4.1 Archivo width axis.** Every paper app loads it with the axis; drop it and condensed type silently renders at normal width.

```ts
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", axes: ["wdth"] });
```

| `wdth` | Used for (Origin `app/paper.css`) |
|---|---|
| 62 | Nameplates, big numerals that fill a measure. The floor |
| 68 | Section titles |
| 72 | Pull quotes |
| 78 | Sub-heads, kickers, drop caps |

**4.2 Scale** (`tokens.css`; colour from the semantic layer; long-form capped at `--measure: 68ch`):

| Class | Face | Size | Weight / tracking / leading |
|---|---|---|---|
| `.t-display` | display | `clamp(2.5rem, 1.8rem + 3.5vw, 5rem)` | 700, -0.03em, lh 0.94 (cobalt: 800, -0.025em) |
| `.t-h2` | display | `clamp(1.75rem, 1.4rem + 1.5vw, 2.625rem)` | 600, -0.02em, lh 1.06 |
| `.t-h3` | display | `clamp(1.125rem, 1.05rem + 0.36vw, 1.3125rem)` | 600, -0.012em, lh 1.2 |
| `.t-script` | script, italic (sky only) | `clamp(1.375rem, 1.1rem + 1.3vw, 2.125rem)` | 400, -0.005em, lh 1.3 |
| `.t-lead` | ui | `clamp(1.125rem, 1.03rem + 0.46vw, 1.375rem)` | 400, -0.01em, lh 1.5, 46ch |
| `.t-body` | ui | `clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)` | 400, lh 1.62 |
| `.t-read` | read | `clamp(1.125rem, 1.05rem + 0.36vw, 1.3125rem)` | 400, lh 1.72 |
| `.t-meta` | ui | `0.875rem` | 500, tracking 0 |

`.t-script` is one confiding line under a headline in the sky world. Never body, never UI, never more than a sentence.

**4.3 Tracking.** Display at 600+ with negative tracking, -0.012em to -0.03em. Tracked-out caps are banned by default. Recorded exceptions:

| Where | What may be tracked caps | Recorded |
|---|---|---|
| The magazine, inntwbrand.com | Section eyebrows, bylines, nav labels | 2026-09-08 |
| Origin, ifnotnowthenwhen.co | Newspaper furniture only (folio, tabs, ledger keys, bylines): UI face, 600–700, +0.14em, 9–11 px | 2026-09-09 |

**Unrecorded third instance:** the kit's `GlobalFooter` sets column headings uppercase at `0.14em` and links at `0.12em`, on every property. Either canon records it or the footer changes.

**Do:** give every primitive an explicit size (a missing size inherits body and looks merely off); load Archivo with `axes: ["wdth"]`; small sentences in sentence case.
**Never:** track display type out or put tracked-caps eyebrows above headings; go below `wdth 62`; bundle Helvetica Neue; use `.t-script` for more than one line or outside sky.

## 5 Surface

Flat. No shadow token, no shadow anywhere in the kit. Separation is hairlines and space; the only depth is the light in cobalt and sky.

| Element | Value | Note |
|---|---|---|
| Hairline | `1px solid var(--rule)` | Between sections, under nav, fields, quiet buttons, prose images |
| Radius | `2px` | Buttons and fields only |
| Focus ring | `outline: 2px solid var(--focus); outline-offset: 3px` | Keyboard focus only (`:focus-visible`) |
| Blockquote | `border-left: 2px solid var(--fg)` | The one heavier rule |
| Inverse band | `background: var(--inverse-ground)` | Black footer under every property |
| Field on cobalt | fill `rgba(255,255,255,0.08)`, border `0.32` | Focus: fill `0.14`, border cream |
| Field on sky | fill `rgba(2,79,218,0.04)`, border `0.28` | Focus: white, cobalt border |

**Do:** separate with a hairline or space; keep 2px radius on anything clickable.
**Never:** a drop shadow; the mark in a box, badge or keyline; a rounded card.

## 6 Motion

| Token | Value | What it does |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | The only curve |
| `--dur-fast` | 140ms | Hover colour, link underline, field border, button press |
| `--dur-base` | 220ms | Larger state changes on Studios and the Project |
| `--dur-slow` | 480ms | The Project's sky transitions only |
| Button press | `transform: translateY(1px)` | The only movement in the paper world |
| Link | underline at 38% alpha, full on hover | The underline is the affordance; no arrows |

Reduced motion: under `prefers-reduced-motion: reduce`, every animation and transition drops to 0.001ms.
Logo animations (After Effects, 3 s / 8 s / 9 s, plus a green variant) live in `INNTW Branding/Logos/Logo Animations/`; not part of the kit.

## 7 Voice

Governed by `INNTW-Brain/canon/04-voice.md`. The approved one line:

> This version of you is temporary. You can become the person you always said you would be. This is how you do it.

The phrase is written **"If not now then when"**: no comma, no question mark, ever. "If Not Now Then When" as a name; all caps only where the mark or a nameplate already is. The brand names the moment, it does not ask; speaks to one reader as "you"; offers a choice, never assigns an identity.

| Never | Write |
|---|---|
| ~~Start today.~~ | This version of you is temporary. |
| ~~Don't wait.~~ | You said you would. |
| ~~Take the leap!~~ | Become the person you said you would be. |
| ~~What are you waiting for?~~ | I'm running out of time. |
| ~~You are a dreamer.~~ | You can be the person you always said you could be. |
| ~~Join the movement~~ | Join |
| ~~Unlock your true self~~ | The person you said you would be |

**Do:** buttons say what happens, sentence case; the underline is the link's affordance; state real urgency plainly (the one-day storefront, the fifty units, the real close date); say less, with weight.
**Never:** arrows appended to button text; tracked-out all-caps eyebrows above headings; 01 / 02 / 03 numbering on things that are not a sequence; meta strings joined with middle dots; exclamation marks; a question put to the reader in a headline or form field; a count, number or clock used as pressure that is not literally true.

## 8 Tokens

`inntw-brand-kit/src/tokens.css` is the implementation; this file and the HTML are the record. Install `pnpm add "github:INNTW/inntw-brand-kit#main"`, add `transpilePackages: ["@inntw/brand"]`, import `@inntw/brand/tokens.css` once in the root layout. Bump the kit's version on every change or consumers keep serving the old build.

```css
:root {
  --brand-white: #ffffff;
  --brand-main-brown: #5b3427;   /* Pantone 4695 C */
  --brand-accent-brown: #85431e; /* Pantone 7517 C */
  --brand-green: #006c3f;        /* Pantone 3500 C */
  --brand-cobalt: #024fda;       /* Pantone 293 C */
  --brand-shine: #ffa300;        /* Pantone 137 C */
  --brand-black: #000000;
  --brand-white-brown: #dad3c8;  /* cream */
  --brand-paper: #fafaf8;
  --brand-body: #232323;
  --brand-muted: #6e6e6c;
  --brand-rule: #dededa;
  --brand-cobalt-mid: #034bd0;
  --brand-cobalt-deep: #023fb4;
  --brand-cream-200: #c9c0b2;
  --brand-cream-50: #f4f0ea;
  --brand-ink-900: #0a0a0a;
  --brand-on-cobalt-body: #e8eaf2;
  --brand-on-cobalt-muted: #cbd5f0;
}

/* Semantic layer, paper (default). Components read only these. */
:root {
  --ground: var(--brand-paper);
  --fg: var(--brand-black);
  --fg-body: var(--brand-body);
  --fg-muted: var(--brand-muted);
  --rule: var(--brand-rule);
  --accent: var(--brand-black);
  --accent-fg: var(--brand-paper);
  --accent-hover: var(--brand-body);
  --focus: var(--brand-cobalt);
  --selection-bg: var(--brand-black);
  --selection-fg: var(--brand-paper);
  --canvas: var(--ground);
  --sky-opacity: 0;
  --inverse-ground: var(--brand-black);
  --inverse-fg: var(--brand-white);
  --inverse-body: var(--brand-white-brown);
  --inverse-muted: #a8a49c;
  --inverse-rule: rgba(255, 255, 255, 0.18);
  --font-display: var(--font-archivo, "Archivo"), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-ui: var(--font-display);
  --font-read: var(--font-newsreader, "Newsreader"), ui-serif, Georgia, "Times New Roman", serif;
  --gutter: clamp(20px, 4vw, 64px);
  --measure: 68ch;
  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 140ms;
  --dur-base: 220ms;
  --dur-slow: 480ms;
}

.world-cobalt {
  --ground: var(--brand-cobalt);
  --fg: var(--brand-white);
  --fg-body: var(--brand-on-cobalt-body);
  --fg-muted: var(--brand-on-cobalt-muted);
  --rule: rgba(255, 255, 255, 0.22);
  --accent: var(--brand-white-brown);
  --accent-fg: var(--brand-ink-900);
  --accent-hover: var(--brand-cream-200);
  --focus: var(--brand-white);
  --selection-bg: var(--brand-white-brown);
  --selection-fg: var(--brand-ink-900);
  --inverse-ground: var(--brand-ink-900);
  /* --canvas, --sky-opacity: see 3.1 */
  --font-display: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif;
}

.world-sky {
  --ground: var(--brand-white);
  --fg: var(--brand-ink-900);
  --fg-body: #2b3040;
  --fg-muted: #5b6276;
  --rule: rgba(2, 79, 218, 0.14);
  --accent: var(--brand-cobalt);
  --accent-fg: var(--brand-white);
  --accent-hover: var(--brand-cobalt-deep);
  --focus: var(--brand-cobalt);
  --selection-bg: var(--brand-cobalt);
  --selection-fg: var(--brand-white);
  --inverse-ground: var(--brand-ink-900);
  /* --canvas, --sky-opacity, --sky-blend, --glow: see 3.2 */
  --font-display: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif;
  --font-script: var(--font-read);
}

/* Tailwind bridge: bg-ground, text-fg, text-body, text-muted, border-rule, bg-accent,
   bg-cobalt, text-cream, bg-shine, bg-green, text-main-brown, text-accent-brown, font-display ... */
```

Asset index:

| File | What it is |
|---|---|
| `assets/inntw-mark.svg` | The mark, `fill="currentColor"`. Source of truth |
| `assets/inntw-mark-black.svg` | `#000000`. Paper sites, print, press pack |
| `assets/inntw-mark-white.svg` | `#ffffff`. On cobalt, black, photography |
| `assets/inntw-mark-cobalt.svg` | `#024fda`. On paper or white only |
| `assets/inntw-mark-brown.svg` | `#85431e`. On cream only |
| `src/mark-path.ts` | The path as a string, for inline rendering |
| `src/components/Mark.tsx` | `<Mark size decorative />`; prefer it over the files on the web |
| `src/tokens.css` | The whole system |
| `src/og.tsx` | Open Graph cards: paper, cobalt, sky |
| `assets/fonts/archivo-*.woff` | Archivo 400 / 600, OG images only |
| `brand/inntw-brand-guidelines.html` | The designed document |
| `brand/inntw-brand-guidelines.pdf` | The same, US Letter |
| `brand/inntw-brand-guidelines.md` | This file |
| `INNTW Branding/Logos/Official Logo/` | The Illustrator master |

The mark is not licensed for reuse. INNTW™ and IF NOT NOW THEN WHEN™ are trademarks of If Not Now Then When Inc.

---
Regenerated 2026-10-02 from `@inntw/brand` 1.5.0, commit `f0414b4`. Also read: inntw-lockup `c6de8e3`, inntw-origin `1e63d3d`, inntw_shopify `bf968b0`, INNTW Brand Guidelines.pdf.
