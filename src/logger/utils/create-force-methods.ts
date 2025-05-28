import type { LogLevel, LogMethod, LogWithLevelMethod } from "../../types";
import { createLogWithLevel } from "./create-log-with-level";

/**
 * Create logging methods that always log regardless of config level.
 *
 * @param log - The base log function with level support.
 * @returns An object with force logging methods: error, warn, info, debug.
 */
export const createForceMethods = (
  log: LogWithLevelMethod,
): Record<Exclude<LogLevel, "silent">, LogMethod> => {
  // Create log methods without filtering by config level
  const logWithLevel = createLogWithLevel(log);

  return {
    error: logWithLevel("error"),
    warn: logWithLevel("warn"),
    info: logWithLevel("info"),
    debug: logWithLevel("debug"),
  };
};
