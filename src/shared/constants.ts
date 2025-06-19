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
 * - ansiStyle: terminal color code
 * - cssColor: browser color code (RGBA)
 */
export const LEVEL_CONFIG: Record<
  Level,
  { priority: number; ansiStyle: string; cssColor: string }
> = {
  silent: { priority: 0, ansiStyle: "", cssColor: "" },
  trace: {
    priority: 10,
    ansiStyle: "",
    cssColor: "rgba(150, 150, 150, 0.6)",
  },
  debug: {
    priority: 20,
    ansiStyle: "\x1b[38;5;39m",
    cssColor: "rgba(112, 152, 215, 0.93)",
  },
  info: {
    priority: 30,
    ansiStyle: "\x1b[38;5;114m",
    cssColor: "rgba(76, 186, 123, 0.75)",
  },
  warn: {
    priority: 40,
    ansiStyle: "\x1b[38;5;215m",
    cssColor: "rgba(231, 151, 65, 0.75)",
  },
  error: {
    priority: 50,
    ansiStyle: "\x1b[38;5;9m",
    cssColor: "rgba(250, 72, 98, 0.75)",
  },
  fatal: {
    priority: 60,
    ansiStyle: "\x1b[101m\x1b[30m",
    cssColor: "rgba(220, 20, 60, 0.9)",
  },
};

/** Default logger identifier when none is provided. */
export const DEFAULT_LOGGER_ID: string = "default";

/** Default log level used if none is specified. */
export const DEFAULT_LOG_LEVEL: Level = "warn";
