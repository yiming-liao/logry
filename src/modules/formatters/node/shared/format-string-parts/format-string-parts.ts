import type {
  RawHostname,
  RawId,
  RawLevel,
  RawMessage,
  RawPid,
  RawScope,
  RawTimestamp,
} from "@/core/logger/types";
import type {
  CustomStringPartFormatter,
  FormatStringPartOptions,
} from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedStringPart } from "@/modules/formatters/types";
import { addAnsiStyle } from "@/modules/formatters/utils/add-ansi-style";
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
  label: string;
  part: string;
  rawPart:
    | RawTimestamp
    | RawId
    | RawPid
    | RawHostname
    | RawLevel
    | RawScope
    | RawMessage;
  options: FormatStringPartOptions<L>;
}): { [Key in L]: FormattedStringPart } & { withAnsiStyle: string } => {
  const {
    hide,
    prefix,
    suffix,
    ansiStyle: ansiStyle,
    lineBreaks,
    spaceAfter,
    showOnlyLatest,
    separator: customSeparator,
    customFormatter,
  } = options as FormatStringPartOptions<"scope">;

  // Return empty string if hide is true or part is a empty string
  if (hide || !part) {
    return { [label]: "", withAnsiStyle: "" } as {
      [Key in L]: FormattedStringPart;
    } & { withAnsiStyle: string };
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

  // Apply optional stylings
  let withoutAnsiStyle = "";
  withoutAnsiStyle = addLineBreakPrefix(formatted, lineBreaks);
  withoutAnsiStyle = addSpaceAfter(withoutAnsiStyle, spaceAfter);
  let withAnsiStyle = addAnsiStyle(formatted, ansiStyle);
  withAnsiStyle = addLineBreakPrefix(withAnsiStyle, lineBreaks);
  withAnsiStyle = addSpaceAfter(withAnsiStyle, spaceAfter);

  return { [label]: withoutAnsiStyle, withAnsiStyle } as {
    [Key in L]: FormattedStringPart;
  } & { withAnsiStyle: string };
};
