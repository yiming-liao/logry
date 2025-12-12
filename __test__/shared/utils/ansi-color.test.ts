import { describe, it, expect } from "vitest";
import { ansiColor } from "@/shared/utils/ansi-color";

describe("ansiColor", () => {
  it("wraps text correctly with ansi code", () => {
    const green = ansiColor(46);
    expect(green("hello")).toBe("\u001B[38;5;46mhello\u001B[0m");
  });

  it("handles null text", () => {
    const blue = ansiColor(27);
    expect(blue(null)).toBe("\u001B[38;5;27mnull\u001B[0m"); // 注意 null 被 string 化
  });
});
