import type { WriteConfig } from "../../types";
import {
  DEFAULT_BORDER_WIDTH,
  DEFAULT_USE_COLOR,
  DEFAULT_META_DEPTH,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_DATE,
} from "../../constants";

/**
 * Normalizes a WriteConfig object by applying default values.
 *
 * @param writeConfig - Partial config object for output settings.
 * @returns Fully populated config with defaults applied.
 */
export const normalizedWriteConfig = (writeConfig: WriteConfig = {}) => {
  const {
    hideId = DEFAULT_HIDE_ID,
    hideContext = DEFAULT_HIDE_CONTEXT,
    showOnlyLatestContext = DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
    hideDate = DEFAULT_HIDE_DATE,
    node: {
      metaDepth = DEFAULT_META_DEPTH,
      borderWidth = DEFAULT_BORDER_WIDTH,
      useColor = DEFAULT_USE_COLOR,
    } = {},
  } = writeConfig;

  return {
    hideId,
    hideContext,
    showOnlyLatestContext,
    hideDate,
    metaDepth,
    borderWidth,
    useColor,
  };
};
