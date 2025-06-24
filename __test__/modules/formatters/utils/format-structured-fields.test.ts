/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatStructuredFields } from "@/modules/formatters/utils/format-structured-fields";

describe("formatStructuredFields", () => {
  it("should return empty when field is hidden", () => {
    const result = formatStructuredFields({
      platform: "node",
      fieldKey: "meta",
      fieldValue: { hello: "world" },
      raw: { hasMeta: false, hasContext: false } as any,
      options: { hide: true } as any,
    });

    expect(result).toEqual({
      fieldValue: "",
      withAnsiStyle: "",
      cssStyle: "",
    });
  });

  it("should stringify object with format options", () => {
    const part = { a: 1, b: 2 };
    const result = formatStructuredFields({
      platform: "node",
      fieldKey: "context",
      fieldValue: part,
      raw: { hasMeta: false, hasContext: true } as any,
      options: {
        format: "pretty",
        indent: 2,
        lineBreaks: false,
        spaceAfter: false,
      } as any,
    });

    expect(result.fieldValue).toBe(
      `\n${JSON.stringify(part, null, 2)
        .split("\n")
        .map((line) => " ".repeat(2) + line)
        .join("\n")}`,
    );
  });

  it("should apply prefix and suffix", () => {
    const part = { x: "y" };
    const result = formatStructuredFields({
      platform: "node",
      fieldKey: "meta",
      fieldValue: part,
      raw: { hasMeta: true, hasContext: false } as any,
      options: {
        prefix: "[",
        suffix: "]",
        format: "json",
        lineBreaks: false,
        spaceAfter: false,
      } as any,
    });

    expect((result.fieldValue as any).startsWith("[")).toBe(true);
    expect((result.fieldValue as any).endsWith("]")).toBe(true);
  });

  it("should apply ansiStyle when platform is node", () => {
    const part = { ansi: "cool" };
    const result = formatStructuredFields({
      platform: "node",
      fieldKey: "context",
      fieldValue: part,
      raw: { hasMeta: false, hasContext: true } as any,
      options: {
        format: "json",
        ansiStyle: ["cyan"],
        lineBreaks: true,
        spaceAfter: true,
      } as any,
    });

    expect(result.withAnsiStyle?.startsWith("\n")).toBe(true);
    expect(result.withAnsiStyle?.endsWith(" ")).toBe(true);
  });

  it("should use customFormatter if provided and return its result", () => {
    const part = { foo: "bar" };
    const customFormatter = jest.fn(() => ({
      fieldValue: "custom",
      withAnsiStyle: "ansi",
      cssStyle: "css",
    }));

    const result = formatStructuredFields({
      platform: "node",
      fieldKey: "meta",
      fieldValue: part,
      raw: { hasMeta: true, hasContext: false } as any,
      options: {
        customFormatter,
      } as any,
    });

    expect(customFormatter).toHaveBeenCalled();
    expect(result.fieldValue).toBe("custom");
    expect(result.withAnsiStyle).toBe("ansi");
    expect(result.cssStyle).toBe("css");
  });

  it("should return raw object if formatted is not a string", () => {
    const part = { nested: { x: 1 } };

    const result = formatStructuredFields({
      platform: "browser",
      fieldKey: "meta",
      fieldValue: part,
      raw: { hasMeta: true, hasContext: false } as any,
      options: {
        format: "raw",
      } as any,
    });

    expect(result.fieldValue).toEqual(part);
    expect(result.withAnsiStyle).toBe("");
    expect(result.cssStyle).toBe("");
  });
});
