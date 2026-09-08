import { Mark } from "./Mark";

export interface NavItem {
  href: string;
  label: string;
  /** Renders as the primary action rather than a plain link. */
  cta?: boolean;
}

/**
 * Per-site navigation. Small mark on the left, plain links on the right.
 *
 * No hamburger and no client-side JS: at narrow widths the links simply
 * wrap onto a second line. Four or five items never need more than that,
 * and it keeps every site at zero nav JavaScript.
 *
 * apps/now does not use this — that page has no nav by design.
 */
export function Nav({
  homeHref = "/",
  siteLabel,
  items,
}: {
  homeHref?: string;
  /** Names this property, e.g. "Studios". Sits beside the mark. */
  siteLabel?: string;
  items: NavItem[];
}) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href={homeHref} className="nav-home" aria-label={`INNTW${siteLabel ? ` ${siteLabel}` : ""} — home`}>
          <Mark size="34px" decorative />
          {siteLabel ? <span className="nav-label">{siteLabel}</span> : null}
        </a>

        <nav aria-label="Primary">
          <ul className="nav-row">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={item.cta ? "btn nav-cta" : "link nav-link"}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
