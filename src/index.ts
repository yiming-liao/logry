import { DEFAULT_LOGGER_ID } from "./constants";
import { logry } from "./factory";

// Types
export { LogLevel, LogMeta, LogOptions, Platform, WriteConfig } from "./types";

// Constants
export {
  // Default log level
  DEFAULT_LOG_LEVEL,
  // Default config
  DEFAULT_PLATFORM,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_DATE,
  // Default node condig
  DEFAULT_META_DEPTH,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_USE_COLOR,
} from "./constants";

// Class
export { Logger } from "./logger";

// Factory methods
export { logry, resetCoreMap, getAllCores } from "./factory";

// Write log function
export { write } from "./write";

// Default logger
export const logger = logry({ id: DEFAULT_LOGGER_ID });

// Force logging methods (always output regardless of log level)
export const debug = logger.force.debug;
export const info = logger.force.info;
export const warn = logger.force.warn;
export const error = logger.force.error;
