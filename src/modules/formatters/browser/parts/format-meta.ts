import type { FormatStructuredPartOptions } from "@/modules/formatters/browser/shared/format-structured-parts";
import type { FormattedMeta } from "@/modules/formatters/types";
import type { NormalizedMeta } from "@/modules/normalizers";
import {
  DEFAULT_META_HIDE,
  DEFAULT_META_PREFIX,
  DEFAULT_META_SUFFIX,
  DEFAULT_META_CSS_STYLE,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_META_SPACE_AFTER,
  DEFAULT_META_FORMAT,
  DEFAULT_META_INDENTS,
} from "@/modules/formatters/browser/constants";
import { formatStructuredParts } from "@/modules/formatters/browser/shared/format-structured-parts";

export const formatMeta = (
  meta: NormalizedMeta,
  options: FormatStructuredPartOptions<"meta"> = {},
): { meta: FormattedMeta; cssStyle: string } => {
  const {
    hide = DEFAULT_META_HIDE,
    prefix = DEFAULT_META_PREFIX,
    suffix = DEFAULT_META_SUFFIX,
    cssStyle = DEFAULT_META_CSS_STYLE,
    lineBreaks = DEFAULT_META_LINE_BREAKS,
    spaceAfter = DEFAULT_META_SPACE_AFTER,
    format = DEFAULT_META_FORMAT,
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
      cssStyle,
      lineBreaks,
      spaceAfter,
      format,
      indent,
      customFormatter,
    },
  });
};
