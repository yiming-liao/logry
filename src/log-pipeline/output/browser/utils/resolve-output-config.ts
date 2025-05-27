import type { BrowserFormatter } from "../../../../formatter-types";
import type { BrowserOutputConfig } from "../../../../output-config-types";
import {
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_DATE,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_BOTTOM_LINE_BREAKS,
  DEFAULT_STRINGIFY_META,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_CONTEXT_SEPARATOR,
  DEFAULT_MESSAGE_PREFIX,
  DEFAULT_TOP_LINE_BREAKS,
} from "../../../../constants";

/**
 * Resolves a browser log config with default values.
 *
 * @param browserOutputConfig Optional partial config.
 * @returns Resolved config with defaults applied.
 */
export const resolveOutputConfig = (
  browserOutputConfig?: BrowserOutputConfig,
): Omit<Required<BrowserOutputConfig>, "platform" | "formatter"> & {
  formatter?: BrowserFormatter;
} => {
  const {
    hideDate = DEFAULT_HIDE_DATE,
    hideId = DEFAULT_HIDE_ID,
    hideContext = DEFAULT_HIDE_CONTEXT,
    contextSeparator = DEFAULT_CONTEXT_SEPARATOR,
    showOnlyLatestContext = DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
    messagePrefix = DEFAULT_MESSAGE_PREFIX,
    messageLineBreaks = DEFAULT_MESSAGE_LINE_BREAKS,
    metaLineBreaks = DEFAULT_META_LINE_BREAKS,
    topLineBreaks = DEFAULT_TOP_LINE_BREAKS,
    bottomLineBreaks = DEFAULT_BOTTOM_LINE_BREAKS,
    stringifyMeta = DEFAULT_STRINGIFY_META,
  } = browserOutputConfig || {};

  return {
    hideDate,
    hideId,
    hideContext,
    contextSeparator,
    showOnlyLatestContext,
    messagePrefix,
    messageLineBreaks,
    metaLineBreaks,
    topLineBreaks,
    bottomLineBreaks,
    stringifyMeta,
    formatter: browserOutputConfig?.formatter,
  };
};
