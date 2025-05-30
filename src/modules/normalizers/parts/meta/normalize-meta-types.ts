import type { RawMeta } from "@/core/logger/types";
import type { NormalizedMeta } from "@/modules/normalizers/types";

export type CustomMetaNormalizer = (meta?: RawMeta) => NormalizedMeta;

/**
 * Meta normalization options.
 */
export type NormalizedMetaOptions = {
  /** Maximum number of lines to include in the error stack trace. */
  errorStackLines?: number;
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomMetaNormalizer;
};
