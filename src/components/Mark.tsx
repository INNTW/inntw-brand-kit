import { MARK_PATH, MARK_VIEWBOX } from "../mark-path";

/**
 * The stacked lockup.
 *
 * IF NO · [T/W] over [T/W] · HEN — eleven brush-drawn letterforms that
 * resolve into four words and two readings: IF NOT / THEN and IF NOW /
 * WHEN. It is the only expressive element in the system; everything
 * around it stays quiet so it carries the personality alone.
 *
 * Inherits `currentColor`, so it works on paper and on cobalt without a
 * second asset. The artwork is square, so an explicit width plus
 * aspect-ratio means it never causes layout shift.
 */
export function Mark({
  size = "100%",
  title = "INNTW — If Not Now Then When",
  decorative = false,
  className,
}: {
  /** Any CSS length, or a clamp(). Height follows from the 1:1 artwork. */
  size?: string;
  title?: string;
  /** Hide from assistive tech when adjacent text already names the brand. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      width={size}
      className={className}
      style={{ aspectRatio: "1 / 1", height: "auto" }}
      fill="currentColor"
      {...(decorative
        ? { "aria-hidden": true as const, role: "presentation" }
        : { role: "img" as const, "aria-label": title })}
    >
      <path fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
}
