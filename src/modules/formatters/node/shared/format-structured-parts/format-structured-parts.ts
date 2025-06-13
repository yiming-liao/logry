import type { FormatStructuredPartOptions } from "@/modules/formatters/node/shared/format-structured-parts/format-structured-parts-types";
import type { FormattedStructuredPart } from "@/modules/formatters/types";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";
import { addAnsiColor } from "@/modules/formatters/utils/add-ansi-color";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

/**
 * Format a structured log part with optional styles and transformations.
 */
export const formatStructuredParts = ({
  part,
  options = {},
}: {
  part: NormalizedStructuredPart;
  options: FormatStructuredPartOptions;
}): FormattedStructuredPart => {
  const {
    hide,
    prefix,
    suffix,
    ansiColor,
    lineBreaks,
    spaceAfter,
    format,
    customFormatter,
  } = options;

  // Return empty string if hide is true or part is undefined
  if (hide || !part) {
    return "";
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      label: "timestamp",
      input: { part },
      customFormatter,
    });
    if (customized) {
      return customized;
    }
  }

  // Stringify the part if format is specified, or keep it as raw
  let formatted = formatObject(part, format);

  // Apply additional stylings if it's a string
  if (typeof formatted === "string") {
    formatted = addPrefixAndSuffix(formatted, prefix, suffix);
    formatted = addAnsiColor(formatted, ansiColor);
    formatted = addLineBreakPrefix(formatted, lineBreaks);
    formatted = addSpaceAfter(formatted, spaceAfter);

    return formatted;
  }

  return formatted;
};
