import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type {
  RawContext,
  RawMessage,
  RawMeta,
  RawScope,
} from "@/shared/types/log-fields";

/** Options for `child` method in Logger */
export type ChildOptions = {
  level?: Level;
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/** Options for `log` method in Logger */
export type LogOptions = {
  id?: string;
  level: Level;
  message?: string;
  meta?: RawMeta;
  options?: LogRuntimeOptions;
};

/** Arguments accepted by log methods */
type LogArgs =
  | [RawMessage] // message
  | [RawMeta] // meta
  | [string, RawMeta] // message, meta
  | [RawMeta, string] // meta, message
  | [string, LogRuntimeOptions] // message, runtime options
  | [RawMeta, LogRuntimeOptions] // meta, runtime options
  | [RawMeta, string, LogRuntimeOptions] // meta, message, runtime options
  | [string, RawMeta, LogRuntimeOptions]; // message, meta, runtime options

/** Log method bound to a level */
export type BoundLogMethod = (...args: LogArgs) => void;

/** Extra data passed at log call time. */
export type LogRuntimeOptions = {
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};
