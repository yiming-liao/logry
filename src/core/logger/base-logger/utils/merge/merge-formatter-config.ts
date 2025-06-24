import type { FormatterConfig } from "@/modules/formatters/types";
import type {
  NodeFormatterConfig,
  BrowserFormatterConfig,
  EdgeFormatterConfig,
} from "@/modules/formatters/types";

/**
 * Shallowly merges two formatter config objects shallowly.
 * If no keys exist in the merged node or browser config, returns undefined for each.
 *
 * @param baseConfig - The base formatter config.
 * @param additionalConfig - The additional config to merge in.
 * @returns A merged formatter config object.
 */
export const mergeFormatterConfig = (
  baseConfig?: FormatterConfig,
  additionalConfig?: FormatterConfig,
): FormatterConfig => {
  // Shallow merge node config
  const mergedNode: NodeFormatterConfig = {
    ...(baseConfig?.node ?? {}),
    ...(additionalConfig?.node ?? {}),
  };

  // Shallow merge browser config
  const mergedBrowser: BrowserFormatterConfig = {
    ...(baseConfig?.browser ?? {}),
    ...(additionalConfig?.browser ?? {}),
  };

  // Shallow merge edge config
  const mergedEdge: EdgeFormatterConfig = {
    ...(baseConfig?.edge ?? {}),
    ...(additionalConfig?.edge ?? {}),
  };

  // Return undefined if no keys exist in a section
  return {
    node: Object.keys(mergedNode).length ? mergedNode : undefined,
    browser: Object.keys(mergedBrowser).length ? mergedBrowser : undefined,
    edge: Object.keys(mergedEdge).length ? mergedEdge : undefined,
  };
};
