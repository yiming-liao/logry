import type {
  CustomFormatter,
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type {
  NormalizedStructuredField,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import type { FieldKey } from "@/shared/types/log-fields";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { addAnsiStyle } from "@/modules/formatters/utils/style/add-ansi-style";
import { addLineBreakPrefix } from "@/modules/formatters/utils/style/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/style/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/style/add-space-after";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

/**
 * Format a structured log field with optional styles, spacing, and custom logic.
 */
export const formatStructuredFields = <P extends Platform, K extends FieldKey>({
  platform,
  fieldKey,
  fieldValue,
  raw,
  options,
}: {
  platform: P;
  fieldKey: K;
  fieldValue: NormalizedStructuredField;
  raw: SnapshotLogFields;
  options: FormatFieldOptions<P, K, "structured">;
}): FormatFieldReturn<"structured"> => {
  const isNode = platform === "node";
  const isBrowser = platform === "browser";

  const {
    hide,
    prefix,
    suffix,
    lineBreaks,
    spaceAfter,
    format,
    indent,
    customFormatter,
  } = options;
  const nodeOptions = options as FormatFieldOptions<"node", K, "structured">;
  const browserOptions = options as FormatFieldOptions<
    "browser",
    K,
    "structured"
  >;

  // Return early if hidden or empty
  if (hide || fieldValue === undefined || fieldValue === null) {
    return {
      fieldValue: "",
      withAnsiStyle: "",
      cssStyle: "",
    };
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      fieldKey: fieldKey,
      input: { fieldValue: fieldValue, raw },
      customFormatter: customFormatter as CustomFormatter<"structured">,
    });
    if (customized) {
      return customized;
    }
  }

  // Stringify the value if format is specified, or keep it as raw
  const formatted = formatObject(fieldValue, format, indent);

  // Apply additional stylings if it's a string
  if (typeof formatted === "string") {
    // Apply prefix and suffix
    const decorated = addPrefixAndSuffix(formatted, prefix, suffix);

    let plain = addLineBreakPrefix(decorated, lineBreaks);
    plain = addSpaceAfter(plain, spaceAfter);

    // Optionally apply ANSI color (Node only)
    let withAnsiStyle: string | undefined;
    if (isNode) {
      withAnsiStyle = addAnsiStyle(decorated, nodeOptions.ansiStyle);
      withAnsiStyle = addLineBreakPrefix(withAnsiStyle, lineBreaks);
      withAnsiStyle = addSpaceAfter(withAnsiStyle, spaceAfter);
    }

    // Return platform-specific result
    return {
      fieldValue: plain,
      withAnsiStyle: isNode ? withAnsiStyle : undefined,
      cssStyle: isBrowser ? browserOptions.cssStyle : undefined,
    };
  }

  return {
    fieldValue: formatted,
    withAnsiStyle: "",
    cssStyle: "",
  };
};
