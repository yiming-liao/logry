/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatMeta } from "@/pipeline/hooks/format/fields";

describe("formatMeta", () => {
  const ctx: any = { env: { isPlain: false }, configs: { formatConfig: {} } };

  it("returns null when hidden", () => {
    const result = formatMeta({ a: 1 }, ctx, { hide: true });
    expect(result).toEqual(null);
  });

  it("returns null when value is null", () => {
    const result = formatMeta(null, ctx, {});
    expect(result).toEqual(null);
  });

  it("uses customFormatter when returning a value", () => {
    const result = formatMeta({ x: 1 }, ctx, { customFormatter: () => "P" });
    expect(result).toEqual("P");
  });

  it("throws when customFormatter throws an Error", () => {
    expect(() =>
      formatMeta({ x: 1 }, ctx, {
        customFormatter: () => {
          throw new Error("boom");
        },
      }),
    ).toThrow('custom "meta" formatter failed: boom');
  });

  it("throws when customFormatter throws a non-Error value", () => {
    expect(() =>
      formatMeta({ x: 1 }, ctx, {
        customFormatter: () => {
          throw "oops";
        },
      }),
    ).toThrow('custom "meta" formatter failed: oops');
  });

  it("uses compact format on plain runtime", () => {
    const okainCtx = {
      env: { isPlain: true },
      configs: { formatConfig: {} },
    } as any;
    const result = formatMeta({ x: 1 }, okainCtx, {}) as any;
    expect(result.includes("x=1")).toBe(true);
  });

  it("stringifies using chosen format for non-plain", () => {
    const result = formatMeta({ x: 1 }, ctx, {
      format: "pretty",
      indent: 2,
    }) as any;
    expect(result.includes('  "x": 1')).toBe(true);
  });
});
