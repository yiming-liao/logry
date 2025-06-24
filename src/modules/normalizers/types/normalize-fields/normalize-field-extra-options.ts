import type { LevelStyle } from "@/modules/normalizers/fields/normalize-level";
import type { ScopeSeparator } from "@/modules/normalizers/fields/normalize-scope";
import type { TimestampStyle } from "@/modules/normalizers/fields/normalize-timestamp";

/** Extra format options for the 'timestamp' field. */
export type NormalizeTimestampExtraOptions = {
  /** "raw" for numbers, "pretty" for human-readable, etc. Defaults to "pretty". */
  style?: TimestampStyle;
  /** Use UTC instead of local time. Defaults to false. */
  useUTC?: boolean;
  /** Show only time part, no date. Defaults to false. */
  showTimeOnly?: boolean;
};

/** Extra format options for the 'level' field. */
export type NormalizeLevelExtraOptions = {
  /** "upper" for uppercase, "lower" for lowercase, "title" for capitalized words. Defaults to "upper". */
  style?: LevelStyle;
};

/** Extra format options for the 'scope' field. */
export type NormalizeScopeExtraOptions = {
  // Separator used to join scope segments into a single string. Defaults to "." if not specified.
  separator?: ScopeSeparator;
};

/** Extra format options for the 'meta' field. */
export type NormalizeMetaExtraOptions = {
  /** Maximum number of lines to include in the error stack trace. */
  errorStackLines?: number;
};
