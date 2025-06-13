import type { RawScope } from "@/core/logger/types";
import type {
  NormalizePartOptions,
  NormalizeScopeExtraOptions,
} from "@/modules/normalizers/normalize-part-types";
import type { NormalizedScope } from "@/modules/normalizers/types";
import { DEFAULT_SCOPE_SEPARATOR } from "@/modules/normalizers/constants";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeScope = (
  scope: RawScope,
  options: NormalizePartOptions<
    RawScope,
    NormalizedScope,
    NormalizeScopeExtraOptions
  > = {},
): NormalizedScope => {
  const { separator = DEFAULT_SCOPE_SEPARATOR, customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "scope",
    input: { part: scope },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  const scopeString = scope.join(separator);

  return scopeString;
};
