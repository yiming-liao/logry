import type { FormatStructuredPartOptions } from "@/modules/formatters/node/shared/format-structured-parts";
import type { FormattedContext } from "@/modules/formatters/types";
import type { NormalizedContext } from "@/modules/normalizers";
import {
  DEFAULT_CONTEXT_HIDE,
  DEFAULT_CONTEXT_FORMAT,
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_CONTEXT_PREFIX,
  DEFAULT_CONTEXT_SUFFIX,
  DEFAULT_CONTEXT_ANSI_COLOR,
  DEFAULT_CONTEXT_SPACE_AFTER,
} from "@/modules/formatters/node/constants";
import { formatStructuredParts } from "@/modules/formatters/node/shared/format-structured-parts";

export const formatContext = (
  context: NormalizedContext,
  options: FormatStructuredPartOptions<"context"> = {},
): { context: FormattedContext; withAnsiColor: FormattedContext } => {
  const {
    hide = DEFAULT_CONTEXT_HIDE,
    prefix = DEFAULT_CONTEXT_PREFIX,
    suffix = DEFAULT_CONTEXT_SUFFIX,
    ansiColor = DEFAULT_CONTEXT_ANSI_COLOR,
    lineBreaks = DEFAULT_CONTEXT_LINE_BREAKS,
    format = DEFAULT_CONTEXT_FORMAT,
    spaceAfter = DEFAULT_CONTEXT_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStructuredParts({
    label: "context",
    part: context,
    options: {
      hide,
      prefix,
      suffix,
      ansiColor,
      lineBreaks,
      format,
      spaceAfter,
      customFormatter,
    },
  });
};
