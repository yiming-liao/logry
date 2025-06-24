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
  message: string;
  meta?: RawMeta;
  options?: LogRuntimeOptions;
};

/** Log method bound to a level */
export type BoundLogMethod = (
  message: RawMessage,
  meta?: RawMeta,
  options?: LogRuntimeOptions,
) => void;

/** Extra data passed at log call time. */
export type LogRuntimeOptions = {
  scope?: RawScope | string; // String or array of strings
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};
