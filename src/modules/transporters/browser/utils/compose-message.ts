import type { BrowserFormattedPayload } from "@/modules/formatters";

/**
 * Compose a formatted console message with optional meta and context strings.
 *
 * @param payload - The formatted browser payload.
 * @returns The console message string.
 */
export const composeMessage = (payload: BrowserFormattedPayload): string => {
  const { timestamp, id, level, scope, message, meta, context } = payload;

  const lineBreaksBefore = "\n".repeat(
    payload.formatterConfig.browser?.lineBreaksBefore ?? 0,
  );

  const parts = [timestamp, id, level, scope, message, meta, context]
    .filter((val) => typeof val === "string" && val !== "")
    .map((val) => `%c${val}`);

  return lineBreaksBefore + parts.join("");
};
