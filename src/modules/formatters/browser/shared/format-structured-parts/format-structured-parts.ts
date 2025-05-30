import type {
  CustomStructuredPartFormatter,
  FormatStructuredPartOptions,
} from "@/modules/formatters/browser/shared/format-structured-parts/format-structured-parts-types";
import type { FormattedStructuredPart } from "@/modules/formatters/types";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

/**
 * Format a structured log part with optional styles and transformations.
 */
export const formatStructuredParts = <L extends string>({
  label,
  part,
  options = {},
}: {
  label: L;
  part: NormalizedStructuredPart;
  options: FormatStructuredPartOptions;
}): { [Key in L]: FormattedStructuredPart } & { cssStyle: string } => {
  const {
    hide,
    prefix,
    suffix,
    cssStyle = "", // Need to make sure it's a string, or it will print undefined in the console
    lineBreaks,
    spaceAfter,
    format,
    customFormatter,
  } = options;

  // Return empty string if hide is true or part is undefined
  if (hide || !part) {
    return { [label]: "", cssStyle: "" } as {
      [Key in L]: FormattedStructuredPart;
    } & { cssStyle: string };
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      label,
      input: { part },
      customFormatter: customFormatter as CustomStructuredPartFormatter<L>,
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
    formatted = addLineBreakPrefix(formatted, lineBreaks);
    formatted = addSpaceAfter(formatted, spaceAfter);

    return { [label]: formatted, cssStyle } as {
      [Key in L]: FormattedStructuredPart;
    } & { cssStyle: string };
  }

  return { [label]: formatted, cssStyle } as {
    [Key in L]: FormattedStructuredPart;
  } & { cssStyle: string };
};
