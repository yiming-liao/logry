import type { LOG_LEVELS, PLATFORM } from "./constants";
import type { OutputConfig } from "./output-config-types";

/** Type representing all allowed log levels from LOG_LEVELS. */
export type LogLevel = (typeof LOG_LEVELS)[number];
/** Type representing supported platforms/environments from PLATFORM. */
export type Platform = (typeof PLATFORM)[number];

/**
 * Represents the full log entry data passed through the logging pipeline.
 *
 * Used internally by logging methods and handlers.
 */
export type LogPayload = {
  id?: string;
  level: LogLevel;
  context?: string;
  message: string;
  meta?: unknown;
  outputConfig?: OutputConfig;
};

/** Method signature for logging with level */
export type LogWithLevelMethod = (
  level: LogLevel,
  message: string,
  meta?: unknown,
  options?: LogOptions,
) => void;

/** Method signature for logging */
export type LogMethod = (
  message: string,
  meta?: unknown,
  options?: LogOptions,
) => void;

/** Options to customize logging behavior at call time. */
export type LogOptions = {
  context?: string;
  outputConfig?: OutputConfig;
};
