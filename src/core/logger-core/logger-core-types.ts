import type { HandlerManagerConfig } from "@/core/handler-manager";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type { RawContext, RawScope } from "@/shared/types/log-fields";

export type LoggerCoreOptions = {
  id?: string;
  level?: Level;
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
  handlerManagerConfig?: HandlerManagerConfig;
};
