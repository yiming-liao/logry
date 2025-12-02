import type {
  NormalizeFieldOptions,
  NormalizeLevelExtraOptions,
} from "@/modules/normalizers/types";
import type {
  NormalizedLevel,
  RawLevel,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { internalLog } from "@/internal";
import {
  DEFAULT_LEVEL_STYLE,
  TITLECASE_LEVELS_MAP,
  UPPERCASE_LEVELS_MAP,
} from "@/modules/normalizers/constants";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export type LevelStyle = "upper" | "lower" | "title";

export const normalizeLevel = (
  fieldValue: RawLevel,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<
    RawLevel,
    NormalizedLevel,
    NormalizeLevelExtraOptions
  > = {},
): NormalizedLevel => {
  const { style = DEFAULT_LEVEL_STYLE, customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "level",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  switch (style) {
    case "lower": {
      return fieldValue;
    }
    case "title": {
      return TITLECASE_LEVELS_MAP[fieldValue];
    }
    case "upper": {
      return UPPERCASE_LEVELS_MAP[fieldValue];
    }
    default: {
      internalLog({
        type: "warn",
        message: `Unknown level style "${style}", using "upper" as fallback.`,
      });
      return UPPERCASE_LEVELS_MAP[fieldValue];
    }
  }
};
