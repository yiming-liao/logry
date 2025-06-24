import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedLevel,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatLevel = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedLevel,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "level", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "level",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "level",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
