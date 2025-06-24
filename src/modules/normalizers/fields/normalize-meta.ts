import type {
  NormalizeFieldOptions,
  NormalizeMetaExtraOptions,
} from "@/modules/normalizers/types";
import type {
  NormalizedMeta,
  RawMeta,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { DEFAULT_META_ERROR_STACK_LINES } from "@/modules/normalizers/constants";
import { serializeMeta } from "@/modules/normalizers/utils/serialize-meta";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeMeta = (
  fieldValue: RawMeta,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<
    RawMeta,
    NormalizedMeta,
    NormalizeMetaExtraOptions
  > = {},
): NormalizedMeta => {
  if (fieldValue === undefined || fieldValue === null) {
    return undefined;
  }

  const { errorStackLines = DEFAULT_META_ERROR_STACK_LINES, customNormalizer } =
    options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "meta",
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  const serialized = serializeMeta(fieldValue, errorStackLines);

  return serialized;
};
