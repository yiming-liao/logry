/**
 * Adds ANSI color code to input and resets style after.
 *
 * @param input - Text to colorize.
 * @param ansiColor - ANSI escape sequence.
 * @returns Colored text if ansiColor is provided, otherwise original input.
 */
export const addAnsiColor = (input: string, ansiColor?: string): string => {
  if (!input) {
    return "";
  }

  if (!ansiColor) {
    return input;
  }

  return `${ansiColor}${input}\x1b[0m`;
};
