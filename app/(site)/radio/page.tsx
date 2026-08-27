import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, Play, Radio, Volume2 } from "lucide-react";
import {
  getPodcastEpisodes,
  getPodcastShows,
  getRadioBulletins,
} from "@/lib/content/repository";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getCurrentLocale } from "@/lib/i18n/server";
import { formatDate } from "@/lib/site";
import { RadioHero } from "@/components/radio/RadioHero";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import styles from "@/components/radio/radio.module.css";

export const metadata: Metadata = {
  title: "GlobHub Radio — Live Audio News & Podcasts",
  description: "Listen to verified audio news bulletins, hourly briefings, narrated articles, and podcasts from GlobHub Media.",
  alternates: { canonical: "/radio" },
};

export default async function RadioPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  const [bulletins, shows, episodes] = await Promise.all([
    getRadioBulletins(locale),
    getPodcastShows(),
    getPodcastEpisodes(),
  ]);

  const activeBulletin = bulletins[0];
  const secondaryBulletins = bulletins.slice(1);

  return (
    <div className={`container section ${styles.radioContainer}`}>
      {activeBulletin ? (
        <RadioHero bulletin={activeBulletin} dict={dict} />
      ) : null}

      <section>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
            {dict.radio.allBulletins}
          </h2>
          <p style={{ color: "#64748b", margin: "0.25rem 0 0" }}>
            {dict.radio.hourlyBriefing} & {dict.radio.dailyHeadlines}
          </p>
        </div>

        <div className={styles.bulletinsGrid}>
          {bulletins.map((item) => (
            <article className={styles.bulletinCard} key={item.id}>
              <div className={styles.bulletinHeader}>
                <span className={styles.bulletinTag}>
                  {item.bulletinType === "hourly"
                    ? dict.radio.hourlyBriefing
                    : item.bulletinType === "daily"
                    ? dict.radio.dailyHeadlines
                    : dict.radio.audioArticles}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                  {item.duration}
                </span>
              </div>

              <h3 className={styles.bulletinTitle}>{item.title}</h3>
              <p className={styles.bulletinSummary}>{item.summary}</p>

              <div className={styles.bulletinFooter}>
                <span className={styles.bulletinTime}>
                  {formatDate(item.publishedAt, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }, locale)}
                </span>
                <Link href={`/radio?play=${item.slug}`} className={styles.listenBtn}>
                  <Play size={14} /> {dict.radio.listenNow}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
            {dict.radio.podcasts}
          </h2>
          <p style={{ color: "#64748b", margin: "0.25rem 0 0" }}>
            {dict.home.latestPodcast}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {shows.map((show) => (
            <article
              key={show.id}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.08)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <EditorialImage image={show.cover} sizes="300px" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0077b6" }}>
                <Headphones size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />
                {show.frequency}
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                <Link href={`/podcasts/${show.slug}`}>{show.title}</Link>
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0 }}>
                {show.description}
              </p>
              <small style={{ color: "#64748b", marginTop: "auto" }}>
                {episodes.filter((ep) => ep.showSlug === show.slug).length} episodes
              </small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
