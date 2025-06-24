import type { BrowserNormalizerConfig } from "@/modules/normalizers/types/normalizer-config/browser-normalizer-config";
import type { EdgeNormalizerConfig } from "@/modules/normalizers/types/normalizer-config/edge-normalizer-config";
import type { NodeNormalizerConfig } from "@/modules/normalizers/types/normalizer-config/node-normalizer-config";

export { NodeNormalizerConfig } from "./node-normalizer-config";
export { BrowserNormalizerConfig } from "./browser-normalizer-config";
export { EdgeNormalizerConfig } from "./edge-normalizer-config";

/** Normalizing config for all platforms */
export type NormalizerConfig = {
  /** Node-specific config */
  node?: NodeNormalizerConfig;
  /** Browser-specific config */
  browser?: BrowserNormalizerConfig;
  /** Edge-specific config */
  edge?: EdgeNormalizerConfig;
};
