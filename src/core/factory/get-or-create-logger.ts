import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { coreMap } from "@/core/factory/core-map/core-map";
import { loggerMap } from "@/core/factory/logger-map";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { CoreLogger } from "@/core/logger/core-logger";
import { LoggerCore } from "@/core/logger-core";
import { logryPresets } from "@/presets";
import { DEFAULT_LOGGER_ID, DEFAULT_LOGGER_LEVEL } from "@/shared/constants";

/**
 * Creates or retrieves a Logger by ID.
 *
 * LoggerCore is shared by ID and only initialized once.
 * Core-level configs are ignored if the core already exists.
 *
 * @param options - Logger and core settings.
 * @returns A Logger instance.
 */
export const getOrCreateLogger = ({
  id = DEFAULT_LOGGER_ID,
  level,
  scope,
  context,
  formatterConfig,
  normalizerConfig,
  handlerManagerConfig,
  preset,
  Logger = CoreLogger,
}: GetOrCreateLoggerOptions = {}): CoreLogger => {
  let core = coreMap.get(id);
  let logger = loggerMap.get(id);

  // If no LoggerCore exists with the given ID, create one and store it.
  // Then, create a Logger instance using the new core and configs.
  if (!core) {
    if (preset) {
      normalizerConfig = mergeNormalizerConfig(
        logryPresets[preset]?.normalizerConfig,
        normalizerConfig,
      );
      formatterConfig = mergeFormatterConfig(
        logryPresets[preset]?.formatterConfig,
        formatterConfig,
      );
    }

    core = new LoggerCore({
      id,
      level: level ?? DEFAULT_LOGGER_LEVEL,
      formatterConfig,
      normalizerConfig,
      handlerManagerConfig,
    });

    coreMap.set(id, core);
  }

  if (!logger) {
    logger = new Logger({
      core,
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
    loggerMap.set(id, logger);
  }

  return logger;
};
