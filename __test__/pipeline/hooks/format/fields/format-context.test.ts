/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatContext } from "@/pipeline/hooks/format/fields";

describe("formatContext", () => {
  const baseCtx: any = {
    env: { isPlain: false },
    configs: { formatConfig: {} },
  };

  it("returns null when value is null", () => {
    const result = formatContext(null, baseCtx);
    expect(result).toEqual(null);
  });

  it("applies customFormatter and returns its value", () => {
    const result = formatContext({ a: 1 }, baseCtx, {
      customFormatter: () => "X",
    });

    expect(result).toEqual("X");
  });

  it("falls back when customFormatter returns undefined", () => {
    const result = formatContext({ a: 1 }, baseCtx, {
      customFormatter: () => undefined,
    });

    // Should produce styled string from formatObject + applyTextStyles
    expect(result).toBeTypeOf("string");
  });

  it("throws when customFormatter throws", () => {
    expect(() =>
      formatContext({ a: 1 }, baseCtx, {
        customFormatter: () => {
          throw new Error("fail");
        },
      }),
    ).toThrow(/custom "context" formatter failed/);
  });

  it("uses compact format on plain runtime", () => {
    const ctx = {
      env: { isPlain: true },
      configs: { formatConfig: {} },
    } as any;

    const result = formatContext({ a: 1 }, ctx) as any;

    expect(result.includes("a=1")).toBe(true); // compact format
  });

  it("throws formatted error when customFormatter throws a non-Error value", () => {
    expect(() =>
      formatContext({ a: 1 }, { env: { isPlain: false } } as any, {
        customFormatter: () => {
          // throw NON Error value
          throw "boom!";
        },
      }),
    ).toThrow('custom "context" formatter failed: boom!');
  });
});
