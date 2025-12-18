import type { FormatConfig } from "@/pipeline/hooks/format/types";
import type {
  Formatted,
  LogContext,
  Normalized,
} from "@/shared/types/log-context";
import { PREFIX } from "@/shared/internal";
import {
  ABBR_LEVELS_MAP,
  TITLECASE_LEVELS_MAP,
  UPPERCASE_LEVELS_MAP,
} from "@/shared/level";

export const formatLevel = (
  value: Normalized["level"],
  ctx: LogContext,
  options: FormatConfig["level"] = {},
): Formatted["level"] => {
  const { customFormatter, format = "upper" } = options;

  // Apply custom formatter
  if (typeof customFormatter === "function") {
    try {
      const result = customFormatter(value, ctx);
      if (result !== undefined) return result;
    } catch (error) {
      throw new Error(
        `${PREFIX} custom "level" formatter failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // To specific format
  let formatted: string;
  switch (format) {
    case "lower": {
      formatted = value;
      break;
    }
    case "title": {
      formatted =
        TITLECASE_LEVELS_MAP[value as keyof typeof TITLECASE_LEVELS_MAP];
      break;
    }
    case "abbr": {
      formatted = ABBR_LEVELS_MAP[value as keyof typeof ABBR_LEVELS_MAP];
      break;
    }
    // upper
    default: {
      formatted =
        UPPERCASE_LEVELS_MAP[value as keyof typeof UPPERCASE_LEVELS_MAP];
    }
  }

  return formatted;
};
