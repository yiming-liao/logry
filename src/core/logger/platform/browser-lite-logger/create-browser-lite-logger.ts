import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { BrowserLiteLogger } from "@/core/logger/platform/browser-lite-logger/browser-lite-logger";
import { logryPresets } from "@/presets";

export const createBrowserLiteLogger = ({
  level,
  scope,
  context,
  formatterConfig,
  normalizerConfig,
  preset,
}: GetOrCreateLoggerOptions = {}): BrowserLiteLogger => {
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

  return new BrowserLiteLogger({
    level,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
  });
};
