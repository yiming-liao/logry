import type { LogLevel, WriteConfig } from "../types";
import { DEFAULT_LOGGER_ID, DEFAULT_LOG_LEVEL } from "../constants";
import { LoggerCore } from "../core/logger-core";
import { Logger } from "../logger";
import { coreMap } from "./core-map";

/**
 * Retrieves an existing logger by its ID or creates a new one.
 *
 * @param id - The unique identifier for the logger instance.
 * @param level - The log level to set for the logger. If not provided, defaults to `DEFAULT_LOG_LEVEL`.
 * @param context - An optional context to be included in log messages.
 * @param writeConfig - Optional options for log formatting configuration.
 * @returns An instance of `Logger` associated with the given ID.
 */
export const logry = (options?: {
  id?: string;
  level?: LogLevel;
  context?: string;
  writeConfig?: WriteConfig;
}): Logger => {
  const {
    id = DEFAULT_LOGGER_ID,
    level = DEFAULT_LOG_LEVEL,
    context,
    writeConfig,
  } = options || {};

  // Check if the logger core exists, if not, create a new one.
  if (!coreMap.has(id)) {
    coreMap.set(id, new LoggerCore(id, level, writeConfig));
  }

  const core = coreMap.get(id);

  // This block should never happen due to the map check, but for safety, let's throw an error.
  if (!core) {
    throw new Error(`[logry] Logger core with ID '${id}' could not be found.`);
  }

  /**
   * Ensure the logger core's level reflects the most recent request.
   * This allows dynamic log level updates via repeated calls to `logry`,
   * enabling flexible runtime reconfiguration based on the same logger ID.
   */
  core.setLevel(level);

  return new Logger(core, level, context, writeConfig);
};
