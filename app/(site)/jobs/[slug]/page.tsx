import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobBySlug, getJobSlugs } from "@/lib/content/repository";
import styles from "@/components/jobs/jobs.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const jobs = await getJobSlugs();
  return jobs
    .filter((job) => Boolean(job && job.slug))
    .map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: "Vacancy Not Found | GlobHub Media" };
  }

  const jobTitle = job.title ? `${job.title} — Careers | GlobHub Media` : "Careers | GlobHub Media";
  const description = typeof job.description === "string" ? job.description.slice(0, 160) : "";
  const canonicalSlug = job.slug || slug;

  return {
    title: jobTitle,
    description,
    alternates: { canonical: `/jobs/${canonicalSlug}` },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const postedDate =
    typeof job.postedAt === "string" && job.postedAt.includes("T")
      ? job.postedAt.split("T")[0]
      : typeof job.postedAt === "string"
      ? job.postedAt
      : "";

  return (
    <article>
      <header className={styles.detailHeader}>
        <div className="container">
          <Link href="/jobs" className={styles.backLink}>
            ← Back to all vacancies
          </Link>
          <span className="eyebrow">
            {job.department || "Editorial"} · {job.type || "Full-time"}
          </span>
          <h1 className={styles.detailTitle}>{job.title || "Job Vacancy"}</h1>
          <div className={styles.detailMetaBar}>
            {job.location && (
              <div className={styles.detailMetaItem}>
                <strong>Location:</strong> {job.location}
              </div>
            )}
            {postedDate && (
              <div className={styles.detailMetaItem}>
                <strong>Posted:</strong> {postedDate}
              </div>
            )}
            {job.closingDate && (
              <div className={styles.detailMetaItem}>
                <strong>Closing Date:</strong> {job.closingDate}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container">
        <div className={styles.detailBody}>
          <section className={styles.detailSection}>
            <h2>About the Role</h2>
            <p>{typeof job.description === "string" ? job.description : "No description provided."}</p>
          </section>

          {job.googleFormUrl ? (
            <div className={styles.applyBox}>
              <div>
                <h3>Interested in this position?</h3>
                <p>Submit your application, resume, and portfolio directly through our official application form.</p>
              </div>
              <a
                href={job.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryApplyBtn}
              >
                Apply via Google Form →
              </a>
            </div>
          ) : (
            <div className={styles.applyBox}>
              <div>
                <h3>How to Apply</h3>
                <p>To apply for this vacancy, please contact the GlobHub Media newsroom desk.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </article>
  );
}
