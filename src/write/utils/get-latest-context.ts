import { CONTEXT_SEPARATOR } from "../../constants";

/**
 * Returns the last segment of a context string split by a separator.
 *
 * @param context - The full context string.
 * @param separator - Separator to split the context (default: CONTEXT_SEPARATOR).
 * @returns The last segment if multiple segments exist; otherwise the original context.
 */
export const getLatestContext = (
  context?: string,
  separator = CONTEXT_SEPARATOR,
): string | undefined => {
  if (!context) {
    return context;
  }
  const segments = context.split(separator);
  return segments.length > 1 ? segments[segments.length - 1] : context;
};
