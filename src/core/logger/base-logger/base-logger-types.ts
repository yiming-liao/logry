import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type { RawContext, RawScope } from "@/shared/types/log-fields";

/** Options for constructor in Logger  */
export interface BaseLoggerConstructorOptions {
  level?: Level;
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
}
