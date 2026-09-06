"use client";

import { useState } from "react";
import Link from "next/link";
import { JobListing } from "@/lib/content/jobs";
import styles from "./jobs.module.css";

export function JobBoard({ initialJobs = [] }: { initialJobs?: JobListing[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const departments = ["All", ...Array.from(new Set(initialJobs.map((j) => j.department || "Editorial")))];
  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship", "Remote"];

  const filteredJobs = initialJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.department || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || job.department === selectedDept;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <>
      {/* Standard Website Page Header */}
      <header className={styles.jobsPageHeader}>
        <div className="container">
          <span className="eyebrow">Work With Us</span>
          <h1>Careers & Job Opportunities</h1>
          <p>
            Explore verified open positions in global journalism, newsroom technology, visual investigation, and editorial operations.
          </p>
        </div>
      </header>

      <main className="container">
        {/* Filters and Search Bar */}
        <section className={styles.filterSection}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif), Georgia, serif", fontSize: "1.5rem" }}>
              Open Vacancies ({filteredJobs.length})
            </h2>
          </div>
          <div className={styles.filterControls}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Filter by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter jobs"
            />
            {departments.length > 1 && (
              <select
                className={styles.selectControl}
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d === "All" ? "All Departments" : d}
                  </option>
                ))}
              </select>
            )}
            <select
              className={styles.selectControl}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by employment type"
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Types" : t}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>There are currently no open vacancies</h3>
            <p>Please check back later for new career opportunities at GlobHub Media.</p>
          </div>
        ) : (
          <div className={styles.jobGrid}>
            {filteredJobs.map((job) => {
              const jobSlug = job.slug || job.id;
              return (
                <article key={job.id} className={styles.jobCard}>
                  <div>
                    <div className={styles.jobMeta}>
                      <span className={styles.deptTag}>{job.department}</span>
                      <span className={styles.typeTag}>· {job.type}</span>
                    </div>
                    <h3 className={styles.jobTitle}>
                      <Link href={`/jobs/${jobSlug}`}>{job.title}</Link>
                    </h3>
                    <div className={styles.jobLocation}>{job.location}</div>
                    <p className={styles.jobDesc}>{job.description}</p>
                  </div>

                  <div className={styles.jobFooter}>
                    <span className={styles.postedDate}>
                      {job.postedAt ? `Posted ${job.postedAt.split("T")[0]}` : "Active"}
                    </span>
                    <div className={styles.actionGroup}>
                      <Link href={`/jobs/${jobSlug}`} className={styles.viewDetailsLink}>
                        View Details
                      </Link>
                      {job.googleFormUrl && (
                        <a
                          href={job.googleFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.applyLink}
                        >
                          Apply →
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
