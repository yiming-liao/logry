import type { Level } from "@/shared/types";
import { internalError } from "@/internal";
import { LEVEL_CONFIG } from "@/shared/constants";

/**
 * Validate that the provided log level exists in the priority map.
 * @param level - The log level to validate.
 * @throws Will throw an error if the level is not valid.
 */
export const assertValidLevel = (level?: Level): void => {
  if (level !== undefined && !(level in LEVEL_CONFIG)) {
    return internalError({ message: `Invalid log level: ${level}` });
  }
};
