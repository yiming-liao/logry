import type {
  AdditionOptions,
  BaseOptions,
} from "@/core/logger/utils/merge/merge-inherited-options";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";

describe("mergeInheritedOptions", () => {
  it("should merge all fields correctly", () => {
    const base: BaseOptions = {
      scope: ["base"],
      context: { user: "alice" },
      normalizerConfig: { node: { timestamp: { style: "raw" } } },
      formatterConfig: { browser: { scope: { showOnlyLatest: true } } },
    };

    const additions: AdditionOptions = {
      scope: ["extra"],
      context: { requestId: "123" },
      normalizerConfig: { node: { meta: { errorStackLines: 5 } } },
      formatterConfig: { browser: { level: { hide: true } } },
    };

    const result = mergeInheritedOptions(base, additions);

    expect(result.scope).toEqual(["base", "extra"]);
    expect(result.context).toEqual({
      user: "alice",
      requestId: "123",
    });
    expect(result.normalizerConfig).toEqual({
      node: {
        timestamp: { style: "raw" },
        meta: { errorStackLines: 5 },
      },
    });
    expect(result.formatterConfig).toEqual({
      browser: {
        scope: { showOnlyLatest: true },
        level: { hide: true },
      },
    });
  });

  it("should use base only when additions are empty", () => {
    const base = {
      scope: ["only"],
      context: { env: "prod" },
      normalizerConfig: {},
      formatterConfig: {},
    };

    const result = mergeInheritedOptions(base);

    expect(result.scope).toEqual(["only"]);
    expect(result.context).toEqual({ env: "prod" });
    expect(result.normalizerConfig).toEqual({});
    expect(result.formatterConfig).toEqual({});
  });

  it("should handle missing base by falling back to default", () => {
    const result = mergeInheritedOptions(undefined, {
      scope: "foo",
      context: { env: "dev" },
    });

    expect(result.scope).toEqual(["foo"]);
    expect(result.context).toEqual({ env: "dev" });
    expect(result.normalizerConfig).toEqual({});
    expect(result.formatterConfig).toEqual({});
  });

  it("should return new objects and not mutate inputs", () => {
    const base: BaseOptions = {
      scope: ["log"],
      context: { a: 1 },
      normalizerConfig: { browser: { level: { style: "title" } } },
      formatterConfig: { node: { scope: { hide: true } } },
    };

    const additions: AdditionOptions = {
      scope: "new",
      context: { b: 2 },
      normalizerConfig: { browser: { level: { style: "upper" } } },
      formatterConfig: { node: { scope: { hide: false } } },
    };

    const result = mergeInheritedOptions(base, additions);

    expect(base.scope).toEqual(["log"]);
    expect(additions.scope).toBe("new");
    expect(result.scope).not.toBe(base.scope);
    expect(result.context).not.toBe(base.context);
    expect(result.normalizerConfig).not.toBe(base.normalizerConfig);
    expect(result.formatterConfig).not.toBe(base.formatterConfig);
  });
});
