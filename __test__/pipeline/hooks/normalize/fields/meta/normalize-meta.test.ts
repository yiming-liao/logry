/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { normalizeMeta } from "@/pipeline/hooks/normalize/fields/meta/normalize-meta";

describe("normalizeMeta", () => {
  const fakeCtx: any = { raw: {}, configs: {}, env: {} };

  it("returns null when value is undefined", () => {
    const result = normalizeMeta(undefined, fakeCtx);
    expect(result).toBeNull();
  });

  it("applies customNormalizer when provided", () => {
    const fn = vi.fn(() => "custom-output") as any;

    const result = normalizeMeta({ a: 1 }, fakeCtx, { customNormalizer: fn });
    expect(result).toBe("custom-output");
    expect(fn).toHaveBeenCalledWith({ a: 1 }, fakeCtx);
  });

  it("throws when customNormalizer fails", () => {
    const fn = vi.fn(() => {
      throw new Error("fail");
    });
    expect(() =>
      normalizeMeta({ x: 1 }, fakeCtx, { customNormalizer: fn }),
    ).toThrow(/custom "meta" normalizer failed: fail/);
  });

  it("serializes Error into { error: serialized }", () => {
    const err = new Error("boom");
    const result = normalizeMeta(err, fakeCtx, { errorStackLines: 1 }) as any;
    expect(result).toHaveProperty("error");
    expect(result.error.message).toBe("boom");
    expect(result.error.stack!.split("\n").length).toBe(1);
  });

  it("serializes value.error when meta contains { error: Error }", () => {
    const inner = new Error("inner");
    const meta = { error: inner, other: 123 };
    const result = normalizeMeta(meta, fakeCtx, { errorStackLines: 2 }) as any;
    expect(result.other).toBe(123);
    expect(result.error.message).toBe("inner");
    expect(result.error.stack!.split("\n").length).toBe(2);
  });

  it("returns meta unchanged for normal objects", () => {
    const meta = { hello: "world" };
    const result = normalizeMeta(meta, fakeCtx);
    expect(result).toEqual(meta);
  });

  it("throws normalized error message when customNormalizer throws a non-Error value", () => {
    const fn = vi.fn(() => {
      throw "string-error";
    });
    expect(() =>
      normalizeMeta({ x: 1 }, fakeCtx, { customNormalizer: fn }),
    ).toThrow('custom "meta" normalizer failed: string-error');
  });
});
