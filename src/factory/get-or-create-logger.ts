import type { HandlerConfig } from "../handler/handler-types";
import type { OutputConfig } from "../output-config-types";
import type { LogLevel } from "../types";
import { DEFAULT_LOGGER_ID, DEFAULT_LOG_LEVEL } from "../constants";
import { LoggerCore } from "../core/logger-core";
import { Logger } from "../logger/logger";
import { coreMap } from "./core-map";

export const getOrCreateLogger = <
  TContext extends Record<string, unknown> = Record<string, unknown>,
>(options?: {
  id?: string;
  level?: LogLevel;
  scope?: string[];
  context?: TContext;
  outputConfig?: OutputConfig;
  handlerConfig?: HandlerConfig;
}): Logger => {
  const {
    id = DEFAULT_LOGGER_ID,
    level = DEFAULT_LOG_LEVEL,
    scope,
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
   * Do not pass `level` here to let Logger fallback to `core.level` by default.
   * This preserves flexibility for child loggers to override the level if needed.
   */
  return new Logger({ core, level: undefined, scope, context, outputConfig });
};
