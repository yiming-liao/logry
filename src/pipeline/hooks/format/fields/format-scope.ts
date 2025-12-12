import type { FormatConfig } from "@/pipeline/hooks/format/types";
import type {
  Formatted,
  LogContext,
  Normalized,
} from "@/shared/types/log-context";
import { PREFIX } from "@/shared/internal";

export const formatScope = (
  value: Normalized["scope"],
  ctx: LogContext,
  options: FormatConfig["scope"] = {},
): Formatted["scope"] => {
  const {
    hide = false,
    customFormatter,
    separator = " > ",
    lastOnly = false,
  } = options;

  if (hide || value.length === 0) return null;

  // Apply custom formatter
  if (typeof customFormatter === "function") {
    try {
      const result = customFormatter(value, ctx);
      if (result !== undefined) return result;
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "scope" formatter failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const stringified = lastOnly
    ? value[value.length - 1]
    : value.join(separator);

  return stringified;
};
