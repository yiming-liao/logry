import type { BrowserFormattedPayload } from "@/modules/formatters";
import {
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_META_LINE_BREAKS,
} from "@/modules/formatters/browser/constants";

/**
 * Compose arguments for console.log with styles, meta, and context.
 *
 * @param payload - The formatted log payload.
 * @param consoleMessage - The base console message string.
 * @returns An array of arguments for console.log.
 */
export const composeConsoleArgs = (
  payload: BrowserFormattedPayload,
  consoleMessage: string,
): unknown[] => {
  const { meta, context, cssStyles, formatterConfig } = payload;
  const browserConfig = formatterConfig.browser;

  const isMetaString = typeof meta === "string";
  const isContextString = typeof context === "string";

  // Base console arguments: message plus style strings
  const consoleArgs: unknown[] = [
    consoleMessage,
    cssStyles.timestamp,
    cssStyles.id,
    cssStyles.level,
    cssStyles.scope,
    cssStyles.message,
  ];

  if (isMetaString) {
    consoleArgs.push(cssStyles.meta);
  }
  if (isContextString) {
    consoleArgs.push(cssStyles.context);
  }

  // Add meta with line breaks if meta is not string
  if (!isMetaString) {
    const lineBreaks = "\n".repeat(
      browserConfig?.meta?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
    );
    consoleArgs.push(lineBreaks, meta);
  }

  // Add context with line breaks if context is not string
  if (!isContextString) {
    const lineBreaks = "\n".repeat(
      browserConfig?.context?.lineBreaks ?? DEFAULT_CONTEXT_LINE_BREAKS,
    );
    consoleArgs.push(lineBreaks, context);
  }

  return consoleArgs;
};
