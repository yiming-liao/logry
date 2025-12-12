import type { NormalizeConfig } from "@/pipeline/hooks/normalize/types";
import type { LogContext, Normalized } from "@/shared/types/log-context";
import { serializeError } from "@/pipeline/hooks/normalize/fields/meta/utils/serialize-error";
import { PREFIX } from "@/shared/internal";

/** Normalizes the `meta` field of a log entry. */
export const normalizeMeta = (
  value: LogContext["raw"]["meta"],
  ctx: LogContext,
  options: NormalizeConfig["meta"] = {},
): Normalized["meta"] => {
  // Return when is undeinfed
  if (value === undefined) return null;

  const { errorStackLines = 4, customNormalizer } = options;

  // Apply custom normalizer
  if (typeof customNormalizer === "function") {
    try {
      return customNormalizer(value, ctx);
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "meta" normalizer failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // meta -> Error
  if (value instanceof Error) {
    return { error: serializeError(value, errorStackLines) };
  }

  // meta -> { error: Error, ... }
  if (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    value.error instanceof Error
  ) {
    const { error, ...rest } = value;
    return { ...rest, error: serializeError(error, errorStackLines) };
  }

  return value;
};
