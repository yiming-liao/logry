import type { FormatOutputOptions } from "./format-output-types";
import {
  BROWSER_LEVEL_COLOR_STRING,
  LOG_LEVELS_UPPERCASE,
} from "../../../constants";
import { formatTimestamp } from "../../utils/format-timestamp";
import { getLatestContext } from "../../utils/get-latest-context";

/**
 * Formats a structured log message for browser console output.
 *
 * @param id - Unique identifier for the log entry.
 * @param level - Log level (e.g., "info", "error").
 * @param context - Optional context string, e.g., module or filename.
 * @param message - Main log message content.
 * @param hideDate - Whether to hide the timestamp.
 * @param hideId - Whether to hide the ID tag.
 * @param hideContext - Whether to hide the context tag.
 * @param showOnlyLatestContext - Whether to show only the last segment of the context.
 * @returns A tuple of [template string, ...style strings] to be passed into `console.log`.
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
}: FormatOutputOptions): string[] => {
  context = showOnlyLatestContext ? getLatestContext(context) : context;

  // Format individual tags
  const timestampTag = formatTimestamp(hideDate);
  const idTag = id && !hideId ? id : "";
  const levelTag = LOG_LEVELS_UPPERCASE[level]?.padEnd(5);
  const contextTag = context && !hideContext ? context : "";
  const formattedMessage = `• ${message}`;

  // Determine color style
  const colorString = BROWSER_LEVEL_COLOR_STRING[level] ?? "";

  // Style segments
  const FONT_STYLE =
    "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;";
  const PADDING_STYLE = "padding: 4px 8px;";
  const TAG_BORDER_STYLE = "border: 1px solid gray;";
  const TIMESTAMP_BORDER_STYLE = `border-left: 8px solid ${colorString};`;
  const ID_BACKGROUND_STYLE = `background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px)`;
  const LEVEL_BACKGROUND_STYLE = colorString && `background:${colorString};`;

  return [
    // Log format with style segments
    `%c${timestampTag}%c${idTag}%c${levelTag}%c${contextTag}%c\n\n${formattedMessage}\n\n`,

    // Style: timestamp (with colored border)
    `${FONT_STYLE}${PADDING_STYLE}${TAG_BORDER_STYLE}${TIMESTAMP_BORDER_STYLE}`,

    // Style: ID tag (blurred background, conditional)
    idTag
      ? `${FONT_STYLE}${PADDING_STYLE}${TAG_BORDER_STYLE}${ID_BACKGROUND_STYLE}`
      : "",

    // Style: level tag (colored background)
    `${FONT_STYLE}${PADDING_STYLE}${TAG_BORDER_STYLE}${LEVEL_BACKGROUND_STYLE}`,

    // Style: context tag (if visible)
    contextTag ? `${FONT_STYLE}${PADDING_STYLE}${TAG_BORDER_STYLE}` : "",

    // Style: message block
    `${FONT_STYLE}${PADDING_STYLE}`,
  ];
};
