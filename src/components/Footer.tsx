import { SITES, TRADEMARK_NOTICE, siblingUrl, storeUrl, type SiteKey } from "../site";

/** The order the properties are listed in, everywhere. */
const ORDER: SiteKey[] = ["now", "brand", "origin", "studios", "lockup"];

/**
 * One structural row linking the properties by their proper names.
 *
 * This is corporate structure, not a link network — plain anchors, no
 * keyword-stuffed text, no reciprocal-linking choreography. The current
 * site is listed but not linked.
 */
export function Footer({
  site,
  ownershipLine,
  showTrademark = false,
}: {
  site: SiteKey;
  /** Optional entity line. Set on lockup; omitted elsewhere. */
  ownershipLine?: string;
  showTrademark?: boolean;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <nav aria-label="INNTW properties">
          <ul className="footer-row">
            {ORDER.map((key) => {
              const meta = SITES[key];
              if (key === site) {
                return (
                  <li key={key}>
                    <span aria-current="true" className="footer-current">
                      {meta.name}
                    </span>
                  </li>
                );
              }
              return (
                <li key={key}>
                  <a className="link" href={siblingUrl(key)}>
                    {meta.name}
                  </a>
                </li>
              );
            })}
            <li>
              <a className="link" href={storeUrl()}>
                Shop
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer-legal">
          <p className="t-meta">
            © {year} INNTW. {ownershipLine}
          </p>
          {showTrademark ? <p className="t-meta">{TRADEMARK_NOTICE}</p> : null}
        </div>
      </div>
    </footer>
  );
}
