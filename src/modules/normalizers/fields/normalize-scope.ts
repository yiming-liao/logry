import type {
  NormalizeFieldOptions,
  NormalizeScopeExtraOptions,
} from "@/modules/normalizers/types";
import type {
  NormalizedScope,
  RawScope,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { DEFAULT_SCOPE_SEPARATOR } from "@/modules/normalizers/constants";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export type ScopeSeparator = "." | " > " | ">" | ":" | "/" | "_" | "-";

export const normalizeScope = (
  fieldValue: RawScope,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<
    RawScope,
    NormalizedScope,
    NormalizeScopeExtraOptions
  > = {},
): NormalizedScope => {
  const { separator = DEFAULT_SCOPE_SEPARATOR, customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "scope",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  const scopeString = fieldValue.join(separator);

  return scopeString;
};
