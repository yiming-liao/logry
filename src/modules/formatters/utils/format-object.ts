import type { StringifyFormat } from "@/modules/formatters";
import { internalLog } from "@/internal";

/**
 * Converts an object into different string formats.
 *
 * @param input - The object to stringify.
 * @param style - Stringify style: raw, json, compact, or pretty.
 * @returns Formatted string or raw object.
 */
export const formatObject = (
  input: Record<string, unknown>,
  style: StringifyFormat = "pretty",
): Record<string, unknown> | string => {
  try {
    switch (style) {
      case "raw":
        return input;

      case "json":
        return JSON.stringify(input); // Single-line JSON

      case "pretty":
        return JSON.stringify(input, null, 2); // Multi-line JSON

      case "compact":
        return typeof input === "object" && input !== null
          ? Object.entries(input)
              .map(([key, val]) => {
                const value =
                  typeof val === "object" && val !== null
                    ? JSON.stringify(val)
                    : String(val);
                return `${key}:${value}`;
              })
              .join(", ")
          : "";

      default:
        internalLog({
          type: "warn",
          message: `Unknown style "${style}", using "json" as fallback.`,
        });
        return JSON.stringify(input); // Fallback to single-line JSON
    }
  } catch (error) {
    // Graceful fallback on unexpected error
    internalLog({
      type: "error",
      message: `Failed to stringify object. ${error instanceof Error ? error.message : String(error)}`,
    });
    return "";
  }
};
