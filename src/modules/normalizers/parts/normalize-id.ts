import type { RawId } from "@/core/logger/types";
import type { NormalizePartOptions } from "@/modules/normalizers/normalize-part-types";
import type { NormalizedId } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeId = (
  id: RawId,
  options: NormalizePartOptions<RawId, NormalizedId> = {},
): NormalizedId => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "id",
    input: { part: id },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return id;
};
