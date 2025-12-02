import type { AdditionOptions } from "@/core/logger/base-logger/utils/merge-with-core-options";
import { mergeWithCoreOptions } from "@/core/logger/base-logger/utils/merge-with-core-options";
import { LoggerCore } from "@/core/logger-core";

describe("mergeWithCoreOptions", () => {
  it("should merge all fields correctly", () => {
    const core = new LoggerCore({
      scope: ["base"],
      context: { user: "alice" },
      normalizerConfig: { node: { timestamp: { style: "raw" } } },
      formatterConfig: { browser: { scope: { showOnlyLatest: true } } },
    });

    const additions: AdditionOptions = {
      scope: ["extra"],
      context: { requestId: "123" },
      normalizerConfig: { node: { meta: { errorStackLines: 5 } } },
      formatterConfig: { browser: { level: { hide: true } } },
    };

    const result = mergeWithCoreOptions(core, additions);

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
    const core = new LoggerCore({
      scope: ["only"],
      context: { env: "prod" },
      normalizerConfig: {},
      formatterConfig: {},
    });

    const result = mergeWithCoreOptions(core);

    expect(result.scope).toEqual(["only"]);
    expect(result.context).toEqual({ env: "prod" });
    expect(result.normalizerConfig).toEqual({});
    expect(result.formatterConfig).toEqual({});
  });

  it("should return new objects and not mutate inputs", () => {
    const core = new LoggerCore({
      scope: ["log"],
      context: { a: 1 },
      normalizerConfig: { browser: { level: { style: "title" } } },
      formatterConfig: { node: { scope: { hide: true } } },
    });

    const additions: AdditionOptions = {
      scope: "new",
      context: { b: 2 },
      normalizerConfig: { browser: { level: { style: "upper" } } },
      formatterConfig: { node: { scope: { hide: false } } },
    };

    const result = mergeWithCoreOptions(core, additions);

    expect(core.scope).toEqual(["log"]);
    expect(additions.scope).toBe("new");
    expect(result.scope).not.toBe(core.scope);
    expect(result.context).not.toBe(core.context);
    expect(result.normalizerConfig).not.toBe(core.normalizerConfig);
    expect(result.formatterConfig).not.toBe(core.formatterConfig);
  });
});
