import type { FormatBrowserLogPayload } from "./format-browser-log-types";
import { LOG_LEVELS_UPPERCASE } from "../../../constants";
import { contextEncoder } from "../../../utils/context-encoder";
import { formatTimestamp } from "../utils/format-timestamp";
import { composeLogLine } from "./utils/compose-log-line";
import { composeLogStyles } from "./utils/compose-log-styles";

/**
 * Format a browser log entry as a single string line.
 *
 * @param {FormatBrowserLogPayload} params - The log payload and options.
 * @returns {string} The formatted log line.
 */
export const formatBrowserLog = ({
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
  formatter,
}: FormatBrowserLogPayload): string[] => {
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
  const timestampTag = formatTimestamp(hideDate);
  const idTag = id && !hideId ? id : "";
  const levelTag = LOG_LEVELS_UPPERCASE[level].padEnd(5);
  const contextTag = context && !hideContext ? context : "";

  // Add line breaks before message if needed
  const linesBeforeMessage = "\n".repeat(messageLineBreaks);

  // Compose the log line
  const logLine = composeLogLine({
    timestamp: timestampTag,
    id: idTag,
    level: levelTag,
    context: contextTag,
    message,
    messagePrefix,
    linesBeforeMessage,
  });

  // Compose the log styles
  const styles = composeLogStyles({
    level,
    showId: !!idTag,
    showContext: !!contextTag,
  });

  return [logLine, ...styles];
};
