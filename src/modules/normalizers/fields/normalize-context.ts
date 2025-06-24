import type { NormalizeFieldOptions } from "@/modules/normalizers/types";
import type {
  NormalizedContext,
  RawContext,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeContext = (
  fieldValue: RawContext,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<RawContext, NormalizedContext> = {},
): NormalizedContext => {
  const { customNormalizer } = options;

  const customized = tryCustomNormalizer({
    label: "context",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return fieldValue;
};
