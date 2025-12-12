/* eslint-disable @typescript-eslint/no-explicit-any */

// --- server ---
/** Detects Node.js runtime. */
export const isNode = (g: any): boolean => !!g.process?.versions?.node;
/** Detects Deno runtime. */
export const isDeno = (g: any): boolean => typeof g.Deno === "object";
/** Detects Bun runtime. */
export const isBun = (g: any): boolean => !!g.Bun;
/** Detects server-like runtimes (Node, Deno, Bun). */
export const isServer = (g: any): boolean => isNode(g) || isDeno(g) || isBun(g);

// --- browser ---
/** Detects browser environments with DOM access. */
export const isBrowser = (g: any): boolean =>
  typeof g.window === "object" && typeof g.document === "object";

// --- plain ---
/** Detects minimal/plain runtimes (Edge, RN, Workers, unknown). */
export const isPlain = (g: any) => !isServer(g) && !isBrowser(g);

/** Returns the normalized runtime descriptor. */
export const getEnv = (g = globalThis) => ({
  isServer: isServer(g),
  isBrowser: isBrowser(g),
  isPlain: isPlain(g),
});
