/* eslint-disable @typescript-eslint/no-explicit-any */

/** Detect if the current environment is a web browser. */
export const isBrowser = (): boolean =>
  typeof (globalThis as any).window === "object" &&
  typeof (globalThis as any).document === "object";
