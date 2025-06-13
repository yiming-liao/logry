import type { RawHostname } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedPid } from "@/modules/formatters/types";
import {
  DEFAULT_HOSTNAME_ANSI_COLOR,
  DEFAULT_HOSTNAME_HIDE,
  DEFAULT_HOSTNAME_LINE_BREAKS,
  DEFAULT_HOSTNAME_PREFIX,
  DEFAULT_HOSTNAME_SPACE_AFTER,
  DEFAULT_HOSTNAME_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

/**
 * Format an Pid string.
 *
 * @param hostname - Normalized Pid string.
 * @param rawHostname - Original raw Pid.
 * @param options - Formatting options.
 * @returns Formatted Pid string or empty string if hidden.
 */
export const formatHostname = (
  hostname: string,
  rawHostname: RawHostname,
  options: FormatStringPartOptions = {},
): FormattedPid => {
  const {
    hide = DEFAULT_HOSTNAME_HIDE,
    prefix = DEFAULT_HOSTNAME_PREFIX,
    suffix = DEFAULT_HOSTNAME_SUFFIX,
    ansiColor = DEFAULT_HOSTNAME_ANSI_COLOR,
    lineBreaks = DEFAULT_HOSTNAME_LINE_BREAKS,
    spaceAfter = DEFAULT_HOSTNAME_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "hostname",
    part: hostname,
    rawPart: rawHostname,
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
