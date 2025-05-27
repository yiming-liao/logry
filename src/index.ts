import { DEFAULT_LOGGER_ID } from "./constants";
import { getOrCreateLogger } from "./factory";

// Types
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
export {
  HandlerConfig,
  Handler,
  FlushStrategy,
  ErrorCallback,
} from "./handler/handler-types";

// Constants
export {
  DEFAULT_LOGGER_ID,
  DEFAULT_LOG_LEVEL,
  // Default output configuration values for all platforms.
  DEFAULT_HIDE_DATE,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_CONTEXT_SEPARATOR,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_MESSAGE_PREFIX,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_TOP_LINE_BREAKS,
  DEFAULT_BOTTOM_LINE_BREAKS,
  DEFAULT_STRINGIFY_META,
  //Node-specific output configuration defaults.
  DEFAULT_META_DEPTH,
  DEFAULT_TOP_BORDER,
  DEFAULT_BOTTOM_BORDER,
  DEFAULT_USE_COLOR,
  //Default handler configuration values.
  DEFAULT_FLUSH_TIMEOUT,
} from "./constants";

// Core Classes & Main API
export { Logger } from "./logger";
export { getOrCreateLogger, resetCoreMap } from "./factory";
export const logry = getOrCreateLogger;

// Default preset
export const defaultLogger = getOrCreateLogger({ id: DEFAULT_LOGGER_ID });
// Force logging methods (always output regardless of log level)
export const debug = defaultLogger.force.debug;
export const info = defaultLogger.force.info;
export const warn = defaultLogger.force.warn;
export const error = defaultLogger.force.error;

// Handler Manager
export { HandlerManager } from "./handler";

// Dev tools
export {
  inspectOutputConfig,
  inspectHandlerConfig,
  inspectLoggerCores,
} from "../devtools";
