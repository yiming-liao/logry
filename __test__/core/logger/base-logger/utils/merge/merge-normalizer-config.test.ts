import type { NormalizerConfig } from "@/modules/normalizers/types";
import { mergeNormalizerConfig } from "@/core/logger/base-logger/utils/merge/merge-normalizer-config";

describe("mergeNormalizerConfig", () => {
  it("should merges node and browser config correctly", () => {
    const base: NormalizerConfig = {
      node: { timestamp: { style: "iso" } },
      browser: { scope: { separator: ":" } },
    };
    const additional: NormalizerConfig = {
      node: { meta: { errorStackLines: 10 } },
      browser: { level: { style: "title" } },
    };
    const result = mergeNormalizerConfig(base, additional);
    expect(result).toEqual({
      node: { timestamp: { style: "iso" }, meta: { errorStackLines: 10 } },
      browser: { scope: { separator: ":" }, level: { style: "title" } },
    });
  });

  it("should returns only base config when additional is undefined", () => {
    const base: NormalizerConfig = { node: { timestamp: { style: "epoch" } } };
    const result = mergeNormalizerConfig(base, undefined);
    expect(result).toEqual({
      node: { timestamp: { style: "epoch" } },
      browser: undefined,
    });
  });

  it("should returns only additional config when base is empty", () => {
    const base: NormalizerConfig = {};
    const additional: NormalizerConfig = {
      browser: { scope: { separator: ":" } },
    };
    const result = mergeNormalizerConfig(base, additional);
    expect(result).toEqual({
      node: undefined,
      browser: { scope: { separator: ":" } },
    });
  });

  it("should returns undefined for node/browser if merged result has no keys", () => {
    const result = mergeNormalizerConfig(
      { node: {}, browser: {} },
      { node: {}, browser: {} },
    );
    expect(result).toEqual({ node: undefined, browser: undefined });
  });

  it("should shallow merges and overrides base with additional", () => {
    const base: NormalizerConfig = {
      node: { meta: { errorStackLines: 10 }, timestamp: { style: "raw" } },
    };
    const additional: NormalizerConfig = {
      node: { meta: { errorStackLines: 1 } }, // entire `id` object should override
    };
    const result = mergeNormalizerConfig(base, additional);

    expect(result.node).toEqual({
      meta: { errorStackLines: 1 }, // override
      timestamp: { style: "raw" }, // retained
    });

    // Make sure original objects are not mutated
    expect(base.node?.meta?.errorStackLines).toBe(10);
    expect(additional.node?.meta?.errorStackLines).toBe(1);
  });
});
