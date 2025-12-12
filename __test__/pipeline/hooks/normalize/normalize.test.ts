/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { normalizeMeta } from "@/pipeline/hooks/normalize/fields/meta/normalize-meta";
import { normalize } from "@/pipeline/hooks/normalize/normalize";

vi.mock("@/pipeline/hooks/normalize/fields/meta/normalize-meta", () => ({
  normalizeMeta: vi.fn(),
}));

describe("normalize hook", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      raw: {
        timestamp: 123,
        id: undefined,
        level: "info",
        scope: ["a", "b"],
        message: undefined,
        meta: { x: 1 },
        context: undefined,
      },
      configs: { normalizeConfig: {} },
      normalized: undefined,
    };

    vi.clearAllMocks();
  });

  it("normalizes fields and writes ctx.normalized", () => {
    (normalizeMeta as any).mockReturnValue({ normalized: true });
    normalize.run(ctx);
    expect(ctx.normalized).toEqual({
      timestamp: 123,
      id: null,
      level: "info",
      scope: ["a", "b"],
      message: null,
      meta: { normalized: true },
      context: null,
    });
  });

  it("calls normalizeMeta with correct payload", () => {
    const rawMeta = { x: 1 };
    ctx.raw.meta = rawMeta;
    ctx.configs.normalizeConfig = { meta: { errorStackLines: 3 } };
    (normalizeMeta as any).mockReturnValue({ result: "ok" });
    normalize.run(ctx);
    expect(normalizeMeta).toHaveBeenCalledWith(rawMeta, ctx, {
      errorStackLines: 3,
    });
  });

  it("sets meta to null when normalizeMeta returns null", () => {
    (normalizeMeta as any).mockReturnValue(null);
    normalize.run(ctx);
    expect(ctx.normalized?.meta).toBeNull();
  });

  it("assigns any returned normalizedMeta (object form)", () => {
    const metaResult = { foo: "bar" };
    (normalizeMeta as any).mockReturnValue(metaResult);
    normalize.run(ctx);
    expect(ctx.normalized?.meta).toEqual(metaResult);
  });

  it("handles primitive meta values", () => {
    (normalizeMeta as any).mockReturnValue("hello");
    normalize.run(ctx);
    expect(ctx.normalized?.meta).toBe("hello");
  });

  it("uses empty normalizeConfig when ctx.configs.normalizeConfig is undefined", () => {
    ctx.configs.normalizeConfig = undefined;
    (normalizeMeta as any).mockReturnValue({ ok: true });
    normalize.run(ctx);
    expect(normalizeMeta).toHaveBeenCalledWith(ctx.raw.meta, ctx, undefined);
  });

  it("nullIfUndef returns value when it is not undefined", () => {
    ctx.raw.message = "hello";
    normalize.run(ctx);
    expect(ctx.normalized?.message).toBe("hello");
  });
});
