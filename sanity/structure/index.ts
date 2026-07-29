import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string
) =>
  S.listItem()
    .title(title)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title)
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("GlobHub Media")
    .items([
      S.listItem()
        .title("Editorial desk")
        .child(
          S.list()
            .title("Editorial desk")
            .items([
              S.documentTypeListItem("story").title("All stories"),
              S.listItem()
                .title("Breaking news stories")
                .child(
                  S.documentList()
                    .title("Breaking news stories")
                    .schemaType("story")
                    .filter('_type == "story" && contentType == "breaking"')
                ),
              S.documentTypeListItem("liveEvent").title("Live coverage"),
              S.documentTypeListItem("factCheck").title("Fact checks"),
              S.listItem()
                .title("Opinion and editorials")
                .child(
                  S.documentList()
                    .title("Opinion and editorials")
                    .schemaType("story")
                    .filter(
                      '_type == "story" && contentType in ["opinion", "editorial"]'
                    )
                ),
              S.listItem()
                .title("Investigations")
                .child(
                  S.documentList()
                    .title("Investigations")
                    .schemaType("story")
                    .filter('_type == "story" && contentType == "investigation"')
                ),
              S.listItem()
                .title("Press releases")
                .child(
                  S.documentList()
                    .title("Press releases")
                    .schemaType("story")
                    .filter('_type == "story" && contentType == "press-release"')
                ),
              S.listItem()
                .title("Sponsored content")
                .child(
                  S.documentList()
                    .title("Sponsored content")
                    .schemaType("story")
                    .filter('_type == "story" && contentType == "sponsored"')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Multimedia")
        .child(
          S.list()
            .title("Multimedia")
            .items([
              S.documentTypeListItem("video").title("Videos and live streams"),
              S.documentTypeListItem("podcastShow").title("Podcast shows"),
              S.documentTypeListItem("podcastEpisode").title("Podcast episodes"),
              S.documentTypeListItem("series").title("Series"),
            ])
        ),
      S.listItem()
        .title("Taxonomy")
        .child(
          S.list()
            .title("Taxonomy")
            .items([
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("topic").title("Topics"),
              S.documentTypeListItem("tag").title("Tags"),
              S.documentTypeListItem("location").title("Locations"),
              S.documentTypeListItem("series").title("Series"),
            ])
        ),
      S.listItem()
        .title("Newsroom")
        .child(
          S.list()
            .title("Newsroom")
            .items([
              S.documentTypeListItem("person").title("Staff and contributors"),
              S.documentTypeListItem("team").title("Teams"),
              S.documentTypeListItem("department").title("Departments"),
            ])
        ),
      S.listItem()
        .title("Website management")
        .child(
          S.list()
            .title("Website management")
            .items([
              singleton(S, "Homepage", "homepage", "homepage"),
              singleton(S, "Main navigation", "navigation", "navigation"),
              singleton(S, "Breaking news bar", "breakingNews", "breakingNews"),
              singleton(S, "Footer", "footer", "footer"),
              singleton(S, "Site settings", "siteSettings", "siteSettings"),
              S.documentTypeListItem("page").title("Pages"),
              S.documentTypeListItem("newsletter").title("Newsletters"),
              S.documentTypeListItem("newsletterEdition").title(
                "Newsletter editions"
              ),
              S.documentTypeListItem("event").title("Events"),
              S.documentTypeListItem("redirect").title("Redirects"),
            ])
        ),
      S.listItem()
        .title("Commercial")
        .child(
          S.list()
            .title("Commercial")
            .items([
              S.documentTypeListItem("advertiser").title("Advertisers"),
              S.documentTypeListItem("adCampaign").title("Campaigns"),
              S.documentTypeListItem("adPlacement").title("Placements"),
            ])
        ),
      S.listItem()
        .title("Governance")
        .child(
          S.list()
            .title("Governance")
            .items([
              S.documentTypeListItem("correction").title(
                "Corrections and retractions"
              ),
              S.documentTypeListItem("editorialPolicy").title(
                "Editorial and legal policies"
              ),
            ])
        ),
    ]);

