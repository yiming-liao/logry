import type { LogLevel } from "../../../types";
import { LOG_LEVELS } from "../../../constants";

/**
 * Validate output payload before logging.
 *
 * @param level - Log level to validate.
 * @param message - Log message string.
 * @throws Error when level is invalid or message is empty.
 */
export function validateOutputPayload({
  level,
  message,
}: {
  level: LogLevel;
  message: string;
}): void {
  // Ensure level is a valid string and exists in allowed log levels
  if (!(typeof level === "string" && LOG_LEVELS.includes(level))) {
    throw new Error(`[logry] Invalid log level: ${level}`);
  }

  // Ensure message is a non-empty string
  if (!message?.trim()) {
    throw new Error("[logry] 'message' are required and cannot be empty.");
  }
}
