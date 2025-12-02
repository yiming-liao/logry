import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import { logryPresets, type LoggerPreset } from "@/presets";
import { deepMerge } from "@/shared/utils/deep-merge";

export const mergeWithPresetConfigs = (
  presetName?: LoggerPreset,
  normalizerConfig?: NormalizerConfig,
  formatterConfig?: FormatterConfig,
) => {
  if (!presetName) return { normalizerConfig, formatterConfig };

  return {
    normalizerConfig: deepMerge(
      logryPresets[presetName]?.normalizerConfig,
      normalizerConfig,
    ),
    formatterConfig: deepMerge(
      logryPresets[presetName]?.formatterConfig,
      formatterConfig,
    ),
  };
};
