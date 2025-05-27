import type { LogLevel } from "../../types";
import { LOG_LEVEL_PRIORITY } from "../../constants";
import { assertValidLevel } from "../../utils/assert-valid-level";

/**
 * Determines whether a message should be logged based on its level and the configured level.
 *
 * @param configLevel - The minimum log level to allow.
 * @param level - The log level of the message.
 * @returns True if the message should be logged.
 */
export const shouldLog = ({
  configLevel,
  level,
}: {
  configLevel: LogLevel;
  level: LogLevel;
}): boolean => {
  // Ensure both levels are valid
  assertValidLevel(configLevel);
  assertValidLevel(level);

  // Log if message level is equal or higher priority than config level
  return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[configLevel];
};
