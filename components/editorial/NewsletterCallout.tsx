"use client";

import { useActionState } from "react";
import type { Newsletter } from "@/lib/content/types";
import { subscribeToNewsletter } from "@/app/actions";
import styles from "./editorial.module.css";

const initialState = { status: "idle" as const, message: "" };

export function NewsletterCallout({
  newsletter,
  placement = "homepage",
}: {
  newsletter: Newsletter;
  placement?: string;
}) {
  const [state, action, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  return (
    <section className={styles.newsletterCallout} aria-labelledby={`newsletter-${newsletter.id}`}>
      <span className={styles.newsletterLabel}>A sharper start to your day</span>
      <h2 id={`newsletter-${newsletter.id}`}>{newsletter.name}</h2>
      <p>{newsletter.description}</p>
      <form action={action}>
        <input type="hidden" name="newsletterId" value={newsletter.id} />
        <input type="hidden" name="placement" value={placement} />
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`website-${newsletter.id}`}>Website</label>
          <input
            id={`website-${newsletter.id}`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label htmlFor={`email-${newsletter.id}`} className={styles.visuallyHidden}>
          Email address
        </label>
        <div className={styles.newsletterFormRow}>
          <input
            id={`email-${newsletter.id}`}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            aria-describedby={`newsletter-status-${newsletter.id}`}
          />
          <button type="submit" className="button button--cyan" disabled={pending}>
            {pending ? "Submitting…" : "Sign up"}
          </button>
        </div>
        <p className={styles.privacy}>{newsletter.privacyDisclaimer}</p>
        <p
          id={`newsletter-status-${newsletter.id}`}
          className={styles.formStatus}
          role="status"
        >
          {state.message}
        </p>
      </form>
    </section>
  );
}

