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

  // Construct the base message with style placeholders
  let composedMessage = `${lineBreaksBefore}%c${timestamp}%c${id}%c${level}%c${scope}%c${message}`;

  if (typeof meta === "string") {
    composedMessage += meta;
  }
  if (typeof context === "string") {
    composedMessage += context;
  }

  return composedMessage;
};
