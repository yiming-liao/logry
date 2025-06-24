import type { CustomNormalizer } from "@/modules/normalizers/types/normalize-fields/custom-normalizer";

/** Normalize options for a log field. */
export type NormalizeFieldOptions<Input, Result, Extra = object> = {
  /**
   * Custom normalizer function.
   * If set, other normalizing options will be ignored.
   */
  customNormalizer?: CustomNormalizer<Input, Result>;
} & Extra;
