import path from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "export/index.ts",
    "plugins/index": "export/plugins/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  treeshake: true,
  clean: true,
  esbuildOptions(options) {
    options.alias = { "@": path.resolve(__dirname, "src") };
  },
});
