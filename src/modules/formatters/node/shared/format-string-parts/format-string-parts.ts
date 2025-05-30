import type {
  RawId,
  RawLevel,
  RawMessage,
  RawScope,
  RawTimestamp,
} from "@/core/logger/types";
import type { FormattedStringPart } from "@/modules/formatters/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import { addAnsiColor } from "@/modules/formatters/utils/add-ansi-color";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";
import { LEVEL_CONFIG } from "@/shared/constants";

/**
 * Format a log string part with optional styles and transformations.
 */
export const formatStringParts = ({
  label = "",
  part,
  rawPart,
  options = {},
}: {
  label: string;
  part: string;
  rawPart: RawTimestamp | RawId | RawLevel | RawScope | RawMessage;
  options: FormatStringPartOptions<"scope">;
}): FormattedStringPart => {
  const {
    hide,
    prefix,
    suffix,
    ansiColor,
    lineBreaks,
    spaceAfter,
    showOnlyLatest,
    separator: customSeparator,
    customFormatter,
  } = options;

  // Return empty string if hide is true or part is a empty string
  if (hide || !part) {
    return "";
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      label,
      input: { part, rawPart },
      customFormatter,
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
  formatted = addAnsiColor(formatted, ansiColor);
  formatted = addLineBreakPrefix(formatted, lineBreaks);
  formatted = addSpaceAfter(formatted, spaceAfter);

  return formatted;
};
