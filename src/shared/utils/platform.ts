/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Detect if the current environment is Node.js.
 */
export const isNode = (): boolean =>
  typeof (globalThis as any).process === "object" &&
  typeof (globalThis as any).process.versions === "object" &&
  typeof (globalThis as any).process.versions.node === "string";

/**
 * Detect if the current environment is a web browser.
 */
export const isBrowser = (): boolean =>
  typeof (globalThis as any).window === "object" &&
  typeof (globalThis as any).document === "object";

/**
 * Future support:
 * Deno, Bun, etc.
 */
// export const isDeno = (): boolean =>
//   typeof (globalThis as any).Deno === "object" &&
//   typeof (globalThis as any).Deno.version?.deno === "string";

// export const isBun = (): boolean =>
//   typeof (globalThis as any).Bun === "object" &&
//   typeof (globalThis as any).Bun.version === "string";
