import { standaloneLog } from "@/standalone-log";

// logry (create-logger)
export {
  createLogger as logry,
  type CreateLoggerOptions,
} from "@/create-logger";

// standalone log
export const { trace, debug, info, warn, error, fatal } = standaloneLog;

// logger
export type { PluginLogger as Logger } from "@/logger";

// pipeline
export {
  // normalize
  type NormalizeConfig,
  // format
  type FormatConfig,
  formatTimestamp,
  formatLevel,
  formatScope,
  formatMeta,
  formatContext,
  // render
  type RenderConfig,
  type RenderOptions,
  renderField,
} from "@/pipeline";

// types
export type { LogHook as LogryHook } from "@/shared/types/log-hook";
export type { LogPlugin as LogryPlugin } from "@/shared/types/log-plugin";
export type { LogContext as LogryContext } from "@/shared/types/log-context";
