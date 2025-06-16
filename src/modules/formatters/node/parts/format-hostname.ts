import type { RawHostname } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedHostname } from "@/modules/formatters/types";
import {
  DEFAULT_HOSTNAME_ANSI_COLOR,
  DEFAULT_HOSTNAME_HIDE,
  DEFAULT_HOSTNAME_LINE_BREAKS,
  DEFAULT_HOSTNAME_PREFIX,
  DEFAULT_HOSTNAME_SPACE_AFTER,
  DEFAULT_HOSTNAME_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

export const formatHostname = (
  hostname: string,
  rawHostname: RawHostname,
  options: FormatStringPartOptions<"hostname"> = {},
): { hostname: FormattedHostname; withAnsiColor: FormattedHostname } => {
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
