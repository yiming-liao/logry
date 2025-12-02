import type { LoggerCore } from "@/core/logger-core";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { RawContext } from "@/shared/types/log-fields";
import { mergeScopes } from "@/core/logger/base-logger/utils/merge-scopes";
import { deepMerge } from "@/shared/utils/deep-merge";

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
    context: deepMerge(core.context, additions.context),
    normalizerConfig: deepMerge(
      core.normalizerConfig,
      additions.normalizerConfig,
    ),
    formatterConfig: deepMerge(core.formatterConfig, additions.formatterConfig),
  };
};
