import type { RawPid } from "@/core/logger/types";
import type { NormalizePartOptions } from "@/modules/normalizers/normalize-part-types";
import type { NormalizedPid } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizePid = (
  pid: RawPid,
  options: NormalizePartOptions<RawPid, NormalizedPid> = {},
): NormalizedPid => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "pid",
    input: { part: pid },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return pid;
};
