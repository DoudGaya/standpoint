export type AnalyticsEvent =
  | { name: "page_view"; path: string; title?: string }
  | { name: "article_read"; storyId: string; engagedSeconds: number }
  | { name: "scroll_depth"; storyId: string; depth: 25 | 50 | 75 | 100 }
  | { name: "video_start" | "video_complete"; mediaId: string }
  | { name: "audio_play" | "audio_complete"; mediaId: string }
  | { name: "newsletter_conversion"; newsletterId: string; placement: string }
  | { name: "share"; storyId: string; channel: string }
  | { name: "search"; query: string; resultCount: number }
  | { name: "search_no_results"; query: string }
  | { name: "ad_impression" | "ad_click"; placementId: string };

export type AnalyticsAdapter = {
  track(event: AnalyticsEvent): void | Promise<void>;
};

let adapter: AnalyticsAdapter | null = null;

export function configureAnalytics(nextAdapter: AnalyticsAdapter | null) {
  adapter = nextAdapter;
}

export function track(event: AnalyticsEvent) {
  if (!adapter) return;
  void adapter.track(event);
}

