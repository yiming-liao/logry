import type { FormatNodeLogPayload } from "./format-node-log-types";
import {
  LOG_LEVELS_UPPERCASE,
  NODE_LEVEL_COLOR_CODE,
  DEFAULT_NODE_LEVEL_COLOR_CODE,
} from "../../../constants";
import { contextEncoder } from "../../../utils/context-encoder";
import { formatTimestamp } from "../utils/format-timestamp";
import { composeLogLine } from "./utils/compose-log-line";

/**
 * Format a node log entry as a single string line.
 *
 * @param {FormatNodeLogPayload} params - The log payload and options.
 * @returns {string} The formatted log line.
 */
export const formatNodeLog = ({
  id,
  level,
  context,
  message,
  meta,
  hideDate,
  hideId,
  hideContext,
  contextSeparator,
  showOnlyLatestContext,
  messagePrefix,
  messageLineBreaks,
  useColor,
  formatter,
}: FormatNodeLogPayload): string => {
  // Extract full and last context string based on separator
  const { fullContext, lastContext } = contextEncoder.displayContext(
    context,
    contextSeparator,
  );

  // Decide which context to display
  context = showOnlyLatestContext ? lastContext : fullContext;

  // Use custom formatter if provided
  if (typeof formatter === "function") {
    return formatter({
      timestamp: formatTimestamp(hideDate),
      id,
      level,
      context,
      message,
      meta,
    });
  }

  // Prepare formatted tags
  const timestampTag = `[${formatTimestamp(hideDate)}] `;
  const idTag = id && !hideId ? `[${id}] ` : "";
  const levelTag = `[${LOG_LEVELS_UPPERCASE[level]}]`.padEnd(8);
  const contextTag = context && !hideContext ? `(${context}) ` : "";
  const messageLine = `${messagePrefix}${message} `;

  // Add line breaks before message if needed
  const linesBeforeMessage = "\n".repeat(messageLineBreaks);

  // Get color code based on level, or use default
  const colorCode =
    NODE_LEVEL_COLOR_CODE[level] || DEFAULT_NODE_LEVEL_COLOR_CODE;

  // Compose the full log line
  return composeLogLine(
    {
      timestampTag,
      idTag,
      levelTag,
      contextTag,
      linesBeforeMessage,
      messageLine,
    },
    useColor ?? false,
    colorCode,
  );
};
