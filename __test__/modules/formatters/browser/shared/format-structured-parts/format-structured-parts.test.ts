import { formatStructuredParts } from "@/modules/formatters/browser/shared/format-structured-parts/format-structured-parts";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

jest.mock("@/modules/formatters/utils/try-custom-formatter");
jest.mock("@/modules/formatters/utils/format-object");
jest.mock("@/modules/formatters/utils/add-prefix-and-suffix");
jest.mock("@/modules/formatters/utils/add-line-break-prefix");
jest.mock("@/modules/formatters/utils/add-space-after");

describe("formatStructuredParts", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (tryCustomFormatter as jest.Mock).mockReturnValue(null);
    (formatObject as jest.Mock).mockImplementation((part) =>
      JSON.stringify(part),
    );
    (addPrefixAndSuffix as jest.Mock).mockImplementation(
      (str, prefix, suffix) => `${prefix ?? ""}${str}${suffix ?? ""}`,
    );
    (addLineBreakPrefix as jest.Mock).mockImplementation(
      (str, lineBreaks) => "\n".repeat(lineBreaks ?? 0) + str,
    );
    (addSpaceAfter as jest.Mock).mockImplementation(
      (str, spaceAfter) => str + " ".repeat(spaceAfter ?? 0),
    );
  });

  it("should return empty string and empty cssStyle if hide is true", () => {
    const result = formatStructuredParts({
      label: "data",
      part: { foo: "bar" },
      options: { hide: true },
    });
    expect(result).toEqual({ data: "", cssStyle: "" });
  });

  it("should return empty string and empty cssStyle if part is undefined", () => {
    const result = formatStructuredParts({
      label: "data",
      part: undefined,
      options: {},
    });
    expect(result).toEqual({ data: "", cssStyle: "" });
  });

  it("should use customFormatter if provided and return its result", () => {
    const customResult = { data: "custom", cssStyle: "color: red;" };
    (tryCustomFormatter as jest.Mock).mockReturnValue(customResult);

    const result = formatStructuredParts({
      label: "data",
      part: { foo: "bar" },
      options: { customFormatter: jest.fn() },
    });

    expect(tryCustomFormatter).toHaveBeenCalled();
    expect(result).toEqual(customResult);
  });

  it("should stringify the part when formatObject returns a string and apply styling", () => {
    const part = { foo: "bar" };
    (formatObject as jest.Mock).mockReturnValue("stringified");

    const result = formatStructuredParts({
      label: "data",
      part,
      options: {
        prefix: "[",
        suffix: "]",
        lineBreaks: 1,
        spaceAfter: 2,
        cssStyle: "font-weight:bold",
      },
    });

    expect(formatObject).toHaveBeenCalledWith(part, undefined);
    expect(addPrefixAndSuffix).toHaveBeenCalledWith("stringified", "[", "]");
    expect(addLineBreakPrefix).toHaveBeenCalledWith("[stringified]", 1);
    expect(addSpaceAfter).toHaveBeenCalledWith("\n[stringified]", 2);

    expect(result).toEqual({
      data: "\n[stringified]  ",
      cssStyle: "font-weight:bold",
    });
  });

  it("should return raw formatted object if formatObject returns non-string", () => {
    const rawFormatted = { foo: "bar" };
    (formatObject as jest.Mock).mockReturnValue(rawFormatted);

    const result = formatStructuredParts({
      label: "data",
      part: rawFormatted,
      options: {
        cssStyle: "color: blue",
      },
    });

    expect(result).toEqual({ data: rawFormatted, cssStyle: "color: blue" });
  });

  it("should default cssStyle to empty string when not provided", () => {
    (formatObject as jest.Mock).mockReturnValue("text");

    const result = formatStructuredParts({
      label: "data",
      part: { foo: "bar" },
      options: {},
    });

    expect(result.cssStyle).toBe("");
  });
});
