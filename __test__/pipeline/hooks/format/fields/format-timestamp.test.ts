/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatTimestamp } from "@/pipeline/hooks/format/fields";

describe("formatTimestamp", () => {
  const ctx: any = { env: { isEdge: false }, configs: { formatConfig: {} } };
  const ts = Date.UTC(2025, 0, 2, 3, 4, 5, 123); // 2025-01-02 03:04:05.123 UTC

  it("returns null when hidden", () => {
    const result = formatTimestamp(ts, ctx, { hide: true });

    expect(result).toEqual(null);
  });

  it("uses customFormatter when it returns a value", () => {
    const result = formatTimestamp(ts, ctx, {
      customFormatter: () => "P",
    });

    expect(result).toEqual("P");
  });

  it("throws when customFormatter throws an Error", () => {
    expect(() =>
      formatTimestamp(ts, ctx, {
        customFormatter: () => {
          throw new Error("boom");
        },
      }),
    ).toThrow('custom "timestamp" formatter failed: boom');
  });

  it("throws when customFormatter throws a non-Error value", () => {
    expect(() =>
      formatTimestamp(ts, ctx, {
        customFormatter: () => {
          throw "oops";
        },
      }),
    ).toThrow('custom "timestamp" formatter failed: oops');
  });

  it("formats as raw", () => {
    const result = formatTimestamp(ts, ctx, { format: "raw" });

    expect(result).toBe(String(ts));
  });

  it("formats as iso", () => {
    const result = formatTimestamp(ts, ctx, { format: "iso" });

    expect(result).toBe(new Date(ts).toISOString());
  });

  it("formats as epoch seconds", () => {
    const result = formatTimestamp(ts, ctx, { format: "epoch" });

    expect(result).toBe(String(Math.floor(ts / 1000)));
  });

  it("formats as pretty timestamp (default)", () => {
    const result = formatTimestamp(ts, ctx, {}) as any;

    expect(result.includes("2025")).toBe(true);
  });

  it("formats pretty timestamp with UTC", () => {
    const result = formatTimestamp(ts, ctx, { useUTC: true }) as any;

    expect(result.includes("03:04")).toBe(true); // matches UTC time
  });

  it("formats pretty timestamp without date", () => {
    const result = formatTimestamp(ts, ctx, { withDate: false }) as any;

    expect(result.match(/^\d{2}:\d{2}:/)).not.toBeNull();
  });
});
