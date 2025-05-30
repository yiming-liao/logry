import type { LEVELS, PLATFORMS } from "@/shared/constants";

export type Level = (typeof LEVELS)[number];

/** Type representing supported platforms/environments from PLATFORM. */
export type Platform = (typeof PLATFORMS)[number];
