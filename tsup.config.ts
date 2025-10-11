import type { Options } from "tsup";
import path from "node:path";
import { defineConfig } from "tsup";

const base: Options = {
  format: ["esm", "cjs"],
  dts: true,
  treeshake: true,
  clean: false,
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(__dirname, "src"),
    };
  },
};

export default defineConfig([
  {
    ...base,
    entry: ["exports/index.ts"],
    outDir: "dist",
    clean: true,
  },

  {
    ...base,
    entry: ["exports/node/index.ts"],
    outDir: "dist/node",
    platform: "node",
  },

  {
    ...base,
    entry: ["exports/browser/index.ts"],
    outDir: "dist/browser",
    platform: "browser",
  },

  {
    ...base,
    entry: ["exports/edge/index.ts"],
    outDir: "dist/edge",
    platform: "neutral",
  },
]);
