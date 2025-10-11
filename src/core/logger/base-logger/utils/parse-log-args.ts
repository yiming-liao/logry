import type { LogRuntimeOptions } from "@/core/logger/types";
import type { RawMeta } from "@/shared/types/log-fields";

// Type guard for LogRuntimeOptions
const isLogRuntimeOptions = (obj: unknown): obj is LogRuntimeOptions => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return (
    "scope" in obj ||
    "context" in obj ||
    "normalizerConfig" in obj ||
    "formatterConfig" in obj
  );
};

/**
 * Parses logger arguments into structured message, meta, and options.
 * Can accept up to three arguments in any order:
 * - string → message
 * - object → meta
 * - LogRuntimeOptions → runtime options
 */
export const parseLogArgs = (
  ...args: unknown[]
): { message?: string; meta?: RawMeta; options?: LogRuntimeOptions } => {
  let message: string | undefined;
  let meta: RawMeta | undefined;
  let options: LogRuntimeOptions | undefined;

  for (const arg of args) {
    if (typeof arg === "string") {
      if (!message) message = arg;
    } else if (isLogRuntimeOptions(arg)) {
      if (!options) options = arg;
    } else if (arg && typeof arg === "object" && !Array.isArray(arg)) {
      if (!meta) meta = arg as RawMeta;
    }
  }

  return { message, meta, options };
};
