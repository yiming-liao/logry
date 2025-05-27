import type { LogLevel, LogMethod, LogWithLevelMethod } from "../../types";
import { shouldLog } from "./should-log";

/**
 * Creates a logger filtered by config level.
 * If no configLevel, logs all messages.
 *
 * @param log - Base log function with level.
 * @param configLevel - Optional minimum level to log.
 * @returns Function that returns a log method for a given level.
 */
export const createLogWithLevel = (
  log: LogWithLevelMethod,
  configLevel?: LogLevel,
): ((level: LogLevel) => LogMethod) => {
  return (level: LogLevel): LogMethod =>
    (message, meta, options) => {
      if (!configLevel || shouldLog({ configLevel, level })) {
        log(level, message, meta, options);
      }
    };
};
