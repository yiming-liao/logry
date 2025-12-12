import type { LogContext } from "@/shared/types/log-context";
import type { LogOptions } from "@/shared/types/log-fn";

// Type guard for LogOptions
const isLogOptions = (obj: unknown): obj is LogOptions => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return (
    "scope" in obj ||
    "context" in obj ||
    "normalizeConfig" in obj ||
    "formatConfig" in obj ||
    "renderConfig" in obj ||
    "printConfig" in obj
  );
};

/**
 * Parses logger arguments into structured message, meta, and options.
 * Can accept up to three arguments in any order:
 * - string → message
 * - object → meta
 * - LogOptions → runtime options
 */
export const parseLogArgs = (
  ...args: unknown[]
): {
  message?: string;
  meta?: LogContext["raw"]["meta"];
  options?: LogOptions;
} => {
  let message: string | undefined;
  let meta: LogContext["raw"]["meta"];
  let options: LogOptions | undefined;

  for (const arg of args) {
    if (typeof arg === "string") {
      if (!message) message = arg;
    } else if (isLogOptions(arg)) {
      if (!options) options = arg;
    } else if (arg && typeof arg === "object" && !Array.isArray(arg)) {
      if (!meta) meta = arg as LogContext["raw"]["meta"];
    }
  }

  return { message, meta, options };
};
