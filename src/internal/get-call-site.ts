/**
 * Gets the caller's location from the stack trace (i.e., the call site).
 *
 * @param err Optional error instance for testability. Defaults to new Error().
 * @returns A single line representing the call site, or undefined if not available.
 */
export const getCallSite = (err: Error = new Error()): string | undefined => {
  return err.stack?.split("\n").slice(2, 3).join().trim();
};
