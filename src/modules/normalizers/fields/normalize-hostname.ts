import type { NormalizeFieldOptions } from "@/modules/normalizers/types";
import type {
  NormalizedHostname,
  RawHostname,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeHostname = (
  fieldValue: RawHostname,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<RawHostname, NormalizedHostname> = {},
): NormalizedHostname => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "hostname",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return fieldValue;
};
