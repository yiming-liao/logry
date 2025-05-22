import type { Platform } from "../../types";

/**
 * Resolves the platform type.
 * If "auto", it returns "browser" or "node" based on the environment.
 *
 * @param platForm - The platform setting ("auto", "browser", or "node").
 * @returns A resolved platform ("browser" or "node").
 */
export const resolvePlatform = (
  platForm: Platform,
): Exclude<Platform, "auto"> => {
  if (platForm !== "auto") {
    return platForm;
  }

  return typeof window !== "undefined" ? "browser" : "node";
};
