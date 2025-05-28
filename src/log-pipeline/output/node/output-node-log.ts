import type { OutputNodeLogPayload } from "./output-node-log-types";
import { formatNodeLog } from "../../format/node";
import { formatMeta } from "../../format/node/format-meta";
import { printNodeLog } from "../../print/node/print-node-log";
import { validateOutputPayload } from "../utils/validate-output-payload";
import { resolveOutputConfig } from "./utils/resolve-output-config";

/**
 * Outputs a formatted log to the terminal in Node.js.
 *
 * @param payload - Full log content and config.
 */
export const outputNodeLog = ({
  id,
  level,
  scope,
  message,
  meta,
  context,
  nodeOutputConfig,
}: OutputNodeLogPayload): void => {
  // Do nothing if not in Node.js
  if (typeof window !== "undefined") {
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
    metaDepth,
    topBorder,
    bottomBorder,
    useColor,
    formatter,
  } = resolveOutputConfig(nodeOutputConfig);

  // Validate options
  validateOutputPayload({ level, message });

  // Format and build log line
  let logLine = formatNodeLog({
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
    useColor,
    formatter,
  });

  // Format meta
  meta = formatMeta(meta);

  // Append stringified meta if required
  if (stringifyMeta && meta) {
    try {
      const json =
        stringifyMeta === "pretty"
          ? JSON.stringify(meta, null, 2)
          : JSON.stringify(meta);
      logLine += "\n".repeat(metaLineBreaks) + json;
    } catch {
      /* ignore stringify errors */
    }
  }

  // Print node log
  printNodeLog({
    logLine,
    meta,
    metaDepth,
    useColor,
    stringifyMeta,
    metaLineBreaks,
    topLineBreaks,
    bottomLineBreaks,
    topBorder,
    bottomBorder,
    formatter,
  });
};
