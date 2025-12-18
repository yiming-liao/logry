/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatScope } from "@/pipeline/hooks/format/fields";

describe("formatScope", () => {
  const ctx: any = { env: { isEdge: false }, configs: { formatConfig: {} } };

  it("returns null when scope is empty", () => {
    const result = formatScope([], ctx, {});
    expect(result).toEqual(null);
  });

  it("uses customFormatter when it returns a value", () => {
    const result = formatScope(["a", "b"], ctx, { customFormatter: () => "P" });
    expect(result).toEqual("P");
  });

  it("throws when customFormatter throws an Error", () => {
    expect(() =>
      formatScope(["x"], ctx, {
        customFormatter: () => {
          throw new Error("boom");
        },
      }),
    ).toThrow('custom "scope" formatter failed: boom');
  });

  it("throws when customFormatter throws a non-Error value", () => {
    expect(() =>
      formatScope(["x"], ctx, {
        customFormatter: () => {
          throw "oops";
        },
      }),
    ).toThrow('custom "scope" formatter failed: oops');
  });

  it("formats using lastOnly", () => {
    const result = formatScope(["auth", "sign-in"], ctx, { lastOnly: true });
    expect(result).toBe("sign-in");
  });

  it("formats using custom separator", () => {
    const result = formatScope(["a", "b", "c"], ctx, { separator: "/" });

    expect(result).toBe("a/b/c");
  });

  it("formats using default separator", () => {
    const result = formatScope(["a", "b"], ctx, {});

    expect(result).toBe("a > b");
  });
});
