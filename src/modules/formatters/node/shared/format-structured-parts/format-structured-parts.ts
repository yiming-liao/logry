import type {
  CustomStructuredPartFormatter,
  FormatStructuredPartOptions,
} from "@/modules/formatters/node/shared/format-structured-parts/format-structured-parts-types";
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
export const formatStructuredParts = <L extends string>({
  label,
  part,
  options = {},
}: {
  label: L;
  part: NormalizedStructuredPart;
  options: FormatStructuredPartOptions;
}): { [Key in L]: FormattedStructuredPart } & { withAnsiColor: string } => {
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
    return { [label]: "", withAnsiColor: "" } as {
      [Key in L]: FormattedStructuredPart;
    } & { withAnsiColor: string };
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      label: "timestamp",
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
    let withoutAnsiColor = "";
    withoutAnsiColor = addLineBreakPrefix(formatted, lineBreaks);
    withoutAnsiColor = addSpaceAfter(withoutAnsiColor, spaceAfter);
    let withAnsiColor = addAnsiColor(formatted, ansiColor);
    withAnsiColor = addLineBreakPrefix(withAnsiColor, lineBreaks);
    withAnsiColor = addSpaceAfter(withAnsiColor, spaceAfter);

    return { [label]: withoutAnsiColor, withAnsiColor } as {
      [Key in L]: FormattedStructuredPart;
    } & { withAnsiColor: string };
  }

  return { [label]: formatted, withAnsiColor: "" } as {
    [Key in L]: FormattedStructuredPart;
  } & { withAnsiColor: string };
};
