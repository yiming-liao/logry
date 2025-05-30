import type { RawId } from "@/core/logger/types";
import type { CustomIdNormalizer } from "@/modules/normalizers/parts/id/normalize-id-types";
import type { NormalizedId } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeId = (
  id: RawId,
  options: {
    customNormalizer?: CustomIdNormalizer;
  } = {},
): NormalizedId => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "id",
    input: id,
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return id;
};
