import { mergeContexts } from "../../../src/logger/utils/merge-contexts";

describe("mergeContexts", () => {
  it("returns undefined when both contexts are undefined", () => {
    const result = mergeContexts(undefined, undefined);
    expect(result).toBeUndefined();
  });

  it("returns baseContext when only baseContext is provided", () => {
    const base = { user: "Alice" };
    const result = mergeContexts(base, undefined);
    expect(result).toEqual(base);
  });

  it("returns additionalContext when only additionalContext is provided", () => {
    const additional = { requestId: "abc123" };
    const result = mergeContexts(undefined, additional);
    expect(result).toEqual(additional);
  });

  it("merges both contexts correctly", () => {
    const base = { user: "Alice", role: "admin" };
    const additional = { requestId: "abc123", debug: true };
    const result = mergeContexts(base, additional);
    expect(result).toEqual({
      user: "Alice",
      role: "admin",
      requestId: "abc123",
      debug: true,
    });
  });

  it("additionalContext overrides baseContext on key conflict", () => {
    const base = { user: "Alice", debug: false };
    const additional = { debug: true };
    const result = mergeContexts(base, additional);
    expect(result).toEqual({
      user: "Alice",
      debug: true,
    });
  });
});
