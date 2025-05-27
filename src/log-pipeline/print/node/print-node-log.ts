import type { PrintNodeLogPayload } from "./print-node-log-types";
import { getNewLinesString } from "../utils/get-new-lines-string";

/**
 * Print a log line and optional metadata to the Node.js console.
 *
 * @param params - Log payload and options for formatting.
 */
export const printNodeLog = ({
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
}: PrintNodeLogPayload): void => {
  // Top border (e.g. "---")
  if (topBorder) console.log("─".repeat(topBorder));
  // Top line break (e.g. "\n\n\n")
  if (topLineBreaks) console.log(getNewLinesString(topLineBreaks));

  // Use custom formatter
  if (formatter) {
    console.log(logLine); // Directly print out formatted logLine
  }

  // Default output
  else {
    console.log(logLine, !stringifyMeta ? "\n".repeat(metaLineBreaks) : ""); // Add metaLineBreaks when no stringified meta in logLine string
    if (!stringifyMeta && meta) {
      console.dir(meta, { depth: metaDepth, colors: useColor }); // Print meta in console.dir when no stringified meta in logLine string
    }
  }

  // Bottom line break
  if (bottomLineBreaks) console.log(getNewLinesString(bottomLineBreaks));
  // Footer border
  if (bottomBorder) console.log("─".repeat(bottomBorder));
};
