import type { Level } from "@/shared/types";
import { LEVEL_CONFIG } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

/**
 * Determines whether a message should be logged based on its level and the configured level.
 *
 * @param effectiveLevel - The minimum log level to allow.
 * @param level - The log level of the message.
 * @returns True if the message should be logged.
 */
export const shouldLog = ({
  effectiveLevel,
  level,
}: {
  effectiveLevel: Level;
  level: Level;
}): boolean => {
  // Ensure both levels are valid
  assertValidLevel(effectiveLevel);
  assertValidLevel(level);

  // Log if message level is equal or higher priority than config level
  return LEVEL_CONFIG[level].priority >= LEVEL_CONFIG[effectiveLevel].priority;
};
