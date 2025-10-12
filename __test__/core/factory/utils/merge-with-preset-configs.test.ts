import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { LoggerPreset } from "@/presets";
import { mergeWithPresetConfigs } from "@/core/factory/utils/merge-with-preset-configs";
import { logryPresets } from "@/presets";

const normalizerConfig: NormalizerConfig = {
  node: { level: { style: "lower" } },
};
const formatterConfig: FormatterConfig = {
  node: { id: { hide: true } },
};

describe("mergeWithPresetConfigs", () => {
  it("should return original configs if no presetName is provided", () => {
    const result = mergeWithPresetConfigs(
      undefined,
      normalizerConfig,
      formatterConfig,
    );

    expect(result).toEqual({ normalizerConfig, formatterConfig });
  });

  it("should merge preset configs with provided configs", () => {
    const presetName = Object.keys(logryPresets)[0] as LoggerPreset;

    const presetNormalizerConfig = logryPresets[presetName]?.normalizerConfig;
    const presetFormatterConfig = logryPresets[presetName]?.formatterConfig;

    const result = mergeWithPresetConfigs(
      presetName,
      normalizerConfig,
      formatterConfig,
    );

    expect(result.normalizerConfig).toEqual({
      ...presetNormalizerConfig,
      ...normalizerConfig,
    });

    expect(result.formatterConfig).toEqual({
      ...presetFormatterConfig,
      ...formatterConfig,
    });
  });

  it("should handle preset with undefined configs", () => {
    const fakePreset = "nonexistent";

    const result = mergeWithPresetConfigs(
      // @ts-expect-error Non-exist key
      fakePreset,
      normalizerConfig,
      formatterConfig,
    );

    expect(result).toEqual({ normalizerConfig, formatterConfig });
  });
});
