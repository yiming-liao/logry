import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedMessage,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatMessage = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedMessage,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "message", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "message",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "message",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
