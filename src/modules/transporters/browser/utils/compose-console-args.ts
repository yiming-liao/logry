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

  const isMetaValidString = typeof meta === "string" && meta !== "";
  const isContexValidtString = typeof context === "string" && context !== "";

  // Base console arguments: message plus style strings
  const consoleArgs: unknown[] = [
    "timestamp",
    "id",
    "level",
    "scope",
    "message",
  ]
    .filter(
      (key) =>
        typeof payload[key as keyof typeof payload] === "string" &&
        payload[key as keyof typeof payload] !== "",
    )
    .map((key) => {
      const style = cssStyles[key as keyof typeof cssStyles];
      return style && style.trim() !== "" ? style : "color: inherit;";
    });

  consoleArgs.unshift(consoleMessage);

  if (isMetaValidString) {
    consoleArgs.push(cssStyles.meta);
  }
  if (isContexValidtString) {
    consoleArgs.push(cssStyles.context);
  }

  // Add meta with line breaks if meta is not string
  if (!isMetaValidString && meta !== "") {
    const lineBreaks = "\n".repeat(
      browserConfig?.meta?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
    );
    if (lineBreaks) {
      consoleArgs.push(lineBreaks);
    }
    consoleArgs.push(meta);
  }

  // Add context with line breaks if context is not string
  if (!isContexValidtString && context !== "") {
    const lineBreaks = "\n".repeat(
      browserConfig?.context?.lineBreaks ?? DEFAULT_CONTEXT_LINE_BREAKS,
    );
    if (lineBreaks) {
      consoleArgs.push(lineBreaks);
    }
    consoleArgs.push(context);
  }

  return consoleArgs;
};
