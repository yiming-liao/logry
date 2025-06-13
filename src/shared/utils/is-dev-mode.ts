/* eslint-disable @typescript-eslint/no-explicit-any */

import { isNode } from "@/shared/utils/platform";

/**
 * Detects if the current runtime environment is in development mode.
 *
 * In Node.js, it checks the NODE_ENV environment variable:
 * - If NODE_ENV is set, returns true unless it's 'production'.
 * - If NODE_ENV is undefined, defaults to development mode (true).
 *
 * In browsers, it checks the global `__LOGRY_DEV__` flag:
 * - Returns true if `__LOGRY_DEV__` is explicitly set to a truthy value.
 * - Defaults to production mode (false) if the flag is undefined.
 *
 * This design assumes Node defaults to development for ease of local testing,
 * while browsers default to production to avoid unnecessary debug logs.
 *
 * @returns boolean indicating if running in development mode
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
