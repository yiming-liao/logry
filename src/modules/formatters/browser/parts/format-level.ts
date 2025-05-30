import type { RawLevel } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormattedLevel } from "@/modules/formatters/types";
import type { NormalizedLevel } from "@/modules/normalizers";
import {
  DEFAULT_LEVEL_HIDE,
  DEFAULT_LEVEL_PREFIX,
  DEFAULT_LEVEL_SUFFIX,
  DEFAULT_LEVEL_CSS_STYLE,
  DEFAULT_LEVEL_LINE_BREAKS,
  DEFAULT_LEVEL_SPACE_AFTER,
} from "@/modules/formatters/browser/constants";
import { formatStringParts } from "@/modules/formatters/browser/shared/format-string-parts";
import { LEVEL_CONFIG } from "@/shared/constants";

export const formatLevel = (
  level: NormalizedLevel,
  rawLevel: RawLevel,
  options: FormatStringPartOptions<"level"> = {},
): { level: FormattedLevel; cssStyle: string } => {
  const {
    hide = DEFAULT_LEVEL_HIDE,
    prefix = DEFAULT_LEVEL_PREFIX,
    suffix = DEFAULT_LEVEL_SUFFIX,
    cssStyle = DEFAULT_LEVEL_CSS_STYLE + LEVEL_CONFIG[rawLevel].cssColor,
    lineBreaks = DEFAULT_LEVEL_LINE_BREAKS,
    spaceAfter = DEFAULT_LEVEL_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "level",
    part: level,
    rawPart: rawLevel,
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
