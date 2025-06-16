import type { RawHostname } from "@/core/logger/types";
import type { NormalizePartOptions } from "@/modules/normalizers/normalize-part-types";
import type { NormalizedHostname } from "@/modules/normalizers/types";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeHostname = (
  hostname: RawHostname,
  options: NormalizePartOptions<RawHostname, NormalizedHostname> = {},
): NormalizedHostname => {
  const { customNormalizer } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "hostname",
    input: { part: hostname },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  return hostname;
};
