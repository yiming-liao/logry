import { LEVELS, type Level } from "@/shared/level";

/**
 * Ensures the given value is a valid log level.
 * Throws an error if the level is not recognized.
 */
export const assertLevel = (level: Level): void => {
  if (!LEVELS.includes(level)) {
    throw new Error(`Invalid log level: ${level}`);
  }
};
