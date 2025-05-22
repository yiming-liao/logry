import type { WriteNodeOptions } from "./write-node-types";
import { normalizedWriteConfig } from "../utils/normalize-write-config";
import { printMeta } from "../utils/print-meta";
import { validateWriteOptions } from "../utils/validate-write-options";
import { formatOutput } from "./format-output";

/**
 * Write a formatted log to the Node.js console.
 *
 * @param id - Optional ID tag for the log.
 * @param level - Log level (e.g., "info", "error").
 * @param context - Optional context (e.g., module or filename).
 * @param message - Log message content.
 * @param meta - Optional metadata to print after the message.
 * @param writeConfig - Optional config for hiding tags or formatting.
 */
export const writeNode = ({
  id,
  level,
  context,
  message,
  meta,
  writeConfig,
}: WriteNodeOptions): void => {
  if (typeof window !== "undefined") {
    return;
  }

  // Normalize write config
  const {
    hideDate,
    hideId,
    hideContext,
    showOnlyLatestContext,
    metaDepth,
    borderWidth,
    useColor,
  } = normalizedWriteConfig(writeConfig);

  // Validate options
  validateWriteOptions({ level, message, borderWidth });

  // Output
  const output = formatOutput({
    id,
    level,
    context,
    message,
    hideDate,
    hideId,
    hideContext,
    showOnlyLatestContext,
    useColor,
  });

  // Border
  const border = "─".repeat(borderWidth);

  // ▼ Printing

  // Header border
  console.log(border); // Print empty line if borderWidth === 0

  // Main content
  console.log(output);
  if (meta) {
    printMeta(meta, metaDepth, useColor);
  }

  // Footer border
  if (borderWidth) {
    console.log(border);
  }
};
