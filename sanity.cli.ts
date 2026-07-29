import { defineCliConfig } from "sanity/cli";
import { sanityEnv } from "./sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
  },
  typegen: {
    path: "./sanity/**/*.{ts,tsx,js,jsx}",
    schema: "./sanity/extract.json",
    generates: "./sanity/types.generated.ts",
    formatGeneratedCode: true,
    overloadClientMethods: false,
  },
});
