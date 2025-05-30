import type { NormalizedStructuredPart } from "@/modules/normalizers/types";
import { formatStructuredParts } from "@/modules/formatters/node/shared/format-structured-parts";

describe("formatStructuredParts", () => {
  const mockPart: NormalizedStructuredPart = { foo: "bar", num: 1 };

  it("should return empty string if hidden", () => {
    const result = formatStructuredParts({
      part: mockPart,
      options: { hide: true },
    });
    expect(result).toBe("");
  });

  it("should return empty string if part is falsy", () => {
    const result = formatStructuredParts({
      part: undefined as unknown as NormalizedStructuredPart,
      options: {},
    });
    expect(result).toBe("");
  });

  it("should apply custom formatter if provided", () => {
    const result = formatStructuredParts({
      part: mockPart,
      options: {
        customFormatter: (input) => `<<${JSON.stringify(input.part)}>>`,
      },
    });
    expect(result).toBe('<<{"foo":"bar","num":1}>>');
  });

  it("should format object and apply prefix/suffix", () => {
    const result = formatStructuredParts({
      part: { key: "value" },
      options: {
        format: "json",
        prefix: "[",
        suffix: "]",
      },
    }) as string;
    expect(result.startsWith("[")).toBe(true);
    expect(result.endsWith("]")).toBe(true);
  });

  it("should apply ansi color if specified", () => {
    const result = formatStructuredParts({
      part: { key: "value" },
      options: {
        format: "json",
        ansiColor: "green",
      },
    });
    expect(result).toContain("value");
  });

  it("should add line break prefix if specified", () => {
    const result = formatStructuredParts({
      part: { x: 1 },
      options: {
        format: "json",
        lineBreaks: 2,
      },
    }) as string;
    expect(result.startsWith("\n\n")).toBe(true);
  });

  it("should add space after if enabled", () => {
    const result = formatStructuredParts({
      part: { hello: "world" },
      options: {
        format: "json",
        spaceAfter: 1,
      },
    }) as string;
    expect(result.endsWith(" ")).toBe(true);
  });

  it("should return object directly if formatObject returns non-string", () => {
    const input = { asd: 123 };
    const result = formatStructuredParts({
      part: input,
      options: {
        format: "raw",
      },
    });

    expect(typeof result).toBe("object");
    expect(result).toEqual(input);
    expect(result).not.toBeNull();
  });
});
