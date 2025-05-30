/* eslint-disable @typescript-eslint/no-explicit-any */

import { isNode } from "@/shared/utils/platform";

/**
 * Detect if current runtime is in development mode.
 * In Node.js, checks NODE_ENV; in browser, checks __LOGRY_DEV__ global.
 *
 * @returns true if in development mode, false otherwise
 */
export const isDevMode = (): boolean => {
  if (isNode()) {
    // Check NODE_ENV in Node
    const nodeEnv =
      process?.env?.NODE_ENV ?? (globalThis as any).process?.env?.NODE_ENV;

    if (typeof nodeEnv === "string") {
      return nodeEnv !== "production";
    }
    return true; // Assume dev if NODE_ENV is undefined
  }

  // Browser fallback via global flag
  if (typeof (globalThis as any).__LOGRY_DEV__ !== "undefined") {
    return Boolean((globalThis as any).__LOGRY_DEV__);
  }

  // Default fallback
  return false;
};
