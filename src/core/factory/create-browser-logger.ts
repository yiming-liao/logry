import type { CreateLoggerOptions } from "@/core/factory/types";
import { mergeWithPresetConfigs } from "@/core/factory/utils/merge-with-preset-configs";
import { BrowserLogger } from "@/core/logger/platform/browser-logger";

export const createBrowserLogger = (options: CreateLoggerOptions = {}) => {
  const configs = mergeWithPresetConfigs(
    options.preset,
    options.normalizerConfig,
    options.formatterConfig,
  );

  return new BrowserLogger({ ...options, ...configs });
};
