import type { HandlerConfig } from "../handler/handler-types";
import type { OutputConfig } from "../output-config-types";
import type { LogLevel } from "../types";
import { DEFAULT_LOGGER_ID, DEFAULT_LOG_LEVEL } from "../constants";
import { LoggerCore } from "../core/logger-core";
import { Logger } from "../logger/logger";
import { coreMap } from "./core-map";

export const getOrCreateLogger = (options?: {
  id?: string;
  level?: LogLevel;
  context?: string;
  outputConfig?: OutputConfig;
  handlerConfig?: HandlerConfig;
}): Logger => {
  const {
    id = DEFAULT_LOGGER_ID,
    level = DEFAULT_LOG_LEVEL,
    context,
    outputConfig,
    handlerConfig,
  } = options || {};

  // Check if the logger core exists, if not, create a new one.
  if (!coreMap.has(id)) {
    coreMap.set(id, new LoggerCore(id, level, outputConfig, handlerConfig));
  }

  const core = coreMap.get(id);

  /**
   * This block should never happen due to the map check, but for safety, let's throw an error.
   */
  if (!core) {
    throw new Error(`[logry] Logger core with ID '${id}' could not be found.`);
  }

  /**
   * Updates the logger core's level to reflect the latest configuration.
   *
   * This enables dynamic reconfiguration: repeated calls to `getOrCreateLogger`
   * with the same ID can override the log level at runtime without creating a new instance.
   */
  core.setLevel(level);

  return new Logger(core, level, context, outputConfig);
};
