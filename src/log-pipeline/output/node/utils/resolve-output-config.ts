import type { NodeFormatter } from "../../../../formatter-types";
import type { NodeOutputConfig } from "../../../../output-config-types";
import {
  DEFAULT_TOP_BORDER,
  DEFAULT_BOTTOM_BORDER,
  DEFAULT_USE_COLOR,
  DEFAULT_META_DEPTH,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_DATE,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_BOTTOM_LINE_BREAKS,
  DEFAULT_STRINGIFY_META,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_CONTEXT_SEPARATOR,
  DEFAULT_TOP_LINE_BREAKS,
  DEFAULT_MESSAGE_PREFIX,
} from "../../../../constants";

/**
 * Resolves a Node.js log config with default values.
 *
 * @param nodeOutputConfig Optional partial config.
 * @returns Resolved config with defaults applied.
 */
export const resolveOutputConfig = (
  nodeOutputConfig?: NodeOutputConfig,
): Omit<Required<NodeOutputConfig>, "platform" | "formatter"> & {
  formatter?: NodeFormatter;
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
    metaDepth = DEFAULT_META_DEPTH,
    topBorder = DEFAULT_TOP_BORDER,
    bottomBorder = DEFAULT_BOTTOM_BORDER,
    useColor = DEFAULT_USE_COLOR,
  } = nodeOutputConfig || {};

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
    metaDepth,
    topBorder,
    bottomBorder,
    useColor,
    formatter: nodeOutputConfig?.formatter,
  };
};
