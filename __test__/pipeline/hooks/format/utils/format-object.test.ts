/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { formatObject } from "@/pipeline/hooks/format/utils/format-object";

describe("formatObject", () => {
  const obj = {
    a: 1,
    b: "hello",
    c: "hello world",
    d: null,
    e: { x: 10 },
  };

  it("formats using json mode", () => {
    expect(formatObject(obj, "json")).toBe(JSON.stringify(obj));
  });

  it("formats using pretty mode with indentation", () => {
    const result = formatObject(obj, "pretty", 4);
    const lines = result.split("\n");

    // Every line must start with 4 spaces
    expect(lines.every((l) => l.startsWith("    "))).toBe(true);
  });

  it("formats using compact mode", () => {
    const result = formatObject(obj, "compact");
    expect(result).toBe('a=1 b=hello c="hello world" d=null e=\'{"x":10}\'');
  });

  it("returns empty string on error", () => {
    const circular: any = {};
    circular.self = circular;

    expect(formatObject(circular, "json")).toBe("");
  });
});
