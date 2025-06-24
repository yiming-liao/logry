import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedScope,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatScope = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedScope,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "scope", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "scope",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "scope",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
