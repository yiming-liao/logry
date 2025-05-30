import type { RawContext } from "@/core/logger/types";
import type { NormalizedContextOptions } from "@/modules/normalizers/parts/context/normalize-context-types";
import type { NormalizedContext } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeContext = (
  context?: RawContext,
  options: NormalizedContextOptions = {},
): NormalizedContext => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "context",
    input: context,
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return context;
};
