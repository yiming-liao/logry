import type {
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types/";
import type { Platform } from "@/shared/types";
import type {
  NormalizedContext,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { formatStructuredFields } from "@/modules/formatters/utils/format-structured-fields";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";

export const formatContext = <P extends Platform>(
  platform: P,
  fieldValue: NormalizedContext,
  raw: SnapshotLogFields,
  options: FormatFieldOptions<P, "context", "structured"> = {},
): FormatFieldReturn<"structured"> => {
  const resolvedOptions = resolveFormatFieldOptions({
    platform,
    fieldKey: "context",
    raw,
    options,
  });

  return formatStructuredFields({
    platform,
    fieldKey: "context",
    fieldValue,
    raw,
    options: resolvedOptions,
  });
};
