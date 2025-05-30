import type { Level } from "@/shared/types";

/** Log levels ordered from lowest to highest verbosity. */
export const LEVELS = [
  "silent",
  "trace",
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
] as const;

/** Supported runtime platforms for logging environments. */
export const PLATFORMS = ["node", "browser"] as const;

/**
 * Configuration for log levels including priority and colors.
 *
 * - priority: higher means more verbose
 * - ansiColor: terminal color code
 * - cssColor: browser color code (RGBA)
 */
export const LEVEL_CONFIG: Record<
  Level,
  { priority: number; ansiColor: string; cssColor: string }
> = {
  silent: { priority: 0, ansiColor: "", cssColor: "" },
  trace: {
    priority: 10,
    ansiColor: "\x1b[38;5;244m",
    cssColor: "rgba(150, 150, 150, 0.6)",
  },
  debug: {
    priority: 20,
    ansiColor: "\x1b[38;5;33m",
    cssColor: "rgba(112, 152, 215, 0.93)",
  },
  info: {
    priority: 30,
    ansiColor: "\x1b[38;5;34m",
    cssColor: "rgba(76, 186, 123, 0.75)",
  },
  warn: {
    priority: 40,
    ansiColor: "\x1b[38;5;214m",
    cssColor: "rgba(231, 151, 65, 0.75)",
  },
  error: {
    priority: 50,
    ansiColor: "\x1b[38;5;9m",
    cssColor: "rgba(250, 72, 98, 0.75)",
  },
  fatal: {
    priority: 60,
    ansiColor: "\x1b[38;5;196m",
    cssColor: "rgba(220, 20, 60, 0.9)",
  },
};

/** Default logger identifier when none is provided. */
export const DEFAULT_LOGGER_ID: string = "default";

/** Default log level used if none is specified. */
export const DEFAULT_LOG_LEVEL: Level = "warn";
