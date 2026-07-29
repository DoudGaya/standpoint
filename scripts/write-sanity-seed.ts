import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  categories,
  people,
  stories,
} from "../lib/content/seed";

type SeedDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const reference = (_ref: string) => ({ _type: "reference", _ref });
const categoryId = (id: string) => `seed-${id}`;
const personId = (id: string) => `seed-${id}`;

const flatCategories = categories.flatMap((category) => [
  category,
  ...(category.children ?? []),
]);

const categoryDocuments: SeedDocument[] = flatCategories.map((category) => ({
  _id: categoryId(category.id),
  _type: "category",
  title: category.title,
  shortTitle: category.title,
  slug: { _type: "slug", current: category.slug },
  description: category.description,
  parent: category.parentSlug
    ? reference(
        categoryId(
          flatCategories.find((item) => item.slug === category.parentSlug)?.id ??
            "",
        ),
      )
    : undefined,
  order: category.order,
  featured: Boolean(category.featured),
  showInNavigation: Boolean(category.showInNavigation),
  showInFooter: Boolean(category.showInFooter),
  megaMenu: Boolean(category.megaMenu),
  accentColor: category.accent,
}));

const personDocuments: SeedDocument[] = people.map((person) => ({
  _id: personId(person.id),
  _type: "person",
  fullName: person.name,
  slug: { _type: "slug", current: person.slug },
  professionalTitle: person.title,
  roles: person.roles,
  shortBio: person.shortBio,
  locationText: person.location,
  expertise: person.expertise,
  languages: person.languages,
  featured: Boolean(person.featured),
  active: person.active,
  publicProfile: person.publicProfile,
}));

const storyDocuments: SeedDocument[] = stories.map((story) => ({
  _id: `seed-${story.id}`,
  _type: "story",
  internalTitle: story.internalTitle ?? story.headline,
  publicHeadline: story.headline,
  shortHeadline: story.shortHeadline,
  mobileHeadline: story.mobileHeadline,
  slug: { _type: "slug", current: story.slug },
  summary: story.standfirst,
  deck: story.deck,
  kicker: story.kicker,
  contentType: story.type,
  body: story.body,
  primaryCategory: reference(categoryId(story.primaryCategory.id)),
  secondaryCategories: story.secondaryCategories?.map((category) =>
    reference(categoryId(category.id)),
  ),
  tagsText: story.tags,
  topicsText: story.topics,
  language: story.language,
  edition: story.edition,
  authors: story.authors.map((person) => reference(personId(person.id))),
  publishedAt: story.publishedAt,
  updatedAt: story.updatedAt,
  readingTime: story.readingTime,
  correctionNote: story.correctionNote,
  editorsNote: story.editorsNote,
  disclosure: story.disclosure,
  contentWarning: story.contentWarning,
  canonicalUrl: story.canonicalUrl,
  homepageEligible: Boolean(story.homepageEligible),
  trendingEligible: Boolean(story.trendingEligible),
  breakingEligible: Boolean(story.breakingEligible),
  priority: story.priority ?? 0,
  workflow: {
    _type: "workflow",
    status: story.workflowStatus,
    revisionSummary: "Imported fictional development seed.",
  },
  seo: {
    _type: "seo",
    title: story.seoTitle ?? story.headline,
    description: story.seoDescription ?? story.standfirst,
    keywords: story.searchKeywords ?? story.tags,
  },
}));

const outputPath = resolve("sanity", "seed", "development.ndjson");
const documents = [
  ...categoryDocuments,
  ...personDocuments,
  ...storyDocuments,
];
const ndjson = `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`;

async function main() {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, ndjson, "utf8");
  console.log(`Wrote ${documents.length} fictional documents to ${outputPath}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
