import type { FormatStructuredPartOptions } from "@/modules/formatters/browser/shared/format-structured-parts";
import type { FormattedContext } from "@/modules/formatters/types";
import type { NormalizedContext } from "@/modules/normalizers";
import {
  DEFAULT_CONTEXT_HIDE,
  DEFAULT_CONTEXT_PREFIX,
  DEFAULT_CONTEXT_SUFFIX,
  DEFAULT_CONTEXT_CSS_STYLE,
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_CONTEXT_SPACE_AFTER,
  DEFAULT_CONTEXT_FORMAT,
} from "@/modules/formatters/browser/constants";
import { formatStructuredParts } from "@/modules/formatters/browser/shared/format-structured-parts";

export const formatContext = (
  context: NormalizedContext,
  options: FormatStructuredPartOptions<"context"> = {},
): { context: FormattedContext; cssStyle: string } => {
  const {
    hide = DEFAULT_CONTEXT_HIDE,
    prefix = DEFAULT_CONTEXT_PREFIX,
    suffix = DEFAULT_CONTEXT_SUFFIX,
    cssStyle = DEFAULT_CONTEXT_CSS_STYLE,
    lineBreaks = DEFAULT_CONTEXT_LINE_BREAKS,
    spaceAfter = DEFAULT_CONTEXT_SPACE_AFTER,
    format = DEFAULT_CONTEXT_FORMAT,
    customFormatter,
  } = options;

  return formatStructuredParts({
    label: "context",
    part: context,
    options: {
      hide,
      prefix,
      suffix,
      cssStyle,
      lineBreaks,
      spaceAfter,
      format,
      customFormatter,
    },
  });
};
