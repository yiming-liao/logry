import { mergeContexts } from "@/core/logger/base-logger/utils/merge/merge-contexts";

describe("mergeContexts", () => {
  it("should returns undefined when both inputs are undefined", () => {
    expect(mergeContexts(undefined, undefined)).toBeUndefined();
  });

  it("should returns baseContext when additionalContext is undefined", () => {
    const base = { user: "Alice" };
    expect(mergeContexts(base, undefined)).toEqual(base);
  });

  it("should returns additionalContext when baseContext is undefined", () => {
    const additional = { env: "prod" };
    expect(mergeContexts(undefined, additional)).toEqual(additional);
  });

  it("should merges both contexts with additionalContext taking precedence", () => {
    const base = { user: "Alice", debug: false };
    const additional = { debug: true, version: "1.0.0" };
    expect(mergeContexts(base, additional)).toEqual({
      user: "Alice",
      debug: true,
      version: "1.0.0",
    });
  });

  it("should returns a new object (does not mutate inputs)", () => {
    const base = { a: 1 };
    const additional = { b: 2 };
    const result = mergeContexts(base, additional);
    expect(result).not.toBe(base);
    expect(result).not.toBe(additional);
  });
});
