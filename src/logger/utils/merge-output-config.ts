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
  coreConfig?: OutputConfig,
  instanceConfig?: OutputConfig,
  optionsConfig?: OutputConfig,
): OutputConfig => {
  // Merge node configs, with precedence: core < instance < options
  const mergedNode: NodeOutputConfig = {
    ...(coreConfig?.node ?? {}),
    ...(instanceConfig?.node ?? {}),
    ...(optionsConfig?.node ?? {}),
  };

  // Merge browser configs, same precedence order
  const mergedBrowser: BrowserOutputConfig = {
    ...(coreConfig?.browser ?? {}),
    ...(instanceConfig?.browser ?? {}),
    ...(optionsConfig?.browser ?? {}),
  };

  // Return merged config, or undefined if empty
  return {
    node: Object.keys(mergedNode).length ? mergedNode : undefined,
    browser: Object.keys(mergedBrowser).length ? mergedBrowser : undefined,
  };
};
