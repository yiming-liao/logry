import type { HandlerManagerConfig } from "@/core/handler-manager";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { LoggerPreset } from "@/presets/types";
import type { Level } from "@/shared/types";
import type { RawContext } from "@/shared/types/log-fields";

export type GetOrCreateLoggerOptions = {
  id?: string;
  level?: Level;
  scope?: string[];
  context?: RawContext;
  formatterConfig?: FormatterConfig;
  normalizerConfig?: NormalizerConfig;
  handlerManagerConfig?: HandlerManagerConfig;
  preset?: LoggerPreset;
};
