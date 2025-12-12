import { LEVEL_CONFIG, type Level } from "@/shared/level";
import { assertLevel } from "@/shared/utils/assert-level";

/**
 * Determines whether a log entry should be emitted.
 * A message is logged only if its level has equal or higher priority
 * compared to the logger’s effective level.
 *
 * Both levels are validated before comparison.
 */
export const shouldLog = ({
  effectiveLevel,
  level,
}: {
  effectiveLevel: Level;
  level: Level;
}): boolean => {
  // Ensure both levels are valid
  assertLevel(effectiveLevel);
  assertLevel(level);

  // Log if message level is equal or higher priority than config level
  return LEVEL_CONFIG[level].priority >= LEVEL_CONFIG[effectiveLevel].priority;
};
