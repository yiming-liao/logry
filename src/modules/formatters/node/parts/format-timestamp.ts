import type { RawTimestamp } from "@/core/logger/types";
import type { FormattedTimestamp } from "@/modules/formatters/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { NormalizedTimestamp } from "@/modules/normalizers";
import {
  DEFAULT_TIMESTAMP_PREFIX,
  DEFAULT_TIMESTAMP_ANSI_COLOR,
  DEFAULT_TIMESTAMP_HIDE,
  DEFAULT_TIMESTAMP_LINE_BREAKS,
  DEFAULT_TIMESTAMP_SUFFIX,
  DEFAULT_TIMESTAMP_SPACE_AFTER,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

export const formatTimestamp = (
  timestamp: NormalizedTimestamp,
  rawTimestamp: RawTimestamp,
  options: FormatStringPartOptions = {},
): FormattedTimestamp => {
  const {
    hide = DEFAULT_TIMESTAMP_HIDE,
    prefix = DEFAULT_TIMESTAMP_PREFIX,
    suffix = DEFAULT_TIMESTAMP_SUFFIX,
    ansiColor = DEFAULT_TIMESTAMP_ANSI_COLOR,
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
      ansiColor,
      lineBreaks,
      spaceAfter,
      customFormatter,
    },
  });
};
