/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import {
  addPrefixAndSuffix,
  addPadding,
  alignText,
  applyAnsiStyle,
  addMargin,
  addLineBreaks,
  applyTextStyles,
} from "@/pipeline/hooks/render/utils/text-style";

describe("text-style utilities", () => {
  it("adds prefix and suffix", () => {
    expect(addPrefixAndSuffix("X", "[", "]")).toBe("[X]");
    expect(addPrefixAndSuffix("X")).toBe("X");
    expect(addPrefixAndSuffix("X", "[")).toBe("[X");
    expect(addPrefixAndSuffix("X", undefined, "]")).toBe("X]");
  });

  it("adds padding", () => {
    expect(addPadding("X", 2, 3)).toBe("  X   ");
    expect(addPadding("X")).toBe("X");
  });

  it("aligns text", () => {
    expect(alignText("X", 5, "left")).toBe("X    ");
    expect(alignText("X", 5, "right")).toBe("    X");
    expect(alignText("X", 5, "center")).toBe("  X  ");
    expect(alignText("X")).toBe("X");
    expect(alignText("X", 0)).toBe("X");
    expect(alignText("Hello", 3)).toBe("Hello");
  });

  it("applies ansi style", () => {
    const bold = (s: string) => `**${s}**`;
    expect(applyAnsiStyle("Hi", bold)).toBe("**Hi**");
  });
  it("falls back to original text when ansiStyle throws", () => {
    const errorStyle = () => {
      throw new Error("fail");
    };
    const result = applyAnsiStyle("Hi", errorStyle);
    expect(result).toBe("Hi");
  });
  it("applies default options safely", () => {
    const ctx: any = {};
    const result = applyTextStyles("Hi", ctx, {});
    expect(result.plain).toBe("Hi");
    expect(result.ansi).toBe("Hi");
  });

  it("adds margins", () => {
    expect(addMargin("X", 2, 1)).toBe("  X ");
  });

  it("adds line breaks", () => {
    expect(addLineBreaks("X", 1, 2)).toBe("\nX\n\n");
  });

  it("applies full text styling pipeline", () => {
    const ctx: any = {};
    const ansi = (s: string) => `<a>${s}</a>`;

    const result = applyTextStyles("Hi", ctx, {
      prefix: "[",
      suffix: "]",
      paddingBefore: 1,
      paddingAfter: 1,
      width: 8,
      align: "center",
      ansiStyle: ansi,
      marginBefore: 1,
      marginAfter: 1,
      lineBreaksBefore: 1,
      lineBreaksAfter: 1,
    });

    // plain version checks
    expect(result.plain?.startsWith("\n")).toBe(true);
    expect(result.plain?.endsWith("\n")).toBe(true);

    // It should contain the core styled text "[Hi]"
    expect(result.plain?.includes("[Hi]")).toBe(true);

    // ANSI version should apply wrapper
    expect(result.ansi?.includes("<a>")).toBe(true);
    expect(result.ansi?.includes("[Hi]")).toBe(true);
  });
});
