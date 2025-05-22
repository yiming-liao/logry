import { CONTEXT_SEPARATOR } from "../../../src/constants";
import { getLatestContext } from "../../../src/write/utils/get-latest-context";

describe("getLatestContext", () => {
  it("returns undefined if context is undefined", () => {
    expect(getLatestContext(undefined)).toBeUndefined();
  });

  it("returns the full context if no separator present", () => {
    expect(getLatestContext("singlecontext")).toBe("singlecontext");
  });

  it("returns the last segment when multiple segments exist", () => {
    const context = `part1${CONTEXT_SEPARATOR}part2${CONTEXT_SEPARATOR}lastpart`;
    expect(getLatestContext(context)).toBe("lastpart");
  });

  it("works with a custom separator", () => {
    const context = "a-b-c";
    expect(getLatestContext(context, "-")).toBe("c");
  });
});
