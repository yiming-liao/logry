import type {
  TimestampStyle,
  NormalizedTimestamp,
} from "@/modules/normalizers";

export type CustomTimestampNormalizer = (
  timestamp: number,
) => NormalizedTimestamp;

/**
 * Timestamp normalization options.
 */
export type NormalizedTimestampOptions = {
  /** "raw" for numbers, "pretty" for human-readable, etc. Defaults to "pretty". */
  style?: TimestampStyle;
  /** Use UTC instead of local time. Defaults to false. */
  useUTC?: boolean;
  /** Show only time part, no date. Defaults to false. */
  showTimeOnly?: boolean;
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomTimestampNormalizer;
};
