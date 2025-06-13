import type { RawMessage } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedMessage } from "@/modules/formatters/types";
import type { NormalizedMessage } from "@/modules/normalizers";
import {
  DEFAULT_MESSAGE_ANSI_COLOR,
  DEFAULT_MESSAGE_HIDE,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_MESSAGE_PREFIX,
  DEFAULT_MESSAGE_SPACE_AFTER,
  DEFAULT_MESSAGE_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

export const formatMessage = (
  message: NormalizedMessage,
  rawMessage: RawMessage,
  options: FormatStringPartOptions = {},
): FormattedMessage => {
  const {
    hide = DEFAULT_MESSAGE_HIDE,
    prefix = DEFAULT_MESSAGE_PREFIX,
    suffix = DEFAULT_MESSAGE_SUFFIX,
    ansiColor = DEFAULT_MESSAGE_ANSI_COLOR,
    lineBreaks = DEFAULT_MESSAGE_LINE_BREAKS,
    spaceAfter = DEFAULT_MESSAGE_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "message",
    part: String(message),
    rawPart: rawMessage,
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
