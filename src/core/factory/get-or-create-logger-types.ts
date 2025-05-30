import type { RawContext } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { HandlerConfig } from "@/modules/handler-manager";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";
import type { LoggerPreset } from "@/presets/types";
import type { Level } from "@/shared/types";

export type GetOrCreateLoggerOptions = {
  id?: string;
  level?: Level;
  scope?: string[];
  context?: RawContext;
  formatterConfig?: FormatterConfig;
  normalizerConfig?: NormalizerConfig;
  handlerConfig?: HandlerConfig;
  preset?: LoggerPreset;
};
