import type { LogPayload } from "../../types";
import { outputBrowserLog } from "../output/browser";
import { outputNodeLog } from "../output/node";
import { resolvePlatform } from "./utils/resolve-platform";

/**
 * Dispatch log message to the appropriate output handler based on the current platform (Node or browser).
 *
 * @param id - Unique identifier for the log message, useful for tracking across systems.
 * @param level - Log level (e.g., "info", "warn", "error", "debug", "silent").
 * @param context - Additional context for the log (e.g., module name, user info).
 * @param message - The main log message to display.
 * @param meta - Optional metadata (e.g., error stack, additional structured data).
 * @param outputConfig - Configuration for platform-specific log output.
 */
export const dispatchLog = ({
  id,
  level,
  context,
  message,
  meta,
  outputConfig,
}: LogPayload): void => {
  // Skip logging if level is "silent"
  if (level === "silent") {
    return;
  }

  // Determine actual platform to write to
  const platform = resolvePlatform();

  // Log to Node.js environment
  if (platform === "node") {
    outputNodeLog({
      id,
      level,
      context,
      message,
      meta,
      nodeOutputConfig: outputConfig?.node,
    });
  }

  // Log to browser environment
  else if (platform === "browser") {
    outputBrowserLog({
      id,
      level,
      context,
      message,
      meta,
      browserOutputConfig: outputConfig?.browser,
    });
  }
};
