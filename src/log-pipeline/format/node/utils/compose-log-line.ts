/**
 * Compose a log line string with or without ANSI color codes.
 *
 * @param {Object} parts - The parts of the log line.
 * @param {string} parts.timestampTag - The timestamp string.
 * @param {string} parts.idTag - The ID string.
 * @param {string} parts.levelTag - The log level string.
 * @param {string} parts.contextTag - The context string.
 * @param {string} parts.linesBeforeMessage - Newline characters before the message.
 * @param {string} parts.messageLine - The main log message.
 * @param {boolean} useColor - Whether to add ANSI color codes.
 * @param {number} colorCode - The color code to use for the level tag.
 * @returns {string} The composed log line.
 */
export const composeLogLine = (
  parts: {
    timestampTag: string;
    idTag: string;
    levelTag: string;
    contextTag: string;
    linesBeforeMessage: string;
    messageLine: string;
  },
  useColor: boolean,
  colorCode: number,
): string => {
  if (!useColor) {
    // Compose plain string without color
    return (
      parts.timestampTag +
      parts.idTag +
      parts.levelTag +
      parts.contextTag +
      parts.linesBeforeMessage +
      parts.messageLine
    );
  }

  // Compose string with ANSI color codes
  const coloredTimestamp = `\x1b[38;5;245m${parts.timestampTag}\x1b[0m`;
  const coloredLevel = `\x1b[38;5;${colorCode}m${parts.levelTag}\x1b[0m`;
  const coloredContext = `\x1b[38;5;245m${parts.contextTag}\x1b[0m`;

  return (
    coloredTimestamp +
    parts.idTag +
    coloredLevel +
    coloredContext +
    parts.linesBeforeMessage +
    parts.messageLine
  );
};
