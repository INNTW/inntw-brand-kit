"use client";

import { useId, useState, type FormEvent } from "react";
import { SITES, type SiteKey } from "../site";

declare global {
  interface Window {
    /** Collide DMP tag: counts this site's call to action. */
    cdmpCta?: () => void;
    /** Collide DMP tag: the tracked link this visit arrived on, if any. */
    getCdmpLink?: () => string | null;
  }
}

/**
 * The recorded consent text. Verbatim from BRAND_CONSENT in the Project
 * (inntw-invite lib/consent.ts) — the list lives there, and this sentence is
 * what a subscriber agreed to. Never reword it here alone.
 */
export const BRAND_CONSENT = "Tell me when If Not Now Then When makes something new.";

const ENDPOINT = "https://inntw.now/api/subscribe";
const FAILED = "That did not go through. Give it a minute and send it again.";

/**
 * One email field and the brand consent, posted to the Project's list.
 * The endpoint sends no mail, so nothing here promises a confirmation.
 */
export function EmailSignup({ site, className }: { site: SiteKey; className?: string }) {
  const id = useId();
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending(true);
    setStatus("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          source: new URL(SITES[site].fallbackUrl).hostname.replace(/^www\./, ""),
          consented: form.get("consented") === "on",
          cdmpLink: window.getCdmpLink?.() ?? undefined,
          website: form.get("website"),
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (res.ok && data?.ok) {
        window.cdmpCta?.();
        setDone(true);
        setStatus("Thank you. When If Not Now Then When makes something new, you will hear about it.");
      } else if (res.status === 400 && data?.error) {
        setStatus(data.error);
      } else if (res.status === 429) {
        setStatus("Too many tries. Give it a minute.");
      } else {
        setStatus(FAILED);
      }
    } catch {
      setStatus(FAILED);
    }
    setSending(false);
  }

  return (
    <section className={["signup", className].filter(Boolean).join(" ")} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="signup-heading">
        The next thing INNTW makes
      </h2>
      {done ? null : (
        <form onSubmit={onSubmit}>
          <label className="label" htmlFor={`${id}-email`}>
            Email
          </label>
          <div className="signup-row">
            <input
              id={`${id}-email`}
              className="field"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
            <button className="btn" type="submit" disabled={sending}>
              Tell me
            </button>
          </div>
          <label className="signup-consent">
            <input type="checkbox" name="consented" required />
            <span>{BRAND_CONSENT}</span>
          </label>
          <div className="visually-hidden" aria-hidden="true">
            <label>
              Leave this empty
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        </form>
      )}
      <p className="t-meta signup-status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
