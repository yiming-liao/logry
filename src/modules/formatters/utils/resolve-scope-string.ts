import type { RawScope } from "@/core/logger/types";
import type { NormalizedScope } from "@/modules/normalizers/types";

export type ResolveScopeStringOptions = {
  /** Full normalized scope string, e.g. "user.auth.login" */
  scope: NormalizedScope;
  /** Raw scope e.g. ["user","auth","login"] */
  rawScope: RawScope;
  /** Return only the last segment of the scope */
  showOnlyLatest?: boolean;
  /** Custom separator to join raw segments */
  customSeparator?: string;
};

/**
 * Resolve the final scope string based on formatting options.
 *
 * - If `showOnlyLatest` is true, returns the last segment.
 * - If `customSeparator` is provided, joins raw scope with it.
 * - Otherwise, returns the normalized scope string.
 */
export const resolveScopeString = ({
  scope,
  rawScope,
  showOnlyLatest = false,
  customSeparator,
}: ResolveScopeStringOptions): string => {
  if (!Array.isArray(rawScope) || rawScope.length === 0) {
    return "";
  }

  if (showOnlyLatest) {
    return rawScope[rawScope.length - 1];
  }

  if (customSeparator) {
    return rawScope.join(customSeparator);
  }

  return scope;
};
