import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedPid,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatPid = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedPid | undefined,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "pid", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "pid",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "pid",
    fieldValue: fieldValue !== undefined ? String(fieldValue) : undefined,
    raw,
    options: resolvedOptions,
  });
};
