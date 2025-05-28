import { DEFAULT_SCOPE_SEPARATOR } from "../constants";

const SEPARATOR = "::?__CTX_SEP__?::"; // Internal separator used for encoded parts

/**
 * Provides utility functions to encode, decode, join, split, and display scope strings.
 * Scope parts are URI encoded and joined with a custom internal separator.
 */
export const scopeEncoder = {
  /**
   * Joins an array of scope parts into a single encoded scope string.
   * Non-string or undefined values are filtered out.
   *
   * @param parts - Array of scope strings to join.
   * @returns A single URI-encoded scope string.
   */
  joinScope(parts: (string | undefined)[]): string {
    return parts
      .filter((s): s is string => typeof s === "string") // 1. Filter out non-string parts
      .map((s) => encodeURIComponent(s)) // 2. Encoded each scope part
      .join(SEPARATOR); // 3. Join with SEPARATOR
  },

  /**
   * Splits an encoded scope string back into individual decoded scope parts.
   *
   * @param encodedScope - The encoded scope string to split.
   * @returns Array of decoded scope parts.
   */
  splitScope(encodedScope?: string): string[] {
    if (!encodedScope) return [];
    return encodedScope
      .split(SEPARATOR) // 1. Split by internal separator
      .map((p) => decodeURIComponent(p)); // 2. Decode each part
  },

  /**
   * Converts an encoded scope string into displayable form,
   * returning the full scope path and the last scope segment.
   *
   * @param encodedScope - The encoded scope string.
   * @param scopeSeparator - Custom separator to join scope for display. Defaults to "::".
   * @returns An object containing the full display string and the last scope.
   */
  displayScope(
    encodedScope?: string,
    scopeSeparator: string = DEFAULT_SCOPE_SEPARATOR, // Can be customize
  ): {
    fullScope: string;
    lastScope: string;
  } {
    const parts = this.splitScope(encodedScope);
    const fullScope = parts.join(scopeSeparator);
    const lastScope = parts[parts.length - 1] ?? "";
    return { fullScope, lastScope };
  },
};
