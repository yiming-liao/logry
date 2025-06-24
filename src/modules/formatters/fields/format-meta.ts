import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedMeta,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStructuredFields } from "@/modules/formatters/utils/format-structured-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatMeta = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedMeta,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "meta", "structured"> = {},
): FormatFieldReturn<"structured"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "meta",
    raw,
    options,
  });

  return formatStructuredFields({
    platform,
    fieldKey: "meta",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
