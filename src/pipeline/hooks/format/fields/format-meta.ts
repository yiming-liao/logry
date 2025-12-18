import type { FormatConfig } from "@/pipeline/hooks/format/types";
import type {
  Formatted,
  LogContext,
  Normalized,
} from "@/shared/types/log-context";
import { formatObject } from "@/pipeline/hooks/format/utils/format-object";
import { PREFIX } from "@/shared/internal";

export const formatMeta = (
  value: Normalized["meta"],
  ctx: LogContext,
  options: FormatConfig["meta"] = {},
): Formatted["meta"] => {
  const { customFormatter, format = "json", indent = 0 } = options;

  if (value === null) return null;

  // Apply custom formatter
  if (typeof customFormatter === "function") {
    try {
      const result = customFormatter(value, ctx);
      if (result !== undefined) return result;
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "meta" formatter failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const formatted = formatObject(
    value,
    ctx.env.isPlain ? "compact" : format,
    indent,
  );

  return formatted;
};
