import type {
  TimestampStyle,
  ScopeSeparator,
  LevelStyle,
} from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";

// Timestamp
export const DEFAULT_TIMESTAMP_STYLE: TimestampStyle = "pretty";
export const DEFAULT_USE_UTC = false;
export const DEFAULT_SHOW_TIME_ONLY = false;

// Level
export const DEFAULT_LEVEL_STYLE: LevelStyle = "upper";
export const UPPERCASE_LEVELS_MAP: Record<Level, string> = {
  silent: "SILENT",
  trace: "TRACE",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  fatal: "FATAL",
};
export const TITLECASE_LEVELS_MAP: Record<Level, string> = {
  silent: "Silent",
  trace: "Trace",
  debug: "Debug",
  info: "Info",
  warn: "Warn",
  error: "Error",
  fatal: "Fatal",
};

// Scope
export const DEFAULT_SCOPE_SEPARATOR: ScopeSeparator = " > ";

// Meta
export const DEFAULT_META_ERROR_STACK_LINES = 3;
