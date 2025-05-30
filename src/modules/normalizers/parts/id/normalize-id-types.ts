import type { RawId } from "@/core/logger/types";
import type { NormalizedId } from "@/modules/normalizers/types";

export type CustomIdNormalizer = (id: RawId) => NormalizedId;

/**
 * ID normalization options.
 */
export type NormalizedIdOptions = {
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomIdNormalizer;
};
