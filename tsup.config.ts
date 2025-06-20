import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    treeshake: true,
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".js" : ".cjs",
      };
    },
    esbuildOptions(options) {
      options.alias = {
        "@": path.resolve(__dirname, "src"),
      };
    },
  },
]);
