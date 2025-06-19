import type {
  CustomStructuredPartFormatter,
  FormatStructuredPartOptions,
} from "@/modules/formatters/node/shared/format-structured-parts/format-structured-parts-types";
import type { FormattedStructuredPart } from "@/modules/formatters/types";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";
import { addAnsiStyle } from "@/modules/formatters/utils/add-ansi-style";
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
}): { [Key in L]: FormattedStructuredPart } & { withAnsiStyle: string } => {
  const {
    hide,
    prefix,
    suffix,
    ansiStyle,
    lineBreaks,
    spaceAfter,
    format,
    indent,
    customFormatter,
  } = options;

  // Return empty string if hide is true or part is undefined
  if (hide || !part) {
    return { [label]: "", withAnsiStyle: "" } as {
      [Key in L]: FormattedStructuredPart;
    } & { withAnsiStyle: string };
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
  let formatted = formatObject(part, format, indent);

  // Apply additional stylings if it's a string
  if (typeof formatted === "string") {
    formatted = addPrefixAndSuffix(formatted, prefix, suffix);
    let withoutAnsiStyle = "";
    withoutAnsiStyle = addLineBreakPrefix(formatted, lineBreaks);
    withoutAnsiStyle = addSpaceAfter(withoutAnsiStyle, spaceAfter);
    let withAnsiStyle = addAnsiStyle(formatted, ansiStyle);
    withAnsiStyle = addLineBreakPrefix(withAnsiStyle, lineBreaks);
    withAnsiStyle = addSpaceAfter(withAnsiStyle, spaceAfter);

    return { [label]: withoutAnsiStyle, withAnsiStyle } as {
      [Key in L]: FormattedStructuredPart;
    } & { withAnsiStyle: string };
  }

  return { [label]: formatted, withAnsiStyle: "" } as {
    [Key in L]: FormattedStructuredPart;
  } & { withAnsiStyle: string };
};
