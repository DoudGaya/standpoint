import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import styles from "../contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact GlobHub Media's newsroom, corrections, commercial and support desks.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const value = (await searchParams).kind;
  const allowed = ["general", "tip", "correction", "advertising", "careers", "technical"] as const;
  const defaultKind = allowed.includes(value as (typeof allowed)[number])
    ? (value as (typeof allowed)[number])
    : "general";
  return (
    <>
      <header className={styles.contactHeader}>
        <div className="container">
          <span className="eyebrow">Contact GlobHub</span>
          <h1 className="page-title">Reach the right desk</h1>
          <p>
            Send general questions, correction requests, news tips, advertising
            inquiries, careers questions or technical reports.
          </p>
        </div>
      </header>
      <div className={`container section ${styles.contactGrid}`}>
        <section>
          <h2>Before you send</h2>
          <p>
            This development form has server-side validation, a honeypot and
            provider boundaries, but it does not claim end-to-end encryption.
          </p>
          <aside>
            <strong>Confidential tips</strong>
            <p>
              Do not use this form for highly sensitive material. A production
              newsroom should publish a separately configured SecureDrop or
              equivalent secure-tip channel with verified instructions.
            </p>
          </aside>
          <dl>
            <dt>Corrections</dt><dd>Include the story URL and supporting evidence.</dd>
            <dt>Technical issues</dt><dd>Include your browser, device and the page address.</dd>
            <dt>Advertising</dt><dd>Commercial inquiries do not influence editorial coverage.</dd>
          </dl>
        </section>
        <ContactForm defaultKind={defaultKind} />
      </div>
    </>
  );
}
