import type { WriteOptions } from "./write-types";
import { DEFAULT_PLATFORM } from "../constants";
import { writeBrowser } from "./browser";
import { writeNode } from "./node";
import { resolvePlatform } from "./utils/resolve-platform";

/**
 * Write log output to the corresponding platform (node or browser).
 *
 * @param id - Unique ID for the log
 * @param level - Log level (e.g., info, warn, error)
 * @param context - Optional log context/module
 * @param message - The main log message
 * @param meta - Optional metadata object
 * @param writeConfig - Optional configuration including platform
 */
export const write = ({
  id,
  level,
  context,
  message,
  meta,
  writeConfig,
}: WriteOptions): void => {
  const platform = writeConfig?.platform ?? DEFAULT_PLATFORM;

  // Skip logging if level is "silent"
  if (level === "silent") {
    return;
  }

  // Determine actual platform to write to
  const resolvedPlatform = resolvePlatform(platform);

  // Log to Node.js environment
  if (resolvedPlatform === "node") {
    writeNode({
      id,
      level,
      context,
      message,
      meta,
      writeConfig,
    });
  }

  // Log to browser environment
  else if (resolvedPlatform === "browser") {
    writeBrowser({
      id,
      level,
      context,
      message,
      meta,
      writeConfig,
    });
  }
};
