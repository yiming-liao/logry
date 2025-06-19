import type { FormatStructuredPartOptions } from "@/modules/formatters/node/shared/format-structured-parts";
import type { FormattedMeta } from "@/modules/formatters/types";
import type { NormalizedMeta } from "@/modules/normalizers";
import {
  DEFAULT_META_HIDE,
  DEFAULT_META_PREFIX,
  DEFAULT_META_SUFFIX,
  DEFAULT_META_ANSI_COLOR,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_META_FORMAT,
  DEFAULT_META_SPACE_AFTER,
  DEFAULT_META_INDENTS,
} from "@/modules/formatters/node/constants";
import { formatStructuredParts } from "@/modules/formatters/node/shared/format-structured-parts";

export const formatMeta = (
  meta: NormalizedMeta,
  options: FormatStructuredPartOptions<"meta"> = {},
): { meta: FormattedMeta; withAnsiStyle: FormattedMeta } => {
  const {
    hide = DEFAULT_META_HIDE,
    prefix = DEFAULT_META_PREFIX,
    suffix = DEFAULT_META_SUFFIX,
    ansiStyle = DEFAULT_META_ANSI_COLOR,
    lineBreaks = DEFAULT_META_LINE_BREAKS,
    format = DEFAULT_META_FORMAT,
    spaceAfter = DEFAULT_META_SPACE_AFTER,
    indent = DEFAULT_META_INDENTS,
    customFormatter,
  } = options;

  return formatStructuredParts({
    label: "meta",
    part: meta,
    options: {
      hide,
      prefix,
      suffix,
      ansiStyle,
      lineBreaks,
      format,
      spaceAfter,
      indent,
      customFormatter,
    },
  });
};
