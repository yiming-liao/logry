import type { LoggerCoreOptions } from "@/core/logger-core/logger-core-types";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type { RawContext, RawMeta, RawScope } from "@/shared/types/log-fields";

/** Options for `child` method in Logger */
export type ChildOptions = Omit<LoggerCoreOptions, "handlerManagerConfig">;

/** Options for `log` method in Logger */
export type LogOptions = {
  id?: string;
  level: Level;
  message?: string;
  meta?: RawMeta;
  options?: LogRuntimeOptions;
};

/** Extra data passed at log call time. */
export type LogRuntimeOptions = {
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/** Overloads for logger methods */
export interface LogOverloads {
  (message: string, options?: LogRuntimeOptions): void; // message + options
  (meta: RawMeta, options?: LogRuntimeOptions): void; // meta + options
  (message: string, meta: RawMeta, options?: LogRuntimeOptions): void; // message + meta + options
}
