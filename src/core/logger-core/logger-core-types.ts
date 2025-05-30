import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { HandlerConfig } from "@/modules/handler-manager";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";
import type { Level } from "@/shared/types";

export interface LoggerCoreOptions {
  id?: string;
  level?: Level;
  formatterConfig?: FormatterConfig;
  normalizerConfig?: NormalizerConfig;
  handlerConfig?: HandlerConfig;
}
