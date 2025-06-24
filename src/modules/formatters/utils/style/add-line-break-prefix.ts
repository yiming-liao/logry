/**
 * Adds a line break prefix to the input string.
 *
 * @param input - The original string to prefix.
 * @param lineBreaks - Number of line breaks to prepend (default: 0).
 * @returns The string prefixed with line breaks, or the original if none needed.
 */
export const addLineBreakPrefix = (
  input: string,
  lineBreaks: number = 0,
): string => {
  if (!input) {
    return "";
  }

  if (lineBreaks <= 0) {
    return input;
  }

  return `${"\n".repeat(lineBreaks)}${input}`;
};
