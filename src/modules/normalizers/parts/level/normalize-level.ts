import type { RawLevel } from "@/core/logger/types";
import type { NormalizedLevelOptions } from "@/modules/normalizers/parts/level/normalize-level-types";
import type { NormalizedLevel } from "@/modules/normalizers/types";
import { internalLog } from "@/internal";
import {
  DEFAULT_LEVEL_STYLE,
  TITLECASE_LEVELS_MAP,
  UPPERCASE_LEVELS_MAP,
} from "@/modules/normalizers/constants";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeLevel = (
  level: RawLevel,
  options: NormalizedLevelOptions = {},
): NormalizedLevel => {
  const { style = DEFAULT_LEVEL_STYLE, customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "level",
    input: level,
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  switch (style) {
    case "lower":
      return level;
    case "title":
      return TITLECASE_LEVELS_MAP[level];
    case "upper":
      return UPPERCASE_LEVELS_MAP[level];
    default:
      internalLog({
        type: "warn",
        message: `Unknown level style "${style}", using "upper" as fallback.`,
      });
      return UPPERCASE_LEVELS_MAP[level];
  }
};
