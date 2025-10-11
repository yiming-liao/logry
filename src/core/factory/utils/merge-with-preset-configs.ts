import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { logryPresets, type LoggerPreset } from "@/presets";

export const mergeWithPresetConfigs = (
  presetName?: LoggerPreset,
  normalizerConfig?: NormalizerConfig,
  formatterConfig?: FormatterConfig,
) => {
  if (!presetName) return { normalizerConfig, formatterConfig };

  return {
    normalizerConfig: mergeNormalizerConfig(
      logryPresets[presetName]?.normalizerConfig,
      normalizerConfig,
    ),
    formatterConfig: mergeFormatterConfig(
      logryPresets[presetName]?.formatterConfig,
      formatterConfig,
    ),
  };
};
