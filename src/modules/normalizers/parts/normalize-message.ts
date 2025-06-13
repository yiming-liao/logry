import type { RawMessage } from "@/core/logger/types";
import type { NormalizePartOptions } from "@/modules/normalizers/normalize-part-types";
import type { NormalizedMessage } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeMessage = (
  message: RawMessage,
  options: NormalizePartOptions<RawMessage, NormalizedMessage> = {},
): NormalizedMessage => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "message",
    input: { part: message },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return message;
};
