import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { LOGGER_PRESETS } from "@/presets/constants";

export type LoggerPreset = (typeof LOGGER_PRESETS)[number];

export type LoggerPresetConfig = {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
};
