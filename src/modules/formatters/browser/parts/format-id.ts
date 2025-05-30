import type { RawId } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormattedId } from "@/modules/formatters/types";
import type { NormalizedId } from "@/modules/normalizers";
import {
  DEFAULT_ID_HIDE,
  DEFAULT_ID_PREFIX,
  DEFAULT_ID_SUFFIX,
  DEFAULT_ID_CSS_STYLE,
  DEFAULT_ID_LINE_BREAKS,
  DEFAULT_ID_SPACE_AFTER,
} from "@/modules/formatters/browser/constants";
import { formatStringParts } from "@/modules/formatters/browser/shared/format-string-parts";

export const formatId = (
  id: NormalizedId,
  rawId: RawId,
  options: FormatStringPartOptions<"id"> = {},
): { id: FormattedId; cssStyle: string } => {
  const {
    hide = DEFAULT_ID_HIDE,
    prefix = DEFAULT_ID_PREFIX,
    suffix = DEFAULT_ID_SUFFIX,
    cssStyle = DEFAULT_ID_CSS_STYLE,
    lineBreaks = DEFAULT_ID_LINE_BREAKS,
    spaceAfter = DEFAULT_ID_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "id",
    part: id,
    rawPart: rawId,
    options: {
      hide,
      prefix,
      suffix,
      cssStyle,
      lineBreaks,
      spaceAfter,
      customFormatter,
    },
  });
};
