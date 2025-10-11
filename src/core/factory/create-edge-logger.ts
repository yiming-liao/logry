import type { CreateLoggerOptions } from "@/core/factory/types";
import { mergeWithPresetConfigs } from "@/core/factory/utils/merge-with-preset-configs";
import { EdgeLogger } from "@/core/logger/platform/edge-logger";

export const createEdgeLogger = (options: CreateLoggerOptions = {}) => {
  const configs = mergeWithPresetConfigs(
    options.preset,
    options.normalizerConfig,
    options.formatterConfig,
  );

  return new EdgeLogger({ ...options, ...configs });
};
