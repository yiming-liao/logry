import type { LoggerCore } from "@/core/logger-core";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { RawContext } from "@/shared/types/log-fields";
import { mergeContexts } from "@/core/logger/base-logger/utils/merge/merge-contexts";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { mergeScopes } from "@/core/logger/base-logger/utils/merge/merge-scopes";

export type AdditionOptions = {
  scope?: string | string[];
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/**
 * Merges options derived from a LoggerCore instance with additional overrides.
 *
 * This function ensures that scope, context, normalizer, and formatter configs
 * are merged in a consistent and type-safe way, preserving inheritance logic.
 *
 * @param core - The source LoggerCore instance providing base configurations.
 * @param additions - Optional overrides to apply on top of the core.
 * @returns Combined logging configuration for the next logger context.
 */
export const mergeWithCoreOptions = (
  core: LoggerCore,
  additions: AdditionOptions = {},
) => {
  return {
    scope: mergeScopes(core.scope, additions.scope),
    context: mergeContexts(core.context, additions.context),
    normalizerConfig: mergeNormalizerConfig(
      core.normalizerConfig,
      additions.normalizerConfig,
    ),
    formatterConfig: mergeFormatterConfig(
      core.formatterConfig,
      additions.formatterConfig,
    ),
  };
};
