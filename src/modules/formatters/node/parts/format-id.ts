import type { RawId } from "@/core/logger/types";
import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormattedId } from "@/modules/formatters/types";
import type { NormalizedId } from "@/modules/normalizers";
import {
  DEFAULT_ID_ANSI_COLOR,
  DEFAULT_ID_HIDE,
  DEFAULT_ID_LINE_BREAKS,
  DEFAULT_ID_PREFIX,
  DEFAULT_ID_SPACE_AFTER,
  DEFAULT_ID_SUFFIX,
} from "@/modules/formatters/node/constants";
import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";

/**
 * Format an ID string with optional brackets and trailing space.
 *
 * @param id - Normalized ID string.
 * @param rawId - Original raw ID.
 * @param options - Formatting options.
 * @returns Formatted ID string or empty string if hidden.
 */
export const formatId = (
  id: NormalizedId,
  rawId: RawId,
  options: FormatStringPartOptions = {},
): FormattedId => {
  const {
    hide = DEFAULT_ID_HIDE,
    prefix = DEFAULT_ID_PREFIX,
    suffix = DEFAULT_ID_SUFFIX,
    ansiColor = DEFAULT_ID_ANSI_COLOR,
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
      ansiColor,
      lineBreaks,
      spaceAfter,
      customFormatter,
    },
  });
};
