import type { LogRuntimeOptions } from "@/core/logger/types";

/**
 * Parses logger arguments into structured message, meta, and options.
 */
export const parseLogArgs = (
  args: unknown[],
): {
  message?: string;
  meta?: unknown;
  options?: LogRuntimeOptions;
} => {
  let message: string | undefined;
  let meta: unknown;
  let options: LogRuntimeOptions | undefined;

  for (const arg of args) {
    if (typeof arg === "string") {
      // Take first string as message
      if (!message) {
        message = arg;
      }
    } else if (arg && typeof arg === "object" && !Array.isArray(arg)) {
      const obj = arg as Record<string, unknown>;

      const isMaybeOptions =
        "scope" in obj ||
        "context" in obj ||
        "normalizerConfig" in obj ||
        "formatterConfig" in obj;

      if (isMaybeOptions && !options) {
        // Identify as runtime options
        options = obj as LogRuntimeOptions;
      } else if (!meta) {
        // Otherwise treat as meta
        meta = obj;
      }
    }
  }

  return { message, meta, options };
};
