import type { Platform } from "../../../types";

/**
 * Resolves the platform type.
 * Detects the environment and returns either "browser" or "node".
 *
 * @returns The resolved platform string ("browser" or "node")
 */
export const resolvePlatform = (): Platform => {
  return typeof window !== "undefined" ? "browser" : "node";
};
