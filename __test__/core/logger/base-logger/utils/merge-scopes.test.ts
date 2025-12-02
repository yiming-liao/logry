import { mergeScopes } from "@/core/logger/base-logger/utils/merge-scopes";

describe("mergeScopes", () => {
  it("should return baseScope if additionalScope is undefined", () => {
    const base = ["core", "debug"];
    const result = mergeScopes(base);
    expect(result).toEqual(["core", "debug"]);
  });

  it("should append a single string to baseScope", () => {
    const base = ["core"];
    const result = mergeScopes(base, "debug");
    expect(result).toEqual(["core", "debug"]);
  });

  it("should append multiple scopes from array to baseScope", () => {
    const base = ["core"];
    const result = mergeScopes(base, ["debug", "warn"]);
    expect(result).toEqual(["core", "debug", "warn"]);
  });

  it("should not mutate the original baseScope", () => {
    const base = ["core"];
    const result = mergeScopes(base, "debug");
    expect(base).toEqual(["core"]);
    expect(result).not.toBe(base); // different reference
  });
});
