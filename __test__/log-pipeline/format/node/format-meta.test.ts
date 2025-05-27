import { formatMeta } from "../../../../src/log-pipeline/format/node/format-meta";
import { formatError } from "../../../../src/log-pipeline/format/node/utils/format-error";

jest.mock("../../../../src/log-pipeline/format/node/utils/format-error");

describe("formatMeta", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns undefined for falsy input", () => {
    expect(formatMeta(null)).toBeUndefined();
    expect(formatMeta(undefined)).toBeUndefined();
    expect(formatMeta(false)).toBeUndefined();
    expect(formatMeta(0)).toBeUndefined();
    expect(formatMeta("")).toBeUndefined();
  });

  it("formats when input is an Error instance", () => {
    const error = new Error("test error");
    (formatError as jest.Mock).mockReturnValue("formatted error");

    const result = formatMeta(error);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({ error: "formatted error" });
  });

  it("formats when input is an object with error property as Error instance", () => {
    const error = new Error("inner error");
    const input = { error, other: "data" };
    (formatError as jest.Mock).mockReturnValue("formatted inner error");

    const result = formatMeta(input);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      other: "data",
      error: "formatted inner error",
    });
  });

  it("returns the original object when error property is not an Error", () => {
    const input = { error: "not an error", other: 123 };

    const result = formatMeta(input);

    expect(result).toEqual(input);
  });

  it("returns input unchanged if it's not an Error or object", () => {
    const input = "some string";

    const result = formatMeta(input);

    expect(result).toBe(input);
  });
});
