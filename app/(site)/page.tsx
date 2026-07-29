import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CirclePlay, Headphones, Radio } from "lucide-react";
import {
  getAllStories,
  getFactChecks,
  getHomepageModules,
  getLiveEvents,
  getNewsletters,
  getPodcastEpisodes,
  getPodcastShows,
  getVideos,
} from "@/lib/content/repository";
import { LeadPackage } from "@/components/editorial/LeadPackage";
import { StoryCard } from "@/components/editorial/StoryCard";
import { RankedList } from "@/components/editorial/RankedList";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { NewsletterCallout } from "@/components/editorial/NewsletterCallout";
import { AdSlot } from "@/components/editorial/AdSlot";
import { EditorialImage } from "@/components/editorial/EditorialImage";
import { formatDate } from "@/lib/site";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "GlobHub Media — Global journalism with context",
  description:
    "Verified global news, investigations, analysis, live coverage, video and podcasts from GlobHub Media.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [
    allStories,
    modules,
    videos,
    shows,
    episodes,
    newsletters,
    liveEvents,
    factChecks,
  ] = await Promise.all([
    getAllStories(),
    getHomepageModules(),
    getVideos(),
    getPodcastShows(),
    getPodcastEpisodes(),
    getNewsletters(),
    getLiveEvents(),
    getFactChecks(),
  ]);

  const moduleByType = (type: string) =>
    modules.find((homepageModule) => homepageModule.type === type && homepageModule.enabled);
  const storiesFromModule = (type: string, fallback = allStories) => {
    const homepageModule = moduleByType(type);
    if (!homepageModule?.storySlugs?.length)
      return fallback.slice(0, homepageModule?.limit || 6);
    return homepageModule.storySlugs
      .map((slug) => allStories.find((story) => story.slug === slug))
      .filter((story): story is NonNullable<typeof story> => Boolean(story));
  };

  const leadStories = storiesFromModule("lead", allStories).slice(0, 4);
  const latestStories = [...allStories]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6);
  const rankedStories = storiesFromModule("ranked", allStories).slice(0, 5);
  const deeperStories = storiesFromModule("category", allStories).slice(0, 3);
  const opinionStories = allStories.filter((story) =>
    ["opinion", "editorial"].includes(story.type)
  );
  const liveEvent = liveEvents[0];
  const factCheck = factChecks[0];
  const show = shows[0];
  const latestEpisode = show
    ? episodes.find((episode) => episode.showSlug === show.slug)
    : undefined;

  return (
    <>
      <section className={styles.homeIntro}>
        <div className={`container ${styles.homeIntroInner}`}>
          <p>
            Independent journalism
            <span aria-hidden="true">/</span>
            Global perspective
            <span aria-hidden="true">/</span>
            Public-interest reporting
          </p>
          <Link href="/about">
            Why GlobHub <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <LeadPackage stories={leadStories} />

      <div className={`container ${styles.adWrap}`}>
        <AdSlot placement="homepage-in-feed" />
      </div>

      <section className={`container section ${styles.latestSection}`}>
        <div className={styles.latestMain}>
          <SectionHeading title="Latest" href="/latest" />
          <div className={styles.latestList}>
            {latestStories.map((story) => (
              <StoryCard story={story} variant="horizontal" key={story.id} />
            ))}
          </div>
        </div>
        <aside className={styles.latestRail}>
          <RankedList stories={rankedStories} />
          {factCheck ? (
            <div className={styles.factCheckPromo}>
              <span>Fact check</span>
              <strong>{factCheck.title}</strong>
              <p>
                Verdict: <b>{factCheck.verdict.replaceAll("-", " ")}</b>
              </p>
              <Link href={`/fact-check/${factCheck.slug}`}>Read the evidence</Link>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="surface-alt section">
        <div className="container">
          <SectionHeading
            title="Reporting that goes deeper"
            href="/investigations"
          />
          <div className={styles.deeperGrid}>
            {deeperStories.map((story, index) => (
              <StoryCard
                story={story}
                variant={index === 0 ? "large" : "standard"}
                key={story.id}
              />
            ))}
          </div>
        </div>
      </section>

      {liveEvent ? (
        <section className={`surface-dark ${styles.liveBand}`}>
          <div className={`container ${styles.liveGrid}`}>
            <div className={styles.liveIntro}>
              <span><Radio size={14} /> Live coverage</span>
              <h2>{liveEvent.title}</h2>
              <p>{liveEvent.summary}</p>
              <Link href={`/live/${liveEvent.slug}`} className="button button--cyan">
                Follow live updates
              </Link>
            </div>
            <ol className={styles.livePoints}>
              {liveEvent.keyPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {point}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className={`surface-ink section ${styles.watchSection}`}>
        <div className="container">
          <SectionHeading title="Watch" href="/video" inverse />
          <div className={styles.videoGrid}>
            {videos.slice(0, 3).map((video, index) => (
              <article
                className={index === 0 ? styles.videoLead : styles.videoCard}
                key={video.id}
              >
                <Link href={`/video/${video.slug}`} className={styles.videoImage}>
                  <EditorialImage
                    image={video.poster}
                    sizes={index === 0 ? "(max-width: 800px) 100vw, 65vw" : "33vw"}
                  />
                  <span><CirclePlay size={index === 0 ? 34 : 24} /></span>
                </Link>
                <p>{video.series || "GlobHub Video"} · {video.duration || "Live"}</p>
                <h3>
                  <Link href={`/video/${video.slug}`}>{video.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`container section ${styles.ideasGrid}`}>
        <div>
          <SectionHeading title="Ideas & Opinion" href="/opinion" />
          <div className={styles.opinionGrid}>
            {opinionStories.slice(0, 2).map((story) => (
              <article key={story.id} className={styles.opinionCard}>
                <p>{story.kicker}</p>
                <h3><Link href={`/story/${story.slug}`}>{story.headline}</Link></h3>
                <span>By {story.authors[0]?.name}</span>
              </article>
            ))}
            <article className={styles.editorialNote}>
              <span>Our standards</span>
              <h3>How GlobHub separates news, analysis and opinion</h3>
              <Link href="/editorial-policy">Read our editorial standards</Link>
            </article>
          </div>
        </div>
        {show && latestEpisode ? (
          <aside className={styles.podcastCard}>
            <span><Headphones size={16} /> The latest podcast</span>
            <h2>{show.title}</h2>
            <h3>{latestEpisode.title}</h3>
            <p>{latestEpisode.summary}</p>
            <small>
              {formatDate(latestEpisode.publishedAt)} · {latestEpisode.duration}
            </small>
            <Link
              href={`/podcasts/${show.slug}/${latestEpisode.slug}`}
              className="button button--cyan"
            >
              Listen now
            </Link>
          </aside>
        ) : null}
      </section>

      {newsletters[0] ? (
        <section className="container section-tight">
          <NewsletterCallout newsletter={newsletters[0]} placement="homepage" />
        </section>
      ) : null}
    </>
  );
}
