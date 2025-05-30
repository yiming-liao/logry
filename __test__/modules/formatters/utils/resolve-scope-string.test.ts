import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";

describe("resolveScopeString", () => {
  it("should return empty string if rawScope is empty", () => {
    const result = resolveScopeString({
      scope: "",
      rawScope: [],
    });
    expect(result).toBe("");
  });

  it("should return the last segment if showOnlyLatest is true", () => {
    const result = resolveScopeString({
      scope: "user.auth.login",
      rawScope: ["user", "auth", "login"],
      showOnlyLatest: true,
    });
    expect(result).toBe("login");
  });

  it("should return rawScope joined by custom separator", () => {
    const result = resolveScopeString({
      scope: "user.auth.login",
      rawScope: ["user", "auth", "login"],
      customSeparator: " > ",
    });
    expect(result).toBe("user > auth > login");
  });

  it("should return normalized scope if no options are set", () => {
    const result = resolveScopeString({
      scope: "user.auth.login",
      rawScope: ["user", "auth", "login"],
    });
    expect(result).toBe("user.auth.login");
  });

  it("should prioritize showOnlyLatest over customSeparator", () => {
    const result = resolveScopeString({
      scope: "user.auth.login",
      rawScope: ["user", "auth", "login"],
      showOnlyLatest: true,
      customSeparator: " > ",
    });
    expect(result).toBe("login");
  });
});
