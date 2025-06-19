import { internalLog } from "@/internal";
import { formatObject } from "@/modules/formatters/utils/format-object";

jest.mock("@/internal", () => ({
  internalLog: jest.fn(),
}));

describe("formatObject", () => {
  const input = { a: 1, b: "text" };

  it("should return raw object when style is 'raw'", () => {
    const result = formatObject(input, "raw");
    expect(result).toEqual(input);
  });

  it("should return JSON string when style is 'json'", () => {
    const result = formatObject(input, "json");
    expect(result).toBe(JSON.stringify(input));
  });

  it("should return compact string when style is 'compact'", () => {
    const result = formatObject(input, "compact");
    expect(result).toBe("a=1 b=text");
  });

  it("should return pretty JSON when style is 'pretty'", () => {
    const result = formatObject(input, "pretty");
    expect(result).toBe(
      `\n${JSON.stringify(input, null, 2)
        .split("\n")
        .map((line) => line)
        .join("\n")}`,
    );
  });

  it("should fall back to json and log warning on unknown style", () => {
    const result = formatObject(input, "invalid" as unknown as "raw");
    expect(result).toBe(JSON.stringify(input));
    expect(internalLog).toHaveBeenCalledWith({
      type: "warn",
      message: 'Unknown style "invalid", using "json" as fallback.',
    });
  });

  it("should return empty string and log error if stringify fails", () => {
    const circular = {} as unknown as Record<string, unknown>;
    circular.self = circular;

    const result = formatObject(circular, "json");

    expect(result).toBe("");
    expect(internalLog).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        message: expect.stringContaining("Failed to stringify object"),
      }),
    );
  });

  it("should return empty string when input is not an object in 'compact' style", () => {
    const result = formatObject(
      "not-an-object" as unknown as Record<string, unknown>,
      "compact",
    );
    expect(result).toBe("");
  });

  it("should handle non-Error throw value during stringify", () => {
    const mockInput = { a: 1 };

    jest.spyOn(JSON, "stringify").mockImplementationOnce(() => {
      throw "string-error";
    });

    const result = formatObject(mockInput, "json");

    expect(result).toBe("");
    expect(internalLog).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "error",
        message: expect.stringContaining("string-error"),
      }),
    );
  });
});
