"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions";
import styles from "./forms.module.css";

const initialState = { status: "idle" as const, message: "" };

export function ContactForm({
  defaultKind = "general",
}: {
  defaultKind?: "general" | "tip" | "correction" | "advertising" | "careers" | "technical";
}) {
  const [state, action, pending] = useActionState(submitContactForm, initialState);
  return (
    <form action={action} className={styles.form}>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label>
        Contact reason
        <select name="kind" defaultValue={defaultKind} required>
          <option value="general">General inquiry</option>
          <option value="tip">News tip</option>
          <option value="correction">Correction request</option>
          <option value="advertising">Advertising inquiry</option>
          <option value="careers">Careers inquiry</option>
          <option value="technical">Technical support</option>
        </select>
      </label>
      <div className={styles.twoColumns}>
        <label>
          Name
          <input name="name" type="text" minLength={2} maxLength={120} autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" maxLength={254} autoComplete="email" required />
        </label>
      </div>
      <label>
        Subject
        <input name="subject" type="text" minLength={4} maxLength={180} required />
      </label>
      <label>
        Message
        <textarea name="message" rows={8} minLength={20} maxLength={8000} required />
      </label>
      <label className={styles.consent}>
        <input name="consent" type="checkbox" required />
        <span>
          I understand this form is not an end-to-end encrypted secure-tip
          channel and consent to GlobHub processing my information to respond.
        </span>
      </label>
      <button type="submit" className="button" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className={styles.status} role="status">
        {state.message}
      </p>
    </form>
  );
}

