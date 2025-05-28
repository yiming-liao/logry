import type { FormatNodeLogPayload } from "./format-node-log-types";
import {
  LOG_LEVELS_UPPERCASE,
  NODE_LEVEL_COLOR_CODE,
  DEFAULT_NODE_LEVEL_COLOR_CODE,
} from "../../../constants";
import { formatScope } from "../utils/format-scope";
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
  useColor,
  formatter,
}: FormatNodeLogPayload): string => {
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
  const timestampTag = `[${timestamp}] `;
  const idTag = id && !hideId ? `[${id}] ` : "";
  const levelTag = `[${LOG_LEVELS_UPPERCASE[level]}]`.padEnd(8);
  const scopeTag = scope && !hideScope ? `(${scope}) ` : "";
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
      scopeTag,
      linesBeforeMessage,
      messageLine,
    },
    useColor ?? false,
    colorCode,
  );
};
