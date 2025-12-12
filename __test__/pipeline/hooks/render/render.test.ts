/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@/pipeline/hooks/render/render";
import { renderField } from "@/pipeline/hooks/render/render-field";
import { PREFIX } from "@/shared/internal";

vi.mock("@/pipeline/hooks/render/render-field", () => ({
  renderField: vi.fn((fieldName, value, ctx, options) => ({
    plain: `plain-${fieldName}`,
    ansi: `ansi-${fieldName}`,
    cssStyle: options?.cssStyle ?? null,
  })),
}));

describe("render hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws when ctx.formatted is missing", async () => {
    const ctx: any = {
      configs: { renderConfig: {} },
    };
    const fn = () => render.run(ctx);
    expect(fn).toThrowError(
      `${PREFIX} render hook received an unformatted context.`,
    );
  });

  it("renders all fields using renderField and assigns ctx.rendered", () => {
    const ctx: any = {
      formatted: {
        timestamp: "T",
        id: "ID",
        level: "INFO",
        scope: ["a", "b"],
        message: "Hello",
        meta: { x: 1 },
        context: { y: 2 },
      },
      configs: {
        renderConfig: {
          level: { cssStyle: "color:red;" },
          message: { cssStyle: "font-weight:bold;" },
        },
      },
    };

    render.run(ctx);

    expect(ctx.rendered).toBeDefined();
    expect(ctx.rendered.timestamp.plain).toBe("plain-timestamp");
    expect(ctx.rendered.id.plain).toBe("plain-id");
    expect(ctx.rendered.level.cssStyle).toBe("color:red;");
    expect(ctx.rendered.scope.plain).toBe("plain-scope");
    expect(ctx.rendered.message.cssStyle).toBe("font-weight:bold;");
    expect(ctx.rendered.meta.plain).toBe("plain-meta");
    expect(ctx.rendered.context.plain).toBe("plain-context");
  });

  it("calls renderField with correct arguments for each field", () => {
    const ctx: any = {
      formatted: {
        timestamp: "TS",
        id: "ID",
        level: "ERR",
        scope: ["x"],
        message: "Msg",
        meta: { m: 1 },
        context: { c: 2 },
      },
      configs: {
        renderConfig: {
          timestamp: { cssStyle: "a" },
          id: { cssStyle: "b" },
          level: { cssStyle: "c" },
          scope: { cssStyle: "d" },
          message: { cssStyle: "e" },
          meta: { cssStyle: "f" },
          context: { cssStyle: "g" },
        },
      },
    };

    render.run(ctx);

    const calls = (renderField as any).mock.calls;
    expect(calls.length).toBe(7);

    expect(calls[0]).toEqual(["timestamp", "TS", ctx, { cssStyle: "a" }]);
    expect(calls[1]).toEqual(["id", "ID", ctx, { cssStyle: "b" }]);
    expect(calls[2]).toEqual(["level", "ERR", ctx, { cssStyle: "c" }]);
    expect(calls[3]).toEqual(["scope", ["x"], ctx, { cssStyle: "d" }]);
    expect(calls[4]).toEqual(["message", "Msg", ctx, { cssStyle: "e" }]);
    expect(calls[5]).toEqual(["meta", { m: 1 }, ctx, { cssStyle: "f" }]);
    expect(calls[6]).toEqual(["context", { c: 2 }, ctx, { cssStyle: "g" }]);
  });

  it("falls back to an empty renderConfig when it is missing", () => {
    const ctx: any = {
      formatted: {
        timestamp: "T",
        id: "ID",
        level: "L",
        scope: [],
        message: "M",
        meta: null,
        context: null,
      },
      configs: {},
    };

    render.run(ctx);

    const calls = (renderField as any).mock.calls;
    expect(calls.length).toBe(7);

    expect(calls[0]).toEqual(["timestamp", "T", ctx, undefined]);

    expect(ctx.rendered.timestamp).toBeDefined();
  });
});
