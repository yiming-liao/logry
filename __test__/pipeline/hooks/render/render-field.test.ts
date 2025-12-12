/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderField } from "@/pipeline/hooks/render/render-field";
import { applyTextStyles } from "@/pipeline/hooks/render/utils/text-style";
import { PREFIX } from "@/shared/internal";

vi.mock("@/pipeline/hooks/render/utils/text-style", () => ({
  applyTextStyles: vi.fn(() => ({
    plain: "PLAIN",
    ansi: "ANSI",
    cssStyle: "STYLE",
  })),
}));

describe("renderField", () => {
  const ctx = { env: {} } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null structure when value is null", () => {
    const output = renderField("message", null, ctx, {
      cssStyle: "color: blue;",
    } as any);
    expect(output).toEqual({
      plain: null,
      ansi: null,
      cssStyle: "color: blue;",
    });
    expect(applyTextStyles).not.toHaveBeenCalled();
  });

  it("uses customRenderer result when it returns a value", () => {
    const customResult = { plain: "X", ansi: "Y", cssStyle: "Z" };

    const output = renderField("message", "Hello", ctx, {
      customRenderer: vi.fn(() => customResult),
    } as any);
    expect(output).toBe(customResult);
    expect(applyTextStyles).not.toHaveBeenCalled();
  });

  it("falls back to applyTextStyles when customRenderer returns undefined", () => {
    const output = renderField("message", "Hello", ctx, {
      customRenderer: vi.fn(() => undefined),
    } as any);
    expect(applyTextStyles).toHaveBeenCalled();
    expect(output).toEqual({
      plain: "PLAIN",
      ansi: "ANSI",
      cssStyle: "STYLE",
    });
  });

  it("throws a wrapped error when customRenderer throws", () => {
    const customRenderer = vi.fn(() => {
      throw new Error("boom!");
    });
    expect(() =>
      renderField("timestamp", "123", ctx, { customRenderer } as any),
    ).toThrowError(`${PREFIX} custom "timestamp" renderer failed: boom!`);
  });

  it("uses applyTextStyles when no customRenderer is provided", () => {
    const output = renderField("scope", "ABC", ctx, {});
    expect(applyTextStyles).toHaveBeenCalledWith("ABC", ctx, {});
    expect(output.plain).toBe("PLAIN");
  });

  it("passes cssStyle into applyTextStyles options", () => {
    renderField("scope", "ABC", ctx, { cssStyle: "font-weight: bold;" });
    expect(applyTextStyles).toHaveBeenCalledWith("ABC", ctx, {
      cssStyle: "font-weight: bold;",
    });
  });

  it("includes correct fieldName in the error message", () => {
    const fn = () =>
      renderField("id", "456", ctx, {
        customRenderer: () => {
          throw new Error("oops");
        },
      } as any);
    expect(fn).toThrowError(`${PREFIX} custom "id" renderer failed: oops`);
  });

  it("wraps non-Error thrown values using String(error)", () => {
    const customRenderer = () => {
      throw "BAD";
    };
    expect(() =>
      renderField("meta", "X", ctx, { customRenderer } as any),
    ).toThrowError(`${PREFIX} custom "meta" renderer failed: BAD`);
  });
});
