import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedId,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatId = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedId,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "id", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "id",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "id",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
