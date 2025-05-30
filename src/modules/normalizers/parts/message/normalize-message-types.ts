import type { RawMessage } from "@/core/logger/types";
import type { NormalizedMessage } from "@/modules/normalizers/types";

export type CustomMessageNormalizer = (
  message: RawMessage,
) => NormalizedMessage;

/**
 * Message normalization options.
 */
export type NormalizedMessageOptions = {
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomMessageNormalizer;
};
