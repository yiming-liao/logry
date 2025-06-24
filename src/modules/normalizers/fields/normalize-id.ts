import type { NormalizeFieldOptions } from "@/modules/normalizers/types";
import type {
  NormalizedId,
  RawId,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeId = (
  fieldValue: RawId,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<RawId, NormalizedId> = {},
): NormalizedId => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "id",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return fieldValue;
};
