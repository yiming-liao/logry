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

/**
 * Configuration for log levels including priority and colors.
 *
 * - priority: higher means more verbose
 * - ansiStyle: terminal color code
 * - cssStyle: browser color code (RGBA)
 */
export const LEVEL_CONFIG: Record<
  Level,
  { priority: number; ansiStyle: string; cssStyle: string }
> = {
  silent: { priority: Infinity, ansiStyle: "", cssStyle: "" },
  trace: {
    priority: 10,
    ansiStyle: "",
    cssStyle: "rgba(150, 150, 150, 0.6)",
  },
  debug: {
    priority: 20,
    ansiStyle: "\x1b[38;5;39m",
    cssStyle: "rgba(112, 152, 215, 0.93)",
  },
  info: {
    priority: 30,
    ansiStyle: "\x1b[38;5;114m",
    cssStyle: "rgba(76, 186, 123, 0.75)",
  },
  warn: {
    priority: 40,
    ansiStyle: "\x1b[38;5;215m",
    cssStyle: "rgba(231, 151, 65, 0.75)",
  },
  error: {
    priority: 50,
    ansiStyle: "\x1b[38;5;9m",
    cssStyle: "rgba(250, 72, 98, 0.75)",
  },
  fatal: {
    priority: 60,
    ansiStyle: "\x1b[101m\x1b[30m",
    cssStyle: "rgba(220, 20, 60, 0.9)",
  },
};
