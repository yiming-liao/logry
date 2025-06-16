import type { FormatStructuredPartOptions } from "@/modules/formatters/node/shared/format-structured-parts/format-structured-parts-types";
import { formatStructuredParts } from "@/modules/formatters/node/shared/format-structured-parts/format-structured-parts";
import { formatObject } from "@/modules/formatters/utils/format-object";

jest.mock("@/modules/formatters/utils/format-object", () => ({
  formatObject: jest.fn(() => '{"foo":"bar"}'),
}));

jest.mock("@/modules/formatters/utils/add-ansi-color", () => ({
  addAnsiColor: jest.fn((str: string) => `\x1b[32m${str}\x1b[0m`),
}));

describe("formatStructuredParts", () => {
  const basePart = { foo: "bar" };

  it("should return empty when hide is true", () => {
    const result = formatStructuredParts({
      label: "data",
      part: basePart,
      options: { hide: true },
    });
    expect(result).toEqual({ data: "", withAnsiColor: "" });
  });

  it("should return custom formatted result if customFormatter is provided", () => {
    const customFormatter = jest.fn(() => ({
      data: "[custom]",
      withAnsiColor: "[custom-colored]",
    }));

    const result = formatStructuredParts({
      label: "data",
      part: basePart,
      options: { customFormatter } as FormatStructuredPartOptions,
    });

    expect(customFormatter).toHaveBeenCalled();
    expect(result).toEqual({
      data: "[custom]",
      withAnsiColor: "[custom-colored]",
    });
  });

  it("should format part with all options applied", () => {
    const result = formatStructuredParts({
      label: "data",
      part: basePart,
      options: {
        prefix: "[",
        suffix: "]",
        lineBreaks: 1,
        spaceAfter: 1,
        ansiColor: "green",
      },
    });

    const expectedRaw = `\n[{"foo":"bar"}] `;
    const expectedAnsi = `\n\x1b[32m[{"foo":"bar"}]\x1b[0m `;

    expect(result).toEqual({
      data: expectedRaw,
      withAnsiColor: expectedAnsi,
    });
  });

  it("should return raw object if formatObject returns non-string", () => {
    (formatObject as jest.Mock).mockImplementationOnce(() => ({ raw: true }));

    const result = formatStructuredParts({
      label: "meta",
      part: { some: "thing" },
      options: {},
    });

    expect(result).toEqual({
      meta: { raw: true },
      withAnsiColor: "",
    });
  });
});
