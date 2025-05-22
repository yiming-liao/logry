import type { FormatOutputOptions } from "./format-output-types";
import {
  LOG_LEVELS_UPPERCASE,
  NODE_LEVEL_COLOR_CODE,
  DEFAULT_NODE_LEVEL_COLOR_CODE,
} from "../../../constants";
import { formatTimestamp } from "../../utils/format-timestamp";
import { getLatestContext } from "../../utils/get-latest-context";

/**
 * Formats a structured log message for Node.js console output.
 *
 * @param id - Unique identifier for the log entry.
 * @param level - Log level, e.g., "info", "error", "debug".
 * @param context - Optional context string (e.g., filename, module).
 * @param message - Main message content to log.
 * @param hideDate - Whether to hide the timestamp.
 * @param hideId - Whether to hide the ID tag.
 * @param hideContext - Whether to hide the context tag.
 * @param showOnlyLatestContext - If true, show only the last segment of the context string.
 * @param useColor - Whether to apply ANSI color formatting (default: true).
 * @returns A formatted string suitable for printing to the Node.js console.
 */
export const formatOutput = ({
  id,
  level,
  context,
  message,
  hideDate,
  hideId,
  hideContext,
  showOnlyLatestContext,
  useColor = true,
}: FormatOutputOptions): string => {
  context = showOnlyLatestContext ? getLatestContext(context) : context;

  // Format tags
  const timestampTag = `[${formatTimestamp(hideDate)}] `;
  const idTag = id && !hideId ? `[${id}] ` : "";
  const levelTag = `[${LOG_LEVELS_UPPERCASE[level]}] `.padEnd(7);
  const contextTag = context && !hideContext ? `(${context}) ` : "";

  // Combined output
  const output =
    `${timestampTag}` +
    `${idTag}` +
    `${levelTag}` +
    `${contextTag}` +
    `\n` +
    ` • ${message}`;

  // Not using color or is browser
  if (!useColor) {
    return output;
  }

  // Determine color code
  const colorCode =
    NODE_LEVEL_COLOR_CODE[level] ?? DEFAULT_NODE_LEVEL_COLOR_CODE;

  // Using color
  return (
    `\x1b[38;5;245m${timestampTag}\x1b[0m` +
    `${idTag}` +
    `\x1b[38;5;${colorCode}m${levelTag}\x1b[0m` +
    `\x1b[38;5;245m${contextTag}\x1b[0m` +
    `\n` +
    ` • ${message}`
  );
};
