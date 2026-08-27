import type { SchemaTypeDefinition } from "sanity";
import {
  codeSnippet,
  dataTable,
  documentAttachment,
  externalEmbed,
  factBox,
  faqBlock,
  gallery,
  pullQuote,
  relatedContent,
  sourceNote,
  timeline,
} from "./objects/bodyBlocks";
import { bodyContent } from "./objects/bodyContent";
import {
  adSlotReference,
  correctionBlock,
  newsletterCallout,
} from "./objects/callouts";
import { editorialImage } from "./objects/editorialImage";
import { homepageModule } from "./objects/homepageModule";
import { mediaEmbed } from "./objects/mediaEmbed";
import { schedule } from "./objects/schedule";
import { seo } from "./objects/seo";
import { workflow } from "./objects/workflow";
import { adCampaign, adPlacement, advertiser } from "./documents/commercial";
import { factCheck } from "./documents/factCheck";
import { correction, editorialPolicy } from "./documents/governance";
import { liveEvent } from "./documents/liveEvent";
import { podcastEpisode, podcastShow, radioBulletin, video } from "./documents/media";
import { department, team } from "./documents/organization";
import { person } from "./documents/person";
import { event, newsletter, newsletterEdition } from "./documents/products";
import {
  breakingNews,
  footer,
  homepage,
  navigation,
  page,
  redirect,
  siteSettings,
} from "./documents/siteManagement";
import { story } from "./documents/story";
import {
  category,
  location,
  series,
  tag,
  topic,
} from "./documents/taxonomy";

export const schemaTypes: SchemaTypeDefinition[] = [
  editorialImage,
  seo,
  workflow,
  schedule,
  mediaEmbed,
  bodyContent,
  pullQuote,
  factBox,
  gallery,
  timeline,
  faqBlock,
  relatedContent,
  sourceNote,
  dataTable,
  documentAttachment,
  externalEmbed,
  codeSnippet,
  newsletterCallout,
  adSlotReference,
  correctionBlock,
  homepageModule,
  story,
  person,
  category,
  topic,
  tag,
  location,
  series,
  department,
  team,
  video,
  podcastShow,
  podcastEpisode,
  radioBulletin,
  liveEvent,
  factCheck,
  newsletter,
  newsletterEdition,
  event,
  advertiser,
  adPlacement,
  adCampaign,
  correction,
  editorialPolicy,
  homepage,
  navigation,
  breakingNews,
  siteSettings,
  footer,
  page,
  redirect,
];

