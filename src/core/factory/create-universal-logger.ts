import type { CreateLoggerOptions } from "@/core/factory/types";
import { mergeWithPresetConfigs } from "@/core/factory/utils/merge-with-preset-configs";
import { UniversalLogger } from "@/core/logger/platform/universal-logger";

export const createUniversalLogger = (options: CreateLoggerOptions = {}) => {
  const configs = mergeWithPresetConfigs(
    options.preset,
    options.normalizerConfig,
    options.formatterConfig,
  );

  return new UniversalLogger({ ...options, ...configs });
};
