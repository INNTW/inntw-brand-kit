import type { Metadata } from "next";
import { ORG, SITES, absoluteUrl, siteUrl, type SiteKey } from "./site";

/**
 * Metadata builder. Every page in the system goes through this, so every
 * page gets a self-referential canonical generated from the site URL env
 * var — never a hardcoded domain.
 */
export function pageMetadata(opts: {
  site: SiteKey;
  path: string;
  title: string;
  description: string;
  /** Suppress the "| <Site>" suffix — used on each site's home page. */
  bareTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const {
    site,
    path,
    title,
    description,
    bareTitle,
    noindex,
    type = "website",
    publishedTime,
  } = opts;

  const url = absoluteUrl(site, path);
  const fullTitle = bareTitle ? title : `${title} — ${SITES[site].name}`;

  return {
    metadataBase: new URL(siteUrl(site)),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false },
        }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITES[site].name,
      locale: "en_CA",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/* --------------------------------------------------------------------------
   JSON-LD
   -------------------------------------------------------------------------- */

/** Organization — origin only. It carries the entity identity and the press kit. */
export function organizationLd(site: SiteKey) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.name,
    legalName: ORG.legalName,
    alternateName: ORG.expansion,
    url: siteUrl(site),
    logo: absoluteUrl(site, "/inntw-mark-black.svg"),
    foundingDate: ORG.founded,
    founder: { "@type": "Person", name: ORG.founder },
    parentOrganization: { "@type": "Organization", name: ORG.parent },
    address: {
      "@type": "PostalAddress",
      addressLocality: ORG.city,
      addressRegion: ORG.region,
      addressCountry: ORG.country,
    },
  };
}

/** Article — project stories. */
export function articleLd(opts: {
  site: SiteKey;
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(opts.site, opts.path),
    },
    image: absoluteUrl(opts.site, `${opts.path}/opengraph-image`),
    author: { "@type": "Person", name: opts.authorName ?? ORG.founder },
    publisher: {
      "@type": "Organization",
      name: ORG.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(opts.site, "/inntw-mark-black.svg"),
      },
    },
  };
}

/** CreativeWork — studios case studies. */
export function creativeWorkLd(opts: {
  site: SiteKey;
  path: string;
  name: string;
  description: string;
  dateCreated: string;
  discipline: string[];
  clientName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.site, opts.path),
    image: absoluteUrl(opts.site, `${opts.path}/opengraph-image`),
    dateCreated: opts.dateCreated,
    genre: opts.discipline,
    creator: { "@type": "Organization", name: "INNTW Studios" },
    ...(opts.clientName
      ? { sourceOrganization: { "@type": "Organization", name: opts.clientName } }
      : {}),
  };
}

/** Serialize a JSON-LD object for a <script type="application/ld+json"> tag. */
export function jsonLd(data: object): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
