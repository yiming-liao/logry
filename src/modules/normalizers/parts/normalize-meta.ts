import type { RawMeta } from "@/core/logger/types";
import type {
  NormalizeMetaExtraOptions,
  NormalizePartOptions,
} from "@/modules/normalizers/normalize-part-types";
import type { NormalizedMeta } from "@/modules/normalizers/types";
import { DEFAULT_META_ERROR_STACK_LINES } from "@/modules/normalizers/constants";
import { serializeMeta } from "@/modules/normalizers/utils/serialize-meta";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeMeta = (
  meta?: RawMeta,
  options: NormalizePartOptions<
    RawMeta,
    NormalizedMeta,
    NormalizeMetaExtraOptions
  > = {},
): NormalizedMeta => {
  if (meta === undefined || meta === null) {
    return undefined;
  }

  const { errorStackLines = DEFAULT_META_ERROR_STACK_LINES, customNormalizer } =
    options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "meta",
    input: { part: meta },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  const serialized = serializeMeta(meta, errorStackLines);

  return serialized;
};
