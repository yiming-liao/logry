import type { LogLevel } from "./types";

/** Log levels ordered from lowest to highest verbosity. */
export const LOG_LEVELS = ["silent", "error", "warn", "info", "debug"] as const;
/** Supported runtime platforms for logging environments. */
export const PLATFORM = ["node", "browser"] as const;

/** Uppercase string representation of log levels, useful for console formatting. */
export const LOG_LEVELS_UPPERCASE = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
  trace: "TRACE",
};

/** Priority ranking of log levels, higher number means more verbose. */
export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

/** Node.js terminal color codes for log levels (excluding 'silent'). */
export const NODE_LEVEL_COLOR_CODE: Record<
  Exclude<LogLevel, "silent">,
  number
> = {
  error: 9,
  warn: 214,
  info: 34,
  debug: 33,
};

/** Default color code used in Node.js when no specific color is assigned. */
export const DEFAULT_NODE_LEVEL_COLOR_CODE: number = 15;

/** Browser CSS color strings for log levels (excluding 'silent'). */
export const BROWSER_LEVEL_COLOR_STRING: Record<
  Exclude<LogLevel, "silent">,
  string
> = {
  error: "rgba(250, 72, 98, 0.75)",
  warn: "rgba(231, 151, 65, 0.75)",
  info: "rgba(76, 186, 123, 0.75)",
  debug: "rgba(112, 152, 215, 0.93)",
};

/** Default logger identifier when none is provided. */
export const DEFAULT_LOGGER_ID: string = "default";
/** Default log level used if none is specified. */
export const DEFAULT_LOG_LEVEL: LogLevel = "warn";

// Default output configuration values for all platforms.
export const DEFAULT_HIDE_DATE = false;
export const DEFAULT_HIDE_ID = false;
export const DEFAULT_HIDE_SCOPE = false;
export const DEFAULT_SCOPE_SEPARATOR = " > ";
export const DEFAULT_SHOW_ONLY_LATEST_SCOPE = false;
export const DEFAULT_MESSAGE_PREFIX = " • ";
export const DEFAULT_MESSAGE_LINE_BREAKS = 0;
export const DEFAULT_META_LINE_BREAKS = 0;
export const DEFAULT_TOP_LINE_BREAKS = 0;
export const DEFAULT_BOTTOM_LINE_BREAKS = 0;
export const DEFAULT_STRINGIFY_META = false;

// Node-specific output configuration defaults.
export const DEFAULT_META_DEPTH = 2;
export const DEFAULT_TOP_BORDER = 0;
export const DEFAULT_BOTTOM_BORDER = 0;
export const DEFAULT_USE_COLOR = true;

// Default handler configuration values.
export const DEFAULT_FLUSH_TIMEOUT = 5000; // 5 seconds
