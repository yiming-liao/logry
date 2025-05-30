import type { RawContext } from "@/core/logger/types";
import type { NormalizedContext } from "@/modules/normalizers/types";

export type CustomContextNormalizer = (
  context?: RawContext,
) => NormalizedContext;

/**
 * Context normalization options.
 */
export type NormalizedContextOptions = {
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomContextNormalizer;
};
