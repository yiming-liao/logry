import type { RawTimestamp } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormattedTimestamp } from "@/modules/formatters/types";
import type { NormalizedTimestamp } from "@/modules/normalizers";
import type { Level } from "@/shared/types";
import {
  DEFAULT_TIMESTAMP_HIDE,
  DEFAULT_TIMESTAMP_PREFIX,
  DEFAULT_TIMESTAMP_SUFFIX,
  DEFAULT_TIMESTAMP_LINE_BREAKS,
  DEFAULT_TIMESTAMP_SPACE_AFTER,
  DEFAULT_TIMESTAMP_CSS_STYLE,
} from "@/modules/formatters/browser/constants";
import { formatStringParts } from "@/modules/formatters/browser/shared/format-string-parts";
import { LEVEL_CONFIG } from "@/shared/constants";

export const formatTimestamp = (
  timestamp: NormalizedTimestamp,
  rawTimestamp: RawTimestamp,
  options: FormatStringPartOptions<"timestamp"> = {},
  rawLevel: Level,
): { timestamp: FormattedTimestamp; cssStyle: string } => {
  const {
    hide = DEFAULT_TIMESTAMP_HIDE,
    prefix = DEFAULT_TIMESTAMP_PREFIX,
    suffix = DEFAULT_TIMESTAMP_SUFFIX,
    cssStyle = DEFAULT_TIMESTAMP_CSS_STYLE + LEVEL_CONFIG[rawLevel].cssColor,
    lineBreaks = DEFAULT_TIMESTAMP_LINE_BREAKS,
    spaceAfter = DEFAULT_TIMESTAMP_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "timestamp",
    part: String(timestamp),
    rawPart: rawTimestamp,
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
