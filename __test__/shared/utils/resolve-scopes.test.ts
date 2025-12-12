import { describe, it, expect } from "vitest";
import { resolveScopes } from "@/shared/utils/resolve-scopes";

describe("resolveScopes", () => {
  it("returns empty array when both scopes are undefined", () => {
    expect(resolveScopes()).toEqual([]);
  });

  it("wraps string inputs into arrays", () => {
    expect(resolveScopes("api", "user")).toEqual(["api", "user"]);
  });

  it("handles array inputs", () => {
    expect(resolveScopes(["a", "b"], ["c"])).toEqual(["a", "b", "c"]);
  });

  it("handles mix of string and array", () => {
    expect(resolveScopes(["a"], "b")).toEqual(["a", "b"]);
  });

  it("handles undefined base scope", () => {
    expect(resolveScopes(undefined, ["x", "y"])).toEqual(["x", "y"]);
  });

  it("handles undefined new scope", () => {
    expect(resolveScopes(["x"], undefined)).toEqual(["x"]);
  });

  it("merges and preserves order", () => {
    expect(resolveScopes(["root"], ["child", "leaf"])).toEqual([
      "root",
      "child",
      "leaf",
    ]);
  });
});
