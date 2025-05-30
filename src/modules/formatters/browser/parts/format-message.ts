import type { RawMessage } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormattedMessage } from "@/modules/formatters/types";
import type { NormalizedMessage } from "@/modules/normalizers";
import {
  DEFAULT_MESSAGE_HIDE,
  DEFAULT_MESSAGE_PREFIX,
  DEFAULT_MESSAGE_SUFFIX,
  DEFAULT_MESSAGE_CSS_STYLE,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_MESSAGE_SPACE_AFTER,
} from "@/modules/formatters/browser/constants";
import { formatStringParts } from "@/modules/formatters/browser/shared/format-string-parts";

export const formatMessage = (
  message: NormalizedMessage,
  rawMessage: RawMessage,
  options: FormatStringPartOptions<"message"> = {},
): { message: FormattedMessage; cssStyle: string } => {
  const {
    hide = DEFAULT_MESSAGE_HIDE,
    prefix = DEFAULT_MESSAGE_PREFIX,
    suffix = DEFAULT_MESSAGE_SUFFIX,
    cssStyle = DEFAULT_MESSAGE_CSS_STYLE,
    lineBreaks = DEFAULT_MESSAGE_LINE_BREAKS,
    spaceAfter = DEFAULT_MESSAGE_SPACE_AFTER,
    customFormatter,
  } = options;

  return formatStringParts({
    label: "message",
    part: message,
    rawPart: rawMessage,
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
