import type { RawScope } from "@/core/logger/types";
import type { NormalizedScopeOptions } from "@/modules/normalizers/parts/scope/normalize-scope-types";
import type { NormalizedScope } from "@/modules/normalizers/types";
import { DEFAULT_SCOPE_SEPARATOR } from "@/modules/normalizers/constants";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeScope = (
  scope: RawScope,
  options: NormalizedScopeOptions = {},
): NormalizedScope => {
  const { separator = DEFAULT_SCOPE_SEPARATOR, customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "scope",
    input: scope,
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  const scopeString = scope.join(separator);

  return scopeString;
};
