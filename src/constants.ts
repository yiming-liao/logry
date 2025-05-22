import type { LogLevel, Platform } from "./types";

/* Log levels */
export const LOG_LEVELS = ["silent", "error", "warn", "info", "debug"] as const;

export const LOG_LEVELS_UPPERCASE = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  debug: "DEBUG",
  trace: "TRACE",
};

export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

export const NODE_LEVEL_COLOR_CODE: Record<
  Exclude<LogLevel, "silent">,
  number
> = {
  error: 9,
  warn: 214,
  info: 34,
  debug: 33,
};
export const DEFAULT_NODE_LEVEL_COLOR_CODE: number = 15;

export const BROWSER_LEVEL_COLOR_STRING: Record<
  Exclude<LogLevel, "silent">,
  string
> = {
  error: "rgba(230, 55, 90, 0.75)",
  warn: "rgba(231, 151, 65, 0.75)",
  info: "rgba(76, 186, 123, 0.75)",
  debug: "rgba(114, 137, 191, 0.93)",
};

export const CONTEXT_SEPARATOR = " > ";

/* Default logger values */
export const DEFAULT_LOGGER_ID: string = "default";
export const DEFAULT_LOG_LEVEL: LogLevel = "warn";

/* Platform options */
export const PLATFORM = ["auto", "node", "browser"] as const;

/* Write config defaults */
export const DEFAULT_PLATFORM: Platform = "auto";
export const DEFAULT_HIDE_ID: boolean = false;
export const DEFAULT_HIDE_CONTEXT: boolean = false;
export const DEFAULT_SHOW_ONLY_LATEST_CONTEXT: boolean = false;
export const DEFAULT_HIDE_DATE: boolean = false;
export const DEFAULT_META_DEPTH: number = 2;
export const DEFAULT_BORDER_WIDTH: number = 0;
export const DEFAULT_USE_COLOR: boolean = true;
