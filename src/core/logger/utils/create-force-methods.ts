import type { LogOverloads, LogOptions } from "@/core/logger/types";
import type { Level } from "@/shared/types";
import { parseLogArgs } from "@/core/logger/base-logger/utils/parse-log-args";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

/**
 * Creates logging methods for all levels except "silent".
 * These methods always log regardless of effective log level.
 *
 * @param log - The core logging function to call with log options.
 * @returns An object with bound log methods for each level.
 */
export const createForceMethods = (
  log: (logOptions: LogOptions) => void,
  id?: string,
): Record<Exclude<Level, "silent">, LogOverloads> => {
  // Create a bound log method for a specific level without filtering
  const logWithLevel = (level: Level): LogOverloads => {
    assertValidLevel(level);
    return (...args: unknown[]) => {
      const { message, meta, options } = parseLogArgs(...args);
      log({ level, message, meta, options, id });
    };
  };

  return {
    trace: logWithLevel("trace"),
    debug: logWithLevel("debug"),
    info: logWithLevel("info"),
    warn: logWithLevel("warn"),
    error: logWithLevel("error"),
    fatal: logWithLevel("fatal"),
  };
};
