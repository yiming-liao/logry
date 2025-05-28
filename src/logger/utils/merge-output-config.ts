import type {
  BrowserOutputConfig,
  NodeOutputConfig,
  OutputConfig,
} from "../../output-config-types";

/**
 * Merge multiple OutputConfig objects, combining their node and browser settings.
 *
 * Later configs override earlier ones for the same keys.
 *
 * @param coreConfig - Base configuration.
 * @param instanceConfig - Instance-specific configuration.
 * @param optionsConfig - Additional options configuration.
 * @returns Merged OutputConfig with combined node and browser settings, or undefined if empty.
 */
export const mergeOutputConfig = (
  baseConfig?: OutputConfig,
  additionalConfig?: OutputConfig,
): OutputConfig => {
  const mergedNode: NodeOutputConfig = {
    ...(baseConfig?.node ?? {}),
    ...(additionalConfig?.node ?? {}),
  };

  const mergedBrowser: BrowserOutputConfig = {
    ...(baseConfig?.browser ?? {}),
    ...(additionalConfig?.browser ?? {}),
  };

  return {
    node: Object.keys(mergedNode).length ? mergedNode : undefined,
    browser: Object.keys(mergedBrowser).length ? mergedBrowser : undefined,
  };
};
