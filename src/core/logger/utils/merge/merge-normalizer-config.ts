import type {
  BaseNormalizerConfig,
  NormalizerConfig,
} from "@/modules/normalizers/normalizer-config-types";

/**
 * Shallowly merges two normalizer config objects shallowly.
 * If no keys exist in the merged node or browser config, returns undefined for each.
 *
 * @param baseConfig - The base normalizer config.
 * @param additionalConfig - The additional config to merge in.
 * @returns A merged normalizer config object.
 */
export const mergeNormalizerConfig = (
  baseConfig: NormalizerConfig,
  additionalConfig?: NormalizerConfig,
): NormalizerConfig => {
  // Shallow merge node config
  const mergedNode: BaseNormalizerConfig = {
    ...(baseConfig.node ?? {}),
    ...(additionalConfig?.node ?? {}),
  };

  // Shallow merge browser config
  const mergedBrowser: BaseNormalizerConfig = {
    ...(baseConfig.browser ?? {}),
    ...(additionalConfig?.browser ?? {}),
  };

  // Return undefined if no keys exist in a section
  return {
    node: Object.keys(mergedNode).length ? mergedNode : undefined,
    browser: Object.keys(mergedBrowser).length ? mergedBrowser : undefined,
  };
};
