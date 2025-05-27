import { DEFAULT_LOGGER_ID } from "./constants";
import { getOrCreateLogger } from "./factory";

// === Types ===
export {
  LogLevel,
  Platform,
  LogPayload,
  LogWithLevelMethod,
  LogMethod,
  LogOptions,
} from "./types";
export {
  StringifyMeta,
  BaseOutputConfig,
  NodeOutputConfig,
  BrowserOutputConfig,
  OutputConfig,
} from "./output-config-types";
export { NodeFormatter, BrowserFormatter } from "./formatter-types";

// === Constants ===
export {
  // Default log level
  DEFAULT_LOG_LEVEL,
  DEFAULT_LOGGER_ID,
  // Default config
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_DATE,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_BOTTOM_LINE_BREAKS,
  DEFAULT_TOP_LINE_BREAKS,
  DEFAULT_STRINGIFY_META,
  // Node write config
  DEFAULT_META_DEPTH,
  DEFAULT_TOP_BORDER,
  DEFAULT_BOTTOM_BORDER,
  DEFAULT_USE_COLOR,
} from "./constants";

// === Core Classes & API ===
export { Logger } from "./logger";
export { getOrCreateLogger, resetCoreMap } from "./factory";

// === Main Entry ===
export const logry = getOrCreateLogger;

// === Core Utilities ===
export { dispatchLog } from "./log-pipeline/dispatch";

// === Default preset ===
export const defaultLogger = getOrCreateLogger({ id: DEFAULT_LOGGER_ID });
// Force logging methods (always output regardless of log level)
export const debug = defaultLogger.force.debug;
export const info = defaultLogger.force.info;
export const warn = defaultLogger.force.warn;
export const error = defaultLogger.force.error;

// === Handler ===
export { HandlerManager } from "./handler";
// === Handler Types ===
export {
  HandlerConfig,
  Handler,
  FlushStrategy,
  ErrorCallback,
} from "./handler/handler-types";

// === Dev tools ===
export {
  inspectOutputConfig,
  inspectHandlerConfig,
  inspectLoggerCores,
} from "../devtools";
