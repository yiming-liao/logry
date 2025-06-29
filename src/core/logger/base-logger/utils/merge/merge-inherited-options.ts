import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { RawContext, RawScope } from "@/shared/types/log-fields";
import { mergeContexts } from "@/core/logger/base-logger/utils/merge/merge-contexts";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";
import { mergeScopes } from "@/core/logger/base-logger/utils/merge/merge-scopes";

export type BaseOptions = {
  scope?: RawScope;
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

export type AdditionOptions = {
  scope?: string | string[];
  context?: RawContext;
  normalizerConfig?: NormalizerConfig;
  formatterConfig?: FormatterConfig;
};

/**
 * Merges base logging options with inherited additions.
 *
 * @param base - Original inherited options.
 * @param additions - Additional options to merge in.
 * @returns Combined logger options.
 */
export const mergeInheritedOptions = (
  base: BaseOptions = { scope: [], normalizerConfig: {}, formatterConfig: {} },
  additions: AdditionOptions = {},
) => {
  return {
    scope: mergeScopes(base.scope, additions.scope),
    context: mergeContexts(base.context, additions.context),
    normalizerConfig: mergeNormalizerConfig(
      base.normalizerConfig,
      additions.normalizerConfig,
    ),
    formatterConfig: mergeFormatterConfig(
      base.formatterConfig,
      additions.formatterConfig,
    ),
  };
};
