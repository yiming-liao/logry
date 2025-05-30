import type { RawLevel } from "@/core/logger/types";
import type { LevelStyle, NormalizedLevel } from "@/modules/normalizers";

export type CustomLevelNormalizer = (level: RawLevel) => NormalizedLevel;

/**
 * Level normalization options.
 */
export type NormalizedLevelOptions = {
  /** "upper" for uppercase, "lower" for lowercase, "title" for capitalized words. Defaults to "upper". */
  style?: LevelStyle;
  /** Provide a custom function to override default normalization. */
  customNormalizer?: CustomLevelNormalizer;
};
