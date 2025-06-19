import type { RawScope } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedScope } from "@/modules/formatters/types";
import type { NormalizedScope } from "@/modules/normalizers";
import {
  DEFAULT_SCOPE_HIDE,
  DEFAULT_SCOPE_PREFIX,
  DEFAULT_SCOPE_SUFFIX,
  DEFAULT_SCOPE_ANSI_COLOR,
  DEFAULT_SCOPE_LINE_BREAKS,
  DEFAULT_SCOPE_SPACE_AFTER,
  DEFAULT_SCOPE_SHOW_ONLY_LATEST,
  DEFAULT_SCOPE_SEPARATOR,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

export const formatScope = (
  scope: NormalizedScope,
  rawScope: RawScope,
  options: FormatStringPartOptions<"scope"> = {},
): { scope: FormattedScope; withAnsiStyle: FormattedScope } => {
  const {
    hide = DEFAULT_SCOPE_HIDE,
    prefix = DEFAULT_SCOPE_PREFIX,
    suffix = DEFAULT_SCOPE_SUFFIX,
    ansiStyle: ansiStyle = DEFAULT_SCOPE_ANSI_COLOR,
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
      ansiStyle: ansiStyle,
      lineBreaks,
      spaceAfter,
      separator: customSeparator,
      showOnlyLatest,
      customFormatter,
    },
  });
};
