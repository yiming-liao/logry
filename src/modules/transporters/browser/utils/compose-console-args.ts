import type { FormattedPayload } from "@/shared/types/log-payload";
import { DEFAULT_BROWSER_FORMAT_OPTIONS_MAP } from "@/modules/formatters/constants/default-browser-format-options-map";
/**
 * Compose arguments for console.log with styles, meta, and context.
 *
 * @param payload - The formatted log payload.
 * @param consoleMessage - The base console message string.
 * @returns An array of arguments for console.log.
 */
export const composeConsoleArgs = (
  payload: FormattedPayload,
  consoleMessage: string,
): unknown[] => {
  const { meta, context, cssStyles, formatterConfig } = payload;
  const browserConfig = formatterConfig.browser;

  const isMetaValidString = typeof meta === "string" && meta !== "";
  const isContextValidString = typeof context === "string" && context !== "";

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
  if (isContextValidString) {
    consoleArgs.push(cssStyles.context);
  }

  // Add meta with line breaks if meta is not string
  if (!isMetaValidString && meta !== "") {
    const lineBreaks = "\n".repeat(
      browserConfig?.meta?.lineBreaks ??
        DEFAULT_BROWSER_FORMAT_OPTIONS_MAP.meta?.lineBreaks ??
        0,
    );
    if (lineBreaks) {
      consoleArgs.push(lineBreaks);
    }
    consoleArgs.push(meta);
  }

  // Add context with line breaks if context is not string
  if (!isContextValidString && context !== "") {
    const lineBreaks = "\n".repeat(
      browserConfig?.context?.lineBreaks ??
        DEFAULT_BROWSER_FORMAT_OPTIONS_MAP.context?.lineBreaks ??
        0,
    );
    if (lineBreaks) {
      consoleArgs.push(lineBreaks);
    }
    consoleArgs.push(context);
  }

  return consoleArgs;
};
