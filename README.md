# @inntw/brand

The INNTW design system. Tokens, the mark, and the shared components every
INNTW site is built from.

This package is the single source of truth for the visual system. It is
consumed by each site repo as a git dependency, so a change here reaches
every site through one `pnpm update` rather than six copy-pastes.

## Install

```bash
pnpm add "github:INNTW/inntw-brand-kit#main"
```

The package ships TypeScript and CSS **source**, not a build. Consumers
transpile it themselves:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  transpilePackages: ["@inntw/brand"],
};
```

`next`, `react` and `react-dom` are peer dependencies — the consuming app
supplies them, so there is never a second copy of React in the tree.

### Bump `version` on every change. Every one.

Webpack — and therefore Next's build cache — treats everything under
`node_modules` as immutable and snapshots it **by the version in
`package.json`**, not by file contents. Ship a change without bumping the
version and consumers reinstall the new commit, rebuild, and still emit the
old output. No error, no warning; the site just does not change.

This bit on 2026-09-08. `1.0.0` → `1.0.0` across two commits meant five sites
rebuilt on Vercel, went green, and served the previous build's URLs. Locally
the same thing happens until you delete `.next`.

So: change something here, bump the version, push. Then in each consuming
repo:

```bash
pnpm update @inntw/brand
```

## Use

```ts
import { Mark, Nav, Footer, siteUrl, pageMetadata } from "@inntw/brand";
import "@inntw/brand/tokens.css";
```

| Export | What it is |
|---|---|
| `.` | Components (`Mark`, `Nav`, `Footer`, `GlobalFooter`, `EmailSignup`), `site.ts`, `seo.ts` |
| `./tokens.css` | The whole design system. Import once, in the root layout |
| `./og` | `next/og` image generator, paper and cobalt variants |
| `./content` | Filesystem MDX pipeline — `readAll`, `readOne`, `allSlugs`, `safeDate` |
| `./assets/*` | The mark in five colourways, and the Archivo woffs |

## Three worlds, one semantic layer

`tokens.css` defines three worlds — **paper** (default), **cobalt**
(`.world-cobalt`) and, since 1.2.0, **sky** (`.world-sky`: white ground,
cobalt light rising from the foot of the page, cloud — inntw.now, the
Project). Put the class on `<html>`, or on a wrapper to scope a world to
part of a page. Sky adds two tokens — `--sky-blend` (the `.sky` blend mode,
`screen` elsewhere, `normal` here) and `--glow` — and one primitive,
`.t-script`: Newsreader Italic for the one confiding line under a
headline. Components only ever read the semantic layer:
`--ground`, `--fg`, `--accent`, `--rule`. They never read a `--brand-*` value
directly.

That indirection is the point. Switching a site between worlds is one class
on the root element. If a component needs something the semantic layer does
not express, **extend the layer** — do not reach past it into the raw brand
values.

## Rules that are easy to break

**Every absolute URL resolves through `site.ts`.** No domain is hardcoded
anywhere. Each site sets `NEXT_PUBLIC_SITE_URL`; `siteUrl()` prefers
`VERCEL_PROJECT_PRODUCTION_URL` over `VERCEL_URL`, which on production builds
is the per-deployment hostname and not the site's address.

**Type primitives need an explicit `font-size`.** `.t-display`, `.t-h2` and
`.t-h3` set family, weight and tracking only. A missing size silently
inherits body size and looks merely off rather than broken.

**The OG fonts are base64 in `src/og-fonts.ts`, deliberately.** `next/og`
cannot read a file out of a transpiled workspace package: `require.resolve`
with a template literal breaks static analysis, with a literal it returns a
module id rather than a path, and `fetch(new URL(..., import.meta.url))`
resolves to `/_next/static/...`, which has no origin during prerender. Do not
"fix" this back to a file read.

**`safeDate()` exists because `new Date("[YYYY-MM-DD]")` is `Invalid Date`.**
Anything derived from MDX frontmatter goes through it, or a placeholder date
throws inside `sitemap.ts` at build.

## The mark

`src/mark-path.ts` is the mark as one compound path on a 652.73 grid,
generated from the Illustrator master — not hand-edited. `Mark.tsx` renders
it inline so it inherits `currentColor`.

Six of the eleven letterforms are read once. Five — the N and O of the first
row, the H, E and N of the second — are read twice, which is how eleven drawn
shapes carry all sixteen letters of the phrase. If the artwork is ever
replaced, the crop coordinates the lockup site cuts its construction diagrams
from have to be re-measured against the new path.

---

INNTW™ and IF NOT NOW THEN WHEN™ are trademarks of their owner. The mark in
`assets/` is not licensed for reuse.
