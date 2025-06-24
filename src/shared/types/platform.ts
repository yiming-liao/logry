import type { PLATFORMS } from "@/shared/constants";

/**
 * Target platform type for log output.
 * This type is aliased as `P` in generic parameters.
 */
export type Platform = (typeof PLATFORMS)[number];
