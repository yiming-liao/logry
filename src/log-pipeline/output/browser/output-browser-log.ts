import type { OutputBrowserLogPayload } from "./output-browser-log-types";
import { formatBrowserLog } from "../../format/browser";
import { printBrowserLog } from "../../print/browser/print-browser-log";
import { getNewLinesString } from "../../print/utils/get-new-lines-string";
import { validateOutputPayload } from "../utils/validate-output-payload";
import { resolveOutputConfig } from "./utils/resolve-output-config";

/**
 * Outputs a formatted log to the browser console.
 *
 * @param payload - Full log content and config.
 */
export const outputBrowserLog = ({
  id,
  level,
  scope,
  message,
  meta,
  context,
  browserOutputConfig,
}: OutputBrowserLogPayload): void => {
  // Do nothing if not in browser
  if (typeof window === "undefined") {
    return;
  }

  // Resolve output config
  const {
    hideDate,
    hideId,
    hideScope,
    scopeSeparator,
    showOnlyLatestScope,
    messagePrefix,
    messageLineBreaks,
    metaLineBreaks,
    topLineBreaks,
    bottomLineBreaks,
    stringifyMeta,
    formatter,
  } = resolveOutputConfig(browserOutputConfig);

  // Validate options
  validateOutputPayload({ level, message });

  // Format main log line and style segments
  const formatted = formatBrowserLog({
    id,
    level,
    scope,
    message,
    meta,
    context,
    hideDate,
    hideId,
    hideScope,
    scopeSeparator,
    showOnlyLatestScope,
    messagePrefix,
    messageLineBreaks,
    formatter,
  });

  const [logLine, ...styleStrings] = formatted;

  // Prepare top and bottom line breaks
  const topLines = getNewLinesString(topLineBreaks);
  const bottomLines = getNewLinesString(bottomLineBreaks);

  // Combine top lines, main message, and meta line breaks
  const logMessage = `${topLines}${logLine}${metaLineBreaks && meta ? "\n".repeat(metaLineBreaks) : ""}`;
  // Prepare arguments for console.log (message + styles)
  const logArgs: unknown[] = [logMessage, ...styleStrings];

  // Optionally stringify meta
  if (stringifyMeta) {
    try {
      const json =
        stringifyMeta === "pretty"
          ? JSON.stringify(meta, null, 2)
          : JSON.stringify(meta);
      meta = json;
    } catch {
      /* ignore stringify errors */
    }
  }

  // Append meta and bottom breaks to console log arguments
  if (meta) logArgs.push(meta);
  if (bottomLines) logArgs.push(bottomLines);

  // Print browser log
  printBrowserLog({ logArgs });
};
