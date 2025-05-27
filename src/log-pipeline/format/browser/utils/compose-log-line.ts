/**
 * Composes a formatted log line string for styled console output.
 *
 * @param timestamp - ISO string of the log time.
 * @param id - Unique log identifier.
 * @param level - Log level (e.g., "info", "error").
 * @param context - Context or source of the log.
 * @param message - Main log message.
 * @param messagePrefix - Optional prefix before the message (e.g., symbols).
 * @param linesBeforeMessage - Number of line breaks before the message.
 * @returns A styled log string with `%c` formatting tokens.
 */
export const composeLogLine = ({
  timestamp,
  id,
  level,
  context,
  message,
  messagePrefix,
  linesBeforeMessage,
}: {
  timestamp: string;
  id: string;
  level: string;
  context: string;
  message: string;
  messagePrefix: string;
  linesBeforeMessage: string;
}) => {
  // Combine prefix with the message body
  const msg = `${messagePrefix}${message}`;

  // Return the formatted string using %c tokens for styling
  return `%c${timestamp}%c${id}%c${level}%c${context}%c${linesBeforeMessage}${msg}`;
};
