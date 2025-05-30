import type { RawContext, RawMessage, RawMeta } from "@/core/logger/types";
import type { LoggerCore } from "@/core/logger-core";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";
import type { Level } from "@/shared/types";

/** Options for constructor in Logger  */
export type LoggerConstructorOptions = {
  core: LoggerCore;
  level?: Level;
  scope?: string | string[];
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/** Options for `child` method in Logger */
export type ChildOptions = {
  level?: Level;
  scope?: string | string[];
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/** Options for `log` method in Logger */
export type LogOptions = {
  level: Level;
  message: string;
  meta?: RawMeta;
  options?: LogRuntimeOptions;
};

/** Extra data passed at log call time. */
export type LogRuntimeOptions = {
  scope?: string | string[]; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/** Log method bound to a level */
export type BoundLogMethod = (
  message: RawMessage,
  meta?: RawMeta,
  options?: LogRuntimeOptions,
) => void;
