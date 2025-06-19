import type { RawLevel } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedLevel } from "@/modules/formatters/types";
import type { NormalizedLevel } from "@/modules/normalizers";
import {
  DEFAULT_LEVEL_HIDE,
  DEFAULT_LEVEL_LINE_BREAKS,
  DEFAULT_LEVEL_PREFIX,
  DEFAULT_LEVEL_SPACE_AFTER,
  DEFAULT_LEVEL_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";
import { LEVEL_CONFIG } from "@/shared/constants";

export const formatLevel = (
  level: NormalizedLevel,
  rawLevel: RawLevel,
  options: FormatStringPartOptions<"level"> = {},
): { level: FormattedLevel; withAnsiStyle: FormattedLevel } => {
  const {
    hide = DEFAULT_LEVEL_HIDE,
    prefix = DEFAULT_LEVEL_PREFIX,
    suffix = DEFAULT_LEVEL_SUFFIX,
    ansiStyle: ansiStyle = LEVEL_CONFIG[rawLevel].ansiStyle,
    lineBreaks = DEFAULT_LEVEL_LINE_BREAKS,
    spaceAfter = DEFAULT_LEVEL_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "level",
    part: String(level),
    rawPart: rawLevel,
    options: {
      hide,
      prefix,
      suffix,
      ansiStyle: ansiStyle,
      lineBreaks,
      spaceAfter,
      customFormatter,
    },
  });
};
