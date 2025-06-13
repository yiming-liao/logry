import type { RawPid } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedPid } from "@/modules/formatters/types";
import {
  DEFAULT_PID_ANSI_COLOR,
  DEFAULT_PID_HIDE,
  DEFAULT_PID_LINE_BREAKS,
  DEFAULT_PID_PREFIX,
  DEFAULT_PID_SPACE_AFTER,
  DEFAULT_PID_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

/**
 * Format an Pid string.
 *
 * @param pid - Normalized Pid string.
 * @param rawPid - Original raw Pid.
 * @param options - Formatting options.
 * @returns Formatted Pid string or empty string if hidden.
 */
export const formatPid = (
  pid: string,
  rawPid: RawPid,
  options: FormatStringPartOptions = {},
): FormattedPid => {
  const {
    hide = DEFAULT_PID_HIDE,
    prefix = DEFAULT_PID_PREFIX,
    suffix = DEFAULT_PID_SUFFIX,
    ansiColor = DEFAULT_PID_ANSI_COLOR,
    lineBreaks = DEFAULT_PID_LINE_BREAKS,
    spaceAfter = DEFAULT_PID_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "pid",
    part: pid,
    rawPart: rawPid,
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
