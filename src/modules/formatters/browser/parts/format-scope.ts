import type { RawScope } from "@/core/logger/types";
import type { FormattedScope } from "@/modules/formatters/types";
import type { NormalizedScope } from "@/modules/normalizers";
import {
  DEFAULT_SCOPE_HIDE,
  DEFAULT_SCOPE_PREFIX,
  DEFAULT_SCOPE_SUFFIX,
  DEFAULT_SCOPE_CSS_STYLE,
  DEFAULT_SCOPE_LINE_BREAKS,
  DEFAULT_SCOPE_SPACE_AFTER,
  DEFAULT_SCOPE_SHOW_ONLY_LATEST,
  DEFAULT_SCOPE_SEPARATOR,
} from "@/modules/formatters/browser/constants";
import {
  formatStringParts,
  type FormatStringPartOptions,
} from "@/modules/formatters/browser/shared/format-string-parts";

export const formatScope = (
  scope: NormalizedScope,
  rawScope: RawScope,
  options: FormatStringPartOptions<"scope"> = {},
): { scope: FormattedScope; cssStyle: string } => {
  const {
    hide = DEFAULT_SCOPE_HIDE,
    prefix = DEFAULT_SCOPE_PREFIX,
    suffix = DEFAULT_SCOPE_SUFFIX,
    cssStyle = DEFAULT_SCOPE_CSS_STYLE,
    lineBreaks = DEFAULT_SCOPE_LINE_BREAKS,
    spaceAfter = DEFAULT_SCOPE_SPACE_AFTER,
    separator: customSeparator = DEFAULT_SCOPE_SEPARATOR,
    showOnlyLatest = DEFAULT_SCOPE_SHOW_ONLY_LATEST,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "scope",
    part: scope,
    rawPart: rawScope,
    options: {
      hide,
      prefix,
      suffix,
      cssStyle,
      lineBreaks,
      spaceAfter,
      separator: customSeparator,
      showOnlyLatest,
      customFormatter,
    },
  });
};
