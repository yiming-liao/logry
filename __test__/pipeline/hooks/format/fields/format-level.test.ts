/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatLevel } from "@/pipeline/hooks/format/fields";

describe("formatLevel", () => {
  const ctx: any = { env: { isEdge: false }, configs: { formatConfig: {} } };

  it("uses customFormatter when it returns a value", () => {
    const result = formatLevel("info", ctx, {
      customFormatter: () => "P",
    });
    expect(result).toEqual("P");
  });

  it("throws when customFormatter throws an Error", () => {
    expect(() =>
      formatLevel("info", ctx, {
        customFormatter: () => {
          throw new Error("boom");
        },
      }),
    ).toThrow('custom "level" formatter failed: boom');
  });

  it("throws when customFormatter throws a non-Error value", () => {
    expect(() =>
      formatLevel("info", ctx, {
        customFormatter: () => {
          throw "fail";
        },
      }),
    ).toThrow('custom "level" formatter failed: fail');
  });

  it("formats level as lower", () => {
    const result = formatLevel("info", ctx, { format: "lower" });
    expect(result).toBe("info");
  });

  it("formats level as title", () => {
    const result = formatLevel("info", ctx, { format: "title" });
    expect(result).toBe("Info");
  });

  it("formats level as abbr", () => {
    const result = formatLevel("info", ctx, { format: "abbr" });
    expect(result).toBe("INF");
  });

  it("formats level as upper (default)", () => {
    const result = formatLevel("info", ctx, {});
    expect(result).toBe("INFO");
  });
});
