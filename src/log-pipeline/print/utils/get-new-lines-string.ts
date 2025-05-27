/**
 * Generate a string containing multiple newline characters.
 *
 * @param count - Number of newline characters to return.
 * @returns A string of newlines. Empty if count <= 0.
 */
export const getNewLinesString = (count = 0): string => {
  // Return repeated newlines or empty string
  return count > 0 ? "\n".repeat(count) : "";
};
