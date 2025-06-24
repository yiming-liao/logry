import type { Level } from "@/shared/types";
import { LEVEL_CONFIG } from "@/shared/constants";

/**
 * Add a trailing space if the log level string length is 4 and level is known.
 * @param {string} level - Formatted level string.
 * @param {Level} rawLevel - Raw log level key.
 * @returns {string} Possibly padded level string.
 */
export const addLevelPadding = (level: string, rawLevel: Level): string => {
  if (rawLevel in LEVEL_CONFIG && rawLevel.length === 4) {
    return level + " ";
  }
  return level;
};
