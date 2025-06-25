import type { GetOrCreateLoggerOptions } from "@/core/factory/get-or-create-logger-types";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { EdgeLogger } from "@/core/logger/platform/edge-logger";
import { logryPresets } from "@/presets";

export const createEdgeLogger = ({
  level,
  scope,
  context,
  formatterConfig,
  normalizerConfig,
  preset,
}: GetOrCreateLoggerOptions = {}): EdgeLogger => {
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

  return new EdgeLogger({
    level,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
  });
};
