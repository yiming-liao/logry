import type { WriteBrowserOptions } from "./write-browser-types";
import { normalizedWriteConfig } from "../utils/normalize-write-config";
import { validateWriteOptions } from "../utils/validate-write-options";
import { formatOutput } from "./format-output";

/**
 * Write a formatted log to the browser console.
 *
 * @param id - Optional ID tag for the log.
 * @param level - Log level (e.g., "info", "error").
 * @param context - Optional context (e.g., module or filename).
 * @param message - Log message content.
 * @param meta - Optional metadata to print after the message.
 * @param writeConfig - Optional config for hiding tags or formatting.
 */
export const writeBrowser = ({
  id,
  level,
  context,
  message,
  meta,
  writeConfig,
}: WriteBrowserOptions): void => {
  // Prevent logging outside of browser environment
  if (typeof window === "undefined") {
    return;
  }

  // Normalize formatting options
  const { hideDate, hideId, hideContext, showOnlyLatestContext } =
    normalizedWriteConfig(writeConfig);

  // Validate options
  validateWriteOptions({ level, message });

  // Format the output for console.log
  const output = formatOutput({
    id,
    level,
    context,
    message,
    hideDate,
    hideId,
    hideContext,
    showOnlyLatestContext,
  });

  // Log the message with optional metadata
  if (meta) {
    console.log(...output, meta);
  } else {
    console.log(...output);
  }
};
