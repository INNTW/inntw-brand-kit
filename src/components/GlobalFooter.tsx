import { ORG, SITES, TRADEMARK_NOTICE, corpUrl, siblingUrl, storeUrl, type SiteKey } from "../site";

/** The properties, in the order they are listed everywhere. */
const ORDER: SiteKey[] = ["brand", "project", "origin", "studios", "press", "lockup", "now"];

/**
 * The If Not Now Then When footer.
 *
 * One black editorial band shared by every property, so the ecosystem reads
 * as one company wherever a reader lands. Left: the masthead, one line, the
 * Instagram. Middle: the properties. Right: the store and the corporation,
 * which is where every site ultimately points.
 *
 * Reads the inverse surface tokens only, so it renders identically on the
 * paper world and on cobalt.
 */
export function GlobalFooter({
  site,
  /** Optional third column: this site's own sections. */
  sections,
}: {
  site: SiteKey;
  sections?: { href: string; label: string }[];
}) {
  const year = new Date().getFullYear();
  const instagramHandle = ORG.instagram.replace(/^@/, "");

  return (
    <footer className="gf">
      <div className="gf-inner">
        <div className="gf-grid">
          <div>
            <a className="gf-masthead" href={siblingUrl("brand")}>
              INNTW
            </a>
            <p className="gf-blurb">
              If Not Now Then When. A clothing and creative brand made in
              Toronto, and the company that exists because its founder answered
              the question.
            </p>
            <ul className="gf-social">
              <li>
                <a href={`https://instagram.com/${instagramHandle}`} rel="noopener">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  {ORG.instagram}
                </a>
              </li>
            </ul>
          </div>

          {sections && sections.length ? (
            <nav className="gf-col" aria-label="Sections">
              <h2>Sections</h2>
              <ul>
                {sections.map((s) => (
                  <li key={s.href}>
                    <a href={s.href}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <div className="gf-col" aria-hidden="true" />
          )}

          <nav className="gf-col" aria-label="INNTW properties">
            <h2>More from INNTW</h2>
            <ul>
              {ORDER.map((key) => {
                const meta = SITES[key];
                return (
                  <li key={key}>
                    {key === site ? (
                      <span aria-current="true">{meta.name}</span>
                    ) : (
                      <a href={siblingUrl(key)}>{meta.name}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="gf-col" aria-label="Store and company">
            <h2>If Not Now Then When</h2>
            <ul>
              <li>
                <a href={storeUrl()}>Shop the collection</a>
              </li>
              <li>
                <a href={corpUrl()}>ifnotnowthenwhen.co</a>
              </li>
              <li>
                <a href={siblingUrl("press", "/contact")}>Press</a>
              </li>
              <li>
                <a href={siblingUrl("origin", "/contact")}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="gf-bottom">
          <p>
            © {year} INNTW. {TRADEMARK_NOTICE}
          </p>
          <p>
            <a href={corpUrl()}>If Not Now Then When</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
