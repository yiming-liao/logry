import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedHostname,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatHostname = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedHostname | undefined,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "hostname", "string"> = {},
): FormatFieldReturn<"string"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "hostname",
    raw,
    options,
  });

  return formatStringFields({
    platform,
    fieldKey: "hostname",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
