import type { RawPayload } from "@/core/logger/types";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import { internalError } from "@/internal";
import { isBrowser, isNode } from "@/shared/utils/platform";

/**
 * Normalize a raw payload based on the current runtime environment.
 *
 * @param normalize - The normalizer function.
 * @param logPayload - The raw log payload to normalize.
 * @returns The normalized payload.
 */
export const normalizePayload = (
  normalize: (platform: Platform, rawPayload: RawPayload) => NormalizedPayload,
  logPayload: RawPayload,
): NormalizedPayload => {
  // Check platform and delegate to the normalizer accordingly
  if (isNode()) {
    return normalize("node", logPayload);
  } else if (isBrowser()) {
    return normalize("browser", logPayload);
  }

  // Return an internal error if the platform is unsupported
  return internalError({ message: "Unsupported runtime environment" });
};
