import type {
  BoundLogMethod,
  LogOptions,
  LogRuntimeOptions,
} from "@/core/logger/logger-types";
import type { Level } from "@/shared/types";
import { shouldLog } from "@/core/logger/utils/should-log";

/**
 * Creates a bound logging function for a specific log level.
 * It logs only if the message level passes the effective level filter.
 *
 * @param log - The actual log function to invoke.
 * @param effectiveLevel - The minimum log level to allow.
 * @param level - The level for this bound log method.
 * @returns A function that logs messages if allowed.
 */
export const createBoundLogMethod = (
  log: (logOptions: LogOptions) => void,
  effectiveLevel: Level,
  level: Level,
): BoundLogMethod => {
  return (message: string, meta?: unknown, options?: LogRuntimeOptions) => {
    // Check if the message level passes the filter
    if (shouldLog({ effectiveLevel, level })) {
      log({ level, message, meta, options });
    }
  };
};
