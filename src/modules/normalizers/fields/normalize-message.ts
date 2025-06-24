import type { NormalizeFieldOptions } from "@/modules/normalizers/types";
import type {
  NormalizedMessage,
  RawMessage,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeMessage = (
  fieldValue: RawMessage,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<RawMessage, NormalizedMessage> = {},
): NormalizedMessage => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "message",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return fieldValue;
};
