/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { LoggerCore } from "@/logger/logger-core/logger-core";
import { assertLevel } from "@/shared/utils/assert-level";

vi.mock("@/shared/utils/assert-level", () => ({
  assertLevel: vi.fn(),
}));

vi.mock("@/shared/utils/resolve-scopes", () => ({
  resolveScopes: vi.fn((s) => (s ? [...([] as string[]), ...s] : [])),
}));

describe("LoggerCore", () => {
  it("constructs with defaults", () => {
    const core = new LoggerCore();

    // default level is "warn"
    expect(assertLevel).toHaveBeenCalledWith("warn");
    expect(core.level).toBe("warn");

    // default scope (resolved to empty array)
    expect(core.scope).toEqual([]);

    // context undefined passthrough
    expect(core.context).toBeUndefined();

    // id stays undefined if not provided
    expect(core.id).toBeUndefined();
  });

  it("constructs with provided options", () => {
    const core = new LoggerCore({
      id: "abc",
      level: "error",
      scope: ["api"],
      context: { foo: 1 },
    });

    expect(core.id).toBe("abc");
    expect(core.level).toBe("error");

    expect(assertLevel).toHaveBeenCalledWith("error");

    expect(core.scope).toEqual(["api"]);
    expect(core.context).toEqual({ foo: 1 });
  });

  it("setLevel updates the internal level", () => {
    const core = new LoggerCore({ level: "info" });

    core.setLevel("fatal");

    expect(assertLevel).toHaveBeenCalledWith("fatal");
    expect(core.level).toBe("fatal");
  });

  it("resetLevel restores the initial level", () => {
    const core = new LoggerCore({ level: "debug" });

    core.setLevel("error");
    expect(core.level).toBe("error");

    core.resetLevel();
    expect(core.level).toBe("debug");
  });

  it("throws if an invalid level is passed to setLevel", () => {
    const core = new LoggerCore({ level: "info" });

    (assertLevel as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
      throw new Error("Invalid level");
    });

    expect(() => core.setLevel("xxx" as any)).toThrow("Invalid level");
  });

  it("assertLevel is called for the initial level", () => {
    new LoggerCore({ level: "trace" });
    expect(assertLevel).toHaveBeenCalledWith("trace");
  });
});
