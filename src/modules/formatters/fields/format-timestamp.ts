import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedTimestamp,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatTimestamp = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedTimestamp,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "timestamp", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "timestamp",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "timestamp",
    fieldValue: String(fieldValue),
    raw,
    options: resolvedOptions,
  });
};
