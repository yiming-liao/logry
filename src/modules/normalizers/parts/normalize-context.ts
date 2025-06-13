import type { RawContext } from "@/core/logger/types";
import type { NormalizePartOptions } from "@/modules/normalizers/normalize-part-types";
import type { NormalizedContext } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeContext = (
  context?: RawContext,
  options: NormalizePartOptions<RawContext, NormalizedContext> = {},
): NormalizedContext => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "context",
    input: { part: context },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return context;
};
