import type { RawScope } from "@/core/logger/types";
import type { NormalizedScope, ScopeSeparator } from "@/modules/normalizers";

export type CustomScopeNormalizer = (scope: RawScope) => NormalizedScope;

/**
 * Scope normalization options.
 */
export type NormalizedScopeOptions = {
  // Separator used to join scope segments into a single string. Defaults to "." if not specified.
  separator?: ScopeSeparator;
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomScopeNormalizer;
};
