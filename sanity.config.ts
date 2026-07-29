"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { WorkflowBadge } from "./sanity/components/WorkflowBadge";
import { sanityEnv } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "globhub",
  title: "GlobHub Media",
  basePath: "/studio",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: sanityEnv.apiVersion }),
  ],
  document: {
    badges: (previous, context) =>
      ["story", "video", "podcastEpisode"].includes(context.schemaType)
        ? [...previous, WorkflowBadge]
        : previous,
  },
});

