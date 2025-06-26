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
    entry: ["exports/handlers/index.ts"],
    outDir: "dist/handlers",
    platform: "neutral",
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

  {
    ...base,
    entry: ["exports/browser-lite/index.ts"],
    outDir: "dist/browser-lite",
    format: ["iife"],
    platform: "browser",
    globalName: "logry",
  },
]);
