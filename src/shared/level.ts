import type { RenderOptions } from "@/pipeline";
import { ansiColor } from "@/shared/utils/ansi-color";

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

// Union type
export type Level = (typeof LEVELS)[number];

const SHARED_CSS = `padding:1px 3px; border-radius:3px; color:white;`;

/** Configuration for log levels including priority and colors. */
export const LEVEL_CONFIG = {
  silent: { priority: Infinity, ansiStyle: (t) => t, cssStyle: "" },
  trace: {
    priority: 10,
    ansiStyle: ansiColor(250),
    cssStyle: `${SHARED_CSS} background-color: rgba(188, 188, 188, 0.75);`,
  },
  debug: {
    priority: 20,
    ansiStyle: ansiColor(74),
    cssStyle: `${SHARED_CSS} background-color: rgba(95, 175, 215, 0.75);`,
  },
  info: {
    priority: 30,
    ansiStyle: ansiColor(114),
    cssStyle: `${SHARED_CSS} background-color: rgba(135, 215, 135, 0.75);`,
  },
  warn: {
    priority: 40,
    ansiStyle: ansiColor(215),
    cssStyle: `${SHARED_CSS} background-color: rgba(255, 175, 95, 0.75);`,
  },
  error: {
    priority: 50,
    ansiStyle: ansiColor(9),
    cssStyle: `${SHARED_CSS} background-color: rgba(255, 0, 0, 0.75);`,
  },
  fatal: {
    priority: 60,
    ansiStyle: (t: string) => `\u001B[48;5;124m\u001B[38;5;15m${t}\u001B[0m`,
    cssStyle: `${SHARED_CSS} background-color: rgba(175, 0, 0, 0.75);`,
  },
} satisfies Record<
  Level,
  {
    priority: number;
    ansiStyle?: RenderOptions["ansiStyle"];
    cssStyle: RenderOptions["cssStyle"];
  }
>;

// Level format map
export const UPPERCASE_LEVELS_MAP = {
  silent: "SILENT",
  trace: "TRACE",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  fatal: "FATAL",
} as const;

export const TITLECASE_LEVELS_MAP = {
  silent: "Silent",
  trace: "Trace",
  debug: "Debug",
  info: "Info",
  warn: "Warn",
  error: "Error",
  fatal: "Fatal",
} as const;

export const ABBR_LEVELS_MAP = {
  silent: "SLT",
  trace: "TRC",
  debug: "DBG",
  info: "INF",
  warn: "WRN",
  error: "ERR",
  fatal: "FTL",
} as const;
