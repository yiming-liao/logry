import type { CreateLoggerOptions } from "@/core/factory/types";
import { mergeWithPresetConfigs } from "@/core/factory/utils/merge-with-preset-configs";
import { NodeLogger } from "@/core/logger/platform/node-logger";

export const createNodeLogger = (options: CreateLoggerOptions = {}) => {
  const configs = mergeWithPresetConfigs(
    options.preset,
    options.normalizerConfig,
    options.formatterConfig,
  );

  return new NodeLogger({ ...options, ...configs });
};
