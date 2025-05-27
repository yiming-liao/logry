/**
 * Formats an Error object into a simplified structure.
 *
 * @param error - The error to format.
 * @param stackLines - Number of stack trace lines to keep (default: 3).
 * @returns An object with the error message and trimmed stack trace.
 */
export const formatError = (error: Error, stackLines = 3) => ({
  message: error.message, // Extract error message
  stack: error.stack
    ? error.stack.split("\n").slice(0, stackLines).join("\n") // Keep top N lines of stack
    : undefined, // Fallback if no stack
});
