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
export type LogPayload<TContext extends Context = Context> = {
  id?: string;
  level: LogLevel;
  scope: Scope;
  message: string;
  meta?: unknown;
  context?: TContext;
  outputConfig?: OutputConfig;
};

/** Method signature for logging with level */
export type LogWithLevelMethod = ({
  level,
  message,
  meta,
  options,
}: {
  level: LogLevel;
  message: string;
  meta?: unknown;
  options?: LogOptions;
}) => void;

/** Method signature for logging */
export type LogMethod = (
  message: string,
  meta?: unknown,
  options?: LogOptions,
) => void;

/** Options to customize logging behavior at call time. */
export type LogOptions<TContext extends Context = Context> = {
  scope?: string | string[];
  context?: TContext;
  outputConfig?: OutputConfig;
};

export type Context = Record<string, unknown>;
export type Scope = string[];
