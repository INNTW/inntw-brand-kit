/**
 * Every absolute URL in the system resolves through here.
 *
 * No custom domain is hardcoded anywhere in this repo. Each app sets
 * NEXT_PUBLIC_SITE_URL; when a custom domain is attached later, changing
 * that one variable in the Vercel dashboard updates canonicals, sitemaps,
 * OG tags and JSON-LD across the whole site with no code change.
 */

export type SiteKey =
  | "project"
  | "now"
  | "origin"
  | "press"
  | "lockup"
  | "studios"
  | "brand";

export interface SiteMeta {
  key: SiteKey;
  /** Proper name, used verbatim in cross-links. Never keyword-stuffed. */
  name: string;
  /** Vercel project name. */
  project: string;
  /** Fallback origin — the .vercel.app URL, used when the env var is absent. */
  fallbackUrl: string;
  /** One line for the footer, describing what lives there. */
  role: string;
}

export const SITES: Record<SiteKey, SiteMeta> = {
  project: {
    key: "project",
    name: "The Project",
    project: "inntw-project",
    fallbackUrl: "https://inntw-project.vercel.app",
    role: "The six-month transformation project",
  },
  now: {
    key: "now",
    name: "Now",
    project: "inntw-now",
    fallbackUrl: "https://inntw-now.vercel.app",
    role: "Make the commitment",
  },
  origin: {
    key: "origin",
    name: "INNTW Origin",
    project: "inntw-origin",
    fallbackUrl: "https://inntw-origin.vercel.app",
    role: "The phrase, and who holds it",
  },
  press: {
    key: "press",
    name: "INNTW Press",
    project: "inntw-press",
    fallbackUrl: "https://inntw-press.vercel.app",
    role: "Press kit and media contact",
  },
  lockup: {
    key: "lockup",
    name: "INNTW Lockup",
    project: "inntw-lockup",
    fallbackUrl: "https://inntw-lockup.vercel.app",
    role: "The mark and how to use it",
  },
  studios: {
    key: "studios",
    name: "INNTW Studios",
    project: "inntw-studios",
    fallbackUrl: "https://inntw-studios.vercel.app",
    role: "The creative arm",
  },
  brand: {
    key: "brand",
    name: "INNTW Brand",
    project: "inntw-brand",
    fallbackUrl: "https://inntw-brand.vercel.app",
    role: "The magazine",
  },
};

/** Strip a trailing slash so joins never double up. */
function normalize(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * This site's origin.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL            — set this once a custom domain is live
 *   2. VERCEL_PROJECT_PRODUCTION_URL   — on production builds: the stable
 *                                        project alias, e.g. inntw-now.vercel.app
 *   3. VERCEL_URL                      — on previews: this deployment's own URL
 *   4. the .vercel.app fallback for this app
 *
 * Step 2 matters. On a production build VERCEL_URL is the *deployment*
 * hostname (inntw-now-a1b2c3-inntw.vercel.app), which changes on every push —
 * publishing that as a canonical would point every page at a URL that is
 * superseded the next time you deploy.
 */
export function siteUrl(key: SiteKey): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return normalize(
      /^https?:\/\//.test(explicit) ? explicit : `https://${explicit}`,
    );
  }
  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return normalize(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    return normalize(`https://${process.env.VERCEL_URL}`);
  }
  return normalize(SITES[key].fallbackUrl);
}

/** Absolute URL for a path on this site. */
export function absoluteUrl(key: SiteKey, path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? siteUrl(key) : `${siteUrl(key)}${p}`;
}

/**
 * A sibling site's origin.
 *
 * Cross-site links always use the sibling's own published URL, never this
 * site's env var. Each app's NEXT_PUBLIC_SITE_URL describes itself only.
 */
export function siblingUrl(key: SiteKey, path = "/"): string {
  const base = normalize(
    process.env[`NEXT_PUBLIC_URL_${key.toUpperCase()}`] ??
      SITES[key].fallbackUrl,
  );
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? base : `${base}${p}`;
}

/** The Shopify store. A separate property; never part of this repo. */
export function storeUrl(): string {
  return normalize(
    process.env.NEXT_PUBLIC_STORE_URL ?? "https://inntw-store.myshopify.com",
  );
}

/**
 * The corporation behind the project — If Not Now Then When. A separate
 * property; the shared footer points at it from every site.
 */
export function corpUrl(): string {
  return normalize(
    process.env.NEXT_PUBLIC_CORP_URL ?? "https://ifnotnowthenwhen.co",
  );
}

/** Where the application and inquiry forms POST. */
export function formEndpoint(): string {
  return process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
}

/* --------------------------------------------------------------------------
   Facts shared across sites. Kept here so a change lands everywhere at once
   without any prose being duplicated between sites.
   -------------------------------------------------------------------------- */
export const ORG = {
  name: "INNTW",
  legalName: "[LEGAL ENTITY NAME]",
  expansion: "If Not Now Then When",
  founder: "Theshantha De Silva",
  founded: "2025",
  launched: "2026",
  instagram: "@inntwproject",
  city: "Toronto",
  region: "Ontario",
  country: "CA",
  parent: "Collide Brand Management",
  email: "[GENERAL EMAIL]",
  pressEmail: "[PRESS EMAIL]",
  studiosEmail: "[STUDIOS EMAIL]",
} as const;

/** ™ only. ® appears nowhere in this system. */
export const TRADEMARK_NOTICE =
  "INNTW™ and IF NOT NOW THEN WHEN™ are trademarks of [LEGAL ENTITY NAME].";
