/**
 * Adds spaces after the input string.
 *
 * @param input - The original string.
 * @param spaceCount - Number of spaces to append (default is 1).
 * @returns The string with appended spaces, or empty string if input is empty.
 */
export const addSpaceAfter = (input: string, spaceCount?: number): string => {
  if (!input) {
    return "";
  }

  if (!spaceCount || spaceCount <= 0) {
    return input;
  }

  return `${input}${" ".repeat(spaceCount)}`;
};
