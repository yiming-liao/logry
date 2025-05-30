import type { FormatterConfig } from "@/modules/formatters";
import type { NormalizerConfig } from "@/modules/normalizers";
import type { LOGGER_PRESETS } from "@/presets/constants";

export type LoggerPreset = (typeof LOGGER_PRESETS)[number];

export type LoggerPresetConfig = {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
};
