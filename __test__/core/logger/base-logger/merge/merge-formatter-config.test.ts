import type { FormatterConfig } from "@/modules/formatters/types";
import { mergeFormatterConfig } from "@/core/logger/base-logger/utils/merge/merge-formatter-config";

describe("mergeFormatterConfig", () => {
  it("should merges node and browser config correctly", () => {
    const base: FormatterConfig = {
      node: { id: { hide: true } },
      browser: { timestamp: { hide: true } },
    };
    const additional: FormatterConfig = {
      node: { message: { hide: true } },
      browser: { meta: { hide: true } },
    };
    const result = mergeFormatterConfig(base, additional);
    expect(result).toEqual({
      node: { id: { hide: true }, message: { hide: true } },
      browser: { timestamp: { hide: true }, meta: { hide: true } },
    });
  });

  it("should returns only base config when additional is undefined", () => {
    const base: FormatterConfig = { node: { id: { hide: true } } };
    const result = mergeFormatterConfig(base, undefined);
    expect(result).toEqual({
      node: { id: { hide: true } },
      browser: undefined,
    });
  });

  it("should returns only additional config when base is empty", () => {
    const base: FormatterConfig = {};
    const additional: FormatterConfig = { browser: { meta: { hide: true } } };
    const result = mergeFormatterConfig(base, additional);
    expect(result).toEqual({
      node: undefined,
      browser: { meta: { hide: true } },
    });
  });

  it("should returns undefined for node/browser if merged result has no keys", () => {
    const result = mergeFormatterConfig(
      { node: {}, browser: {} },
      { node: {}, browser: {} },
    );
    expect(result).toEqual({ node: undefined, browser: undefined });
  });

  it("should shallow merges and overrides base with additional", () => {
    const base: FormatterConfig = {
      node: { id: { hide: true }, timestamp: { hide: true } },
    };
    const additional: FormatterConfig = {
      node: { id: { hide: false } }, // entire `id` object should override
    };
    const result = mergeFormatterConfig(base, additional);

    expect(result.node).toEqual({
      id: { hide: false }, // override
      timestamp: { hide: true }, // retained
    });

    // Make sure original objects are not mutated
    expect(base.node?.id?.hide).toBe(true);
    expect(additional.node?.id?.hide).toBe(false);
  });
});
