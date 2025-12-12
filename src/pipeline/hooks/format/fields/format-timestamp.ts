import type { FormatConfig } from "@/pipeline/hooks/format/types";
import type {
  Formatted,
  LogContext,
  Normalized,
} from "@/shared/types/log-context";
import { buildTimestampString } from "@/pipeline/hooks/format/utils/build-timestamp-string";
import { PREFIX } from "@/shared/internal";

export const formatTimestamp = (
  value: Normalized["timestamp"],
  ctx: LogContext,
  options: FormatConfig["timestamp"] = {},
): Formatted["timestamp"] => {
  const {
    hide = false,
    customFormatter,
    format = "pretty",
    useUTC = false,
    withDate = true,
  } = options;

  if (hide) return null;

  // Apply custom formatter
  if (typeof customFormatter === "function") {
    try {
      const result = customFormatter(value, ctx);
      if (result !== undefined) return result;
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "timestamp" formatter failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // To specific format
  let formatted: string;
  switch (format) {
    case "raw": {
      formatted = String(value);
      break;
    }
    case "iso": {
      formatted = new Date(value).toISOString();
      break;
    }
    case "epoch": {
      formatted = String(Math.floor(value / 1000));
      break;
    }
    // pretty
    default: {
      formatted = buildTimestampString({
        timestamp: value,
        useUTC,
        withDate,
      });
    }
  }

  return formatted;
};
