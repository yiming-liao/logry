import type { LogLevel } from "../types";
import { LOG_LEVEL_PRIORITY } from "../constants";

/**
 * Validate that the provided log level exists in the priority map.
 * @param level - The log level to validate.
 * @throws Will throw an error if the level is not valid.
 */
export const assertValidLevel = (level: LogLevel): void => {
  if (!Object.prototype.hasOwnProperty.call(LOG_LEVEL_PRIORITY, level)) {
    throw new Error(`[logry] Invalid log level: ${level}`);
  }
};
