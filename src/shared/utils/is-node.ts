/* eslint-disable @typescript-eslint/no-explicit-any */

/** Detect if the current environment is Node.js. */
export const isNode = (): boolean =>
  typeof (globalThis as any).process === "object" &&
  typeof (globalThis as any).process.versions === "object" &&
  typeof (globalThis as any).process.versions.node === "string";
