import type { PluginLoggerConstructorOptions } from "@/logger/plugin-logger/types";
import type { Preset } from "@/shared/presets";
import { PluginLogger } from "@/logger";
import { PRESETS } from "@/shared/presets";
import { deepMerge } from "@/shared/utils/deep-merge";

export type CreateLoggerOptions = PluginLoggerConstructorOptions;

/**
 * Creates a PluginLogger instance with an optional preset.
 */
export const createLogger = ({
  preset = "pretty",
  formatConfig,
  renderConfig,
  ...rest
}: CreateLoggerOptions & {
  preset?: Preset;
} = {}): PluginLogger => {
  const merged = {
    formatConfig: deepMerge(PRESETS[preset].formatConfig, formatConfig),
    renderConfig: deepMerge(PRESETS[preset].renderConfig, renderConfig),
  };
  return new PluginLogger({ ...merged, ...rest });
};
