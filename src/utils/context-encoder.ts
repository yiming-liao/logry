import { DEFAULT_CONTEXT_SEPARATOR } from "../constants";

const SEPARATOR = "::?__CTX_SEP__?::"; // Internal separator used for encoded parts

/**
 * Provides utility functions to encode, decode, join, split, and display context strings.
 * Context parts are URI encoded and joined with a custom internal separator.
 */
export const contextEncoder = {
  /**
   * Joins an array of context parts into a single encoded context string.
   * Non-string or undefined values are filtered out.
   *
   * @param parts - Array of context strings to join.
   * @returns A single URI-encoded context string.
   */
  joinContext(parts: (string | undefined)[]): string {
    return parts
      .filter((s): s is string => typeof s === "string") // 1. Filter out non-string parts
      .map((s) => encodeURIComponent(s)) // 2. Encoded each context part
      .join(SEPARATOR); // 3. Join with SEPARATOR
  },

  /**
   * Splits an encoded context string back into individual decoded context parts.
   *
   * @param encodedContext - The encoded context string to split.
   * @returns Array of decoded context parts.
   */
  splitContext(encodedContext?: string): string[] {
    if (!encodedContext) return [];
    return encodedContext
      .split(SEPARATOR) // 1. Split by internal separator
      .map((p) => decodeURIComponent(p)); // 2. Decode each part
  },

  /**
   * Converts an encoded context string into displayable form,
   * returning the full context path and the last context segment.
   *
   * @param encodedContext - The encoded context string.
   * @param contextSeparator - Custom separator to join context for display. Defaults to "::".
   * @returns An object containing the full display string and the last context.
   */
  displayContext(
    encodedContext?: string,
    contextSeparator: string = DEFAULT_CONTEXT_SEPARATOR, // Can be customize
  ): {
    fullContext: string;
    lastContext: string;
  } {
    const parts = this.splitContext(encodedContext);
    const fullContext = parts.join(contextSeparator);
    const lastContext = parts[parts.length - 1] ?? "";
    return { fullContext, lastContext };
  },
};
