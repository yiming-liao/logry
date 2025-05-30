import type {
  RawId,
  RawLevel,
  RawMessage,
  RawScope,
  RawTimestamp,
} from "@/core/logger/types";
import type {
  CustomStringPartFormatter,
  FormatStringPartOptions,
} from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormattedStringPart } from "@/modules/formatters/types";
import type { ScopeSeparator } from "@/modules/normalizers";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";
import { LEVEL_CONFIG } from "@/shared/constants";

/**
 * Format a log string part with optional styles and transformations.
 */
export const formatStringParts = <L extends string>({
  label,
  part,
  rawPart,
  options,
}: {
  label: L;
  part: string;
  rawPart: RawTimestamp | RawId | RawLevel | RawScope | RawMessage;
  options: FormatStringPartOptions<L>;
  separator?: ScopeSeparator;
}): { [Key in L]: FormattedStringPart } & { cssStyle: string } => {
  const {
    hide,
    prefix,
    suffix,
    cssStyle = "",
    lineBreaks,
    spaceAfter,
    showOnlyLatest,
    separator: customSeparator,
    customFormatter,
  } = options as FormatStringPartOptions<"scope">;

  // Return empty string if hide is true or part is a empty string
  if (hide || !part) {
    return { [label]: "", cssStyle: "" } as {
      [Key in L]: FormattedStringPart;
    } & { cssStyle: string };
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      label,
      input: { part, rawPart },
      customFormatter: customFormatter as CustomStringPartFormatter<L>,
    });
    if (customized) {
      return customized;
    }
  }

  // Handle "scope" formatting logic
  if (label === "scope" && Array.isArray(rawPart)) {
    part = resolveScopeString({
      scope: part,
      rawScope: rawPart,
      showOnlyLatest,
      customSeparator,
    });
  }

  // Apply optional prefix/suffix
  let formatted = addPrefixAndSuffix(part, prefix, suffix);

  // Handle "level" formatting logic, padding for 4-char levels like "INFO", "WARN"
  if (
    label === "level" &&
    typeof rawPart === "string" &&
    rawPart in LEVEL_CONFIG &&
    rawPart.length === 4
  ) {
    formatted += " ";
  }
  // const colored = addAnsiColor(surrounded, ansiColor);
  formatted = addLineBreakPrefix(formatted, lineBreaks);
  formatted = addSpaceAfter(formatted, spaceAfter);

  return { [label]: formatted, cssStyle } as {
    [Key in L]: FormattedStringPart;
  } & { cssStyle: string };
};
