import type { RawMessage } from "@/core/logger/types";
import type { NormalizedMessageOptions } from "@/modules/normalizers/parts/message/normalize-message-types";
import type { NormalizedMessage } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeMessage = (
  message: RawMessage,
  options: NormalizedMessageOptions = {},
): NormalizedMessage => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "message",
    input: message,
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return message;
};
