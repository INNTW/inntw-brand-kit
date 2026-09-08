import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * Filesystem-backed MDX content.
 *
 * Drop a `.mdx` file into the app's content directory, give it
 * frontmatter, and it appears — index page, detail route, sitemap, OG
 * image and JSON-LD all included. No code change, no rebuild step beyond
 * the deploy.
 *
 * Everything here runs at build time only; nothing reaches the client.
 */

export interface ContentEntry<F> {
  /** Filename without the extension. Becomes the URL segment. */
  slug: string;
  frontmatter: F;
  /** Raw MDX body, for the app to compile. */
  body: string;
}

function contentDir(dir: string): string {
  return join(process.cwd(), dir);
}

/** Every entry in a content directory, unsorted. */
export function readAll<F>(dir: string): ContentEntry<F>[] {
  const root = contentDir(dir);
  if (!existsSync(root)) return [];

  return readdirSync(root)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(join(root, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter: data as F,
        body: content,
      };
    });
}

/** One entry, or null when the slug does not exist. */
export function readOne<F>(dir: string, slug: string): ContentEntry<F> | null {
  const file = join(contentDir(dir), `${slug}.mdx`);
  if (!existsSync(file)) return null;
  const { data, content } = matter(readFileSync(file, "utf8"));
  return { slug, frontmatter: data as F, body: content };
}

/** Slugs for generateStaticParams. */
export function allSlugs(dir: string): { slug: string }[] {
  return readAll(dir).map((e) => ({ slug: e.slug }));
}

/* --------------------------------------------------------------------------
   Frontmatter shapes
   -------------------------------------------------------------------------- */

/** apps/project — participant stories. */
export interface StoryFrontmatter {
  title: string;
  participant: string;
  /** Which month of the six the story covers, 1–6. */
  month: number;
  excerpt: string;
  /** ISO date. Drives ordering and the Article JSON-LD. */
  date: string;
  cohort?: string;
}

/** apps/studios — case studies. */
export interface CaseStudyFrontmatter {
  title: string;
  client: string;
  /** Short label for the kind of work, e.g. "Brand build". */
  discipline: string;
  /** Capabilities exercised; feeds CreativeWork JSON-LD. */
  services: string[];
  year: string;
  excerpt: string;
  date: string;
}

/** Newest first. */
export function byDateDesc<F extends { date: string }>(
  a: ContentEntry<F>,
  b: ContentEntry<F>,
): number {
  return b.frontmatter.date.localeCompare(a.frontmatter.date);
}

/** Story order follows the arc of the project, not the publish date. */
export function byMonth<F extends { month: number }>(
  a: ContentEntry<F>,
  b: ContentEntry<F>,
): number {
  return a.frontmatter.month - b.frontmatter.month;
}

/**
 * A Date that survives an unfilled placeholder.
 *
 * Frontmatter ships with `[YYYY-MM-DD]` in it until the real dates are
 * filled in, and `new Date("[YYYY-MM-DD]")` is Invalid Date — which throws
 * the moment Next serialises a sitemap. Falls back to now so an unfinished
 * content file can never break a build.
 */
export function safeDate(value: string | undefined, fallback = new Date()): Date {
  if (!value) return fallback;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? fallback : d;
}
