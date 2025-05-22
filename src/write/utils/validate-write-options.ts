import type { LogLevel } from "../../types";
import { LOG_LEVELS } from "../../constants";

/**
 * Validates required options for writing a log.
 *
 * @param level - Log level string, must be in LOG_LEVELS.
 * @param message - Main log content.
 * @param borderWidth - Optional border width, must be a non-negative number.
 * @throws Will throw if required fields are missing or values are invalid.
 */
export function validateWriteOptions({
  level,
  message,
  borderWidth,
}: {
  level: LogLevel;
  message: string;
  borderWidth?: number;
}): void {
  // Validate log level
  if (!(typeof level === "string" && LOG_LEVELS.includes(level))) {
    throw new Error(`[logry] Invalid log level: ${level}`);
  }

  // Required fields
  if (!message?.trim()) {
    throw new Error("[logry] 'message' are required and cannot be empty.");
  }

  // Validate border width (if provided)
  if (borderWidth !== undefined) {
    if (borderWidth < 0 || !Number.isFinite(borderWidth)) {
      throw new Error(
        `[logry] Invalid borderWidth value: ${borderWidth}. It must be a positive number.`,
      );
    }
  }
}
