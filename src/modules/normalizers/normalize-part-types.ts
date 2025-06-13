import type {
  LevelStyle,
  ScopeSeparator,
  TimestampStyle,
} from "@/modules/normalizers/normalizer-config-types";

/**
 * A function to normalize a specific log part.
 */
export type CustomPartNormalizer<Input, Result> = ({
  part,
}: {
  part: Input;
}) => Result;

/**
 * Options for normalizing a log part, including optional custom logic.
 */
export type NormalizePartOptions<Input, Result, Extra = object> = {
  /** Provide a custom function to override default normalizer. */
  customNormalizer?: CustomPartNormalizer<Input, Result>;
} & Extra;

// Timestamp
export type NormalizeTimestampExtraOptions = {
  /** "raw" for numbers, "pretty" for human-readable, etc. Defaults to "pretty". */
  style?: TimestampStyle;
  /** Use UTC instead of local time. Defaults to false. */
  useUTC?: boolean;
  /** Show only time part, no date. Defaults to false. */
  showTimeOnly?: boolean;
};

// Level
export type NormalizeLevelExtraOptions = {
  /** "upper" for uppercase, "lower" for lowercase, "title" for capitalized words. Defaults to "upper". */
  style?: LevelStyle;
};

// Scope
export type NormalizeScopeExtraOptions = {
  // Separator used to join scope segments into a single string. Defaults to "." if not specified.
  separator?: ScopeSeparator;
};

// Meta
export type NormalizeMetaExtraOptions = {
  /** Maximum number of lines to include in the error stack trace. */
  errorStackLines?: number;
};
