import type { BoundLogMethod, LogOptions } from "@/core/logger/logger-types";
import type { Level } from "@/shared/types";
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
): Record<Exclude<Level, "silent">, BoundLogMethod> => {
  // Create a bound log method for a specific level without filtering
  const logWithLevel = (level: Level): BoundLogMethod => {
    assertValidLevel(level);
    return (message, meta, options) => log({ level, message, meta, options });
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
