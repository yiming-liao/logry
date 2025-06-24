import type { BrowserFormatterConfig } from "@/modules/formatters/types/formatter-config/browser-formatter-config";
import type { EdgeFormatterConfig } from "@/modules/formatters/types/formatter-config/edge-formatter-config";
import type { NodeFormatterConfig } from "@/modules/formatters/types/formatter-config/node-formatter-config";

export { NodeFormatterConfig } from "./node-formatter-config";
export { BrowserFormatterConfig } from "./browser-formatter-config";
export { EdgeFormatterConfig } from "./edge-formatter-config";

/** Formatting config for all platforms */
export type FormatterConfig = {
  /** Node-specific config */
  node?: NodeFormatterConfig;
  /** Browser-specific config */
  browser?: BrowserFormatterConfig;
  /** Edge-specific config */
  edge?: EdgeFormatterConfig;
};
