import type { BrowserFormatterConfig } from "@/modules/formatters/browser/browser-formatter-config-types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NodeFormatterConfig } from "@/modules/formatters/node";

/**
 * Shallowly merges two formatter config objects shallowly.
 * If no keys exist in the merged node or browser config, returns undefined for each.
 *
 * @param baseConfig - The base formatter config.
 * @param additionalConfig - The additional config to merge in.
 * @returns A merged formatter config object.
 */
export const mergeFormatterConfig = (
  baseConfig: FormatterConfig,
  additionalConfig?: FormatterConfig,
): FormatterConfig => {
  // Shallow merge node config
  const mergedNode: NodeFormatterConfig = {
    ...(baseConfig.node ?? {}),
    ...(additionalConfig?.node ?? {}),
  };

  // Shallow merge browser config
  const mergedBrowser: BrowserFormatterConfig = {
    ...(baseConfig.browser ?? {}),
    ...(additionalConfig?.browser ?? {}),
  };

  // Return undefined if no keys exist in a section
  return {
    node: Object.keys(mergedNode).length ? mergedNode : undefined,
    browser: Object.keys(mergedBrowser).length ? mergedBrowser : undefined,
  };
};
