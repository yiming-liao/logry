/**
 * Serialize an Error into a minimal structure.
 *
 * @param error - The error object.
 * @param stackLines - How many stack trace lines to keep.
 * @returns An object with message and trimmed stack.
 */
export const serializeError = (error: Error, stackLines: number) => ({
  message: error.message,
  stack: error.stack
    ? error.stack.split("\n").slice(0, stackLines).join("\n")
    : undefined,
});
