import type { FormatBrowserLogPayload } from "./format-browser-log-types";
import { LOG_LEVELS_UPPERCASE } from "../../../constants";
import { formatScope } from "../utils/format-scope";
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
  scope: scopeArray,
  message,
  meta,
  context,
  hideDate,
  hideId,
  hideScope,
  scopeSeparator,
  showOnlyLatestScope,
  messagePrefix,
  messageLineBreaks,
  formatter,
}: FormatBrowserLogPayload): string[] => {
  const timestampRaw = new Date();
  const timestamp = formatTimestamp(hideDate, undefined, timestampRaw);

  const { scopeString, lastScope } = formatScope(scopeArray, scopeSeparator);
  const scope: string = showOnlyLatestScope ? lastScope : scopeString;

  // Use custom formatter if provided
  if (typeof formatter === "function") {
    return formatter({
      timestampRaw,
      timestamp,
      id,
      level,
      scope,
      message,
      meta,
      context,
    });
  }

  // Prepare formatted tags
  const timestampTag = timestamp;
  const idTag = id && !hideId ? id : "";
  const levelTag = LOG_LEVELS_UPPERCASE[level].padEnd(5);
  const scopeTag = scope && !hideScope ? scope : "";

  // Add line breaks before message if needed
  const linesBeforeMessage = "\n".repeat(messageLineBreaks);

  // Compose the log line
  const logLine = composeLogLine({
    timestamp: timestampTag,
    id: idTag,
    level: levelTag,
    scope: scopeTag,
    message,
    messagePrefix,
    linesBeforeMessage,
  });

  // Compose the log styles
  const styles = composeLogStyles({
    level,
    showId: !!idTag,
    showContext: !!scopeTag,
  });

  return [logLine, ...styles];
};
