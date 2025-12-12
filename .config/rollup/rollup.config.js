// @ts-check
import typescript from "@rollup/plugin-typescript";
import { fileSizeSummary } from "./plugins/file-size-summary.js";
import resolve from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import path from "node:path";
import alias from "@rollup/plugin-alias";

/** @type {import('rollup').RollupOptions[]} */
export default [
  // --- JS
  {
    input: {
      index: "exports/index.ts",
      plugins: "exports/plugins/index.ts",
    },
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].js",
    },
    plugins: [
      alias({ entries: [{ find: "@", replacement: path.resolve("src") }] }),
      resolve({ browser: true }),
      typescript({ tsconfig: "./tsconfig.json" }),
      fileSizeSummary(),
    ],
  },

  // --- DTS
  {
    input: {
      index: "exports/index.ts",
      plugins: "exports/plugins/index.ts",
    },
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].d.ts",
    },
    plugins: [
      alias({ entries: [{ find: "@", replacement: path.resolve("src") }] }),
      dts(),
      fileSizeSummary(),
    ],
  },
];
