import type { NormalizeFieldOptions } from "@/modules/normalizers/types";
import type {
  NormalizedPid,
  RawPid,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizePid = (
  fieldValue: RawPid,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<RawPid, NormalizedPid> = {},
): NormalizedPid => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "pid",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return fieldValue;
};
