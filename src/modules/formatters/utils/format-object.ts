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
  indent: number = 0,
): Record<string, unknown> | string => {
  try {
    switch (style) {
      case "raw":
        return input;

      case "json":
        return JSON.stringify(input);

      case "pretty": {
        const indentSpaces = " ".repeat(indent);
        return `\n${JSON.stringify(input, null, 2)
          .split("\n")
          .map((line) => indentSpaces + line)
          .join("\n")}`;
      }

      case "compact":
        if (typeof input !== "object" || input === null) return "";

        return Object.entries(input)
          .map(([key, val]) => {
            let value;
            if (typeof val === "object" && val !== null) {
              value = JSON.stringify(val);
            } else if (typeof val === "string" && /\s/.test(val)) {
              value = `"${val}"`;
            } else {
              value = String(val);
            }
            return `${key}=${value}`;
          })
          .join(" ");

      default:
        internalLog({
          type: "warn",
          message: `Unknown style "${style}", using "json" as fallback.`,
        });
        return JSON.stringify(input); // Fallback to single-line JSON
    }
  } catch (error) {
    internalLog({
      type: "error",
      message: `Failed to stringify object. ${error instanceof Error ? error.message : String(error)}`,
    });
    return "";
  }
};
