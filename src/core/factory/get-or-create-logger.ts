import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { coreMap } from "@/core/factory/core-map";
import { Logger } from "@/core/logger/logger";
import { mergeFormatterConfig } from "@/core/logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/utils/merge/merge-normalizer-config";
import { LoggerCore } from "@/core/logger-core";
import { internalLog, getCallSite } from "@/internal";
import { loggerPresets } from "@/presets";
import { DEFAULT_LOGGER_ID, DEFAULT_LOG_LEVEL } from "@/shared/constants";

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
  handlerConfig,
  preset,
}: GetOrCreateLoggerOptions = {}): Logger => {
  const existingCore = coreMap.get(id);

  // If no LoggerCore exists with the given ID, create one and store it.
  // Then, create a Logger instance using the new core and configs.
  if (!existingCore) {
    if (preset) {
      normalizerConfig = mergeNormalizerConfig(
        loggerPresets[preset]?.normalizerConfig,
        normalizerConfig,
      );
      formatterConfig = mergeFormatterConfig(
        loggerPresets[preset]?.formatterConfig,
        formatterConfig,
      );
    }

    const newCore = new LoggerCore({
      id,
      level: level ?? DEFAULT_LOG_LEVEL,
      formatterConfig,
      normalizerConfig,
      handlerConfig,
    });
    coreMap.set(id, newCore);
    return new Logger({
      core: newCore,
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
  }

  // Warn if core-level configs are passed but the core already exists,
  // since existing core config cannot be overridden.
  if (
    formatterConfig !== undefined ||
    normalizerConfig !== undefined ||
    handlerConfig !== undefined ||
    level !== undefined
  ) {
    internalLog({
      type: "warn",
      message: `LoggerCore with id "${id}" already exists. Passed core-level config will be ignored.\n → ${getCallSite()}`,
    });
  }

  // Return a new Logger instance with the existing core and given scope/context.
  return new Logger({ core: existingCore, scope, context });
};
