/**
 * Serializes an Error into a plain object.
 * Includes the message and a trimmed stack trace limited to `stackLines`.
 */
export const serializeError = (error: Error, stackLines: number) => ({
  message: error.message,
  stack: error.stack
    ? error.stack.split("\n").slice(0, stackLines).join("\n")
    : undefined,
});
