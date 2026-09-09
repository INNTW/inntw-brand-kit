import { ImageResponse } from "next/og";
import { MARK_PATH, MARK_VIEWBOX } from "./mark-path";
import { ARCHIVO_400, ARCHIVO_600 } from "./og-fonts";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#FAFAF8";
const INK = "#000000";
const BODY = "#232323";
const MUTED = "#6E6E6C";
const COBALT = "#024FDA";
const CREAM = "#DAD3C8";
const WHITE = "#FFFFFF";
const INK_900 = "#0A0A0A";

/**
 * The mark as a data URI, built from the same path constant the site
 * renders. Satori draws SVG reliably through <img>, and this avoids any
 * filesystem read that the bundler would have to resolve.
 */
function markDataUri(color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">` +
    `<path fill="${color}" fill-rule="evenodd" d="${MARK_PATH}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Archivo, so OG type matches the sites rather than a bundled default. */
const ARCHIVO = [
  { name: "Archivo", data: ARCHIVO_400, weight: 400 as const, style: "normal" as const },
  { name: "Archivo", data: ARCHIVO_600, weight: 600 as const, style: "normal" as const },
];

/**
 * Per-route OG image: the mark and the page title, on paper.
 *
 * `world: "cobalt"` renders the invite variant — cream mark and type on the
 * cobalt ground; `world: "sky"` renders inntw.now — cobalt mark and ink type
 * on white with cobalt light at the foot — so a shared card reads as the
 * site it came from before anyone reads the words.
 */
export function ogImage(opts: {
  title: string;
  /** Small line above the title: the property name. */
  property: string;
  /** Optional line below, e.g. a participant or a discipline. */
  detail?: string;
  world?: "paper" | "cobalt" | "sky";
}) {
  const cobalt = opts.world === "cobalt";
  const sky = opts.world === "sky";
  // Sky: white ground, cobalt mark, ink type, cobalt light rising from the
  // bottom edge — the card reads as inntw.now before the words are read.
  const ground = sky
    ? `linear-gradient(180deg, ${WHITE} 0%, ${WHITE} 58%, #dfe7fb 100%)`
    : cobalt
      ? COBALT
      : PAPER;
  const display = cobalt ? CREAM : sky ? INK_900 : INK;
  const markColor = sky ? COBALT : display;
  const secondary = cobalt ? "rgba(255,255,255,0.72)" : sky ? COBALT : MUTED;
  const detailColor = cobalt ? "rgba(255,255,255,0.86)" : BODY;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ground,
          padding: "72px 80px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri(markColor)} width={132} height={132} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ fontSize: 26, fontWeight: 400, color: secondary, marginBottom: 18 }}
          >
            {opts.property}
          </div>
          <div
            style={{
              fontSize: opts.title.length > 46 ? 62 : 78,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: display,
              maxWidth: 1000,
            }}
          >
            {opts.title}
          </div>
          {opts.detail ? (
            <div
              style={{
                fontSize: 28,
                fontWeight: 400,
                color: detailColor,
                marginTop: 18,
              }}
            >
              {opts.detail}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: ARCHIVO },
  );
}
