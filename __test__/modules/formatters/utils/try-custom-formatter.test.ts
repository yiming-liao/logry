import { internalError } from "@/internal";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

jest.mock("@/internal", () => ({
  internalError: jest.fn(),
}));

describe("tryCustomFormatter", () => {
  it("should return formatted result when formatter succeeds", () => {
    const result = tryCustomFormatter({
      label: "test",
      input: 2,
      customFormatter: (n) => n * 2,
    });

    expect(result).toBe(4);
  });

  it("should return undefined if no formatter is provided", () => {
    const result = tryCustomFormatter({
      label: "test",
      input: 2,
      customFormatter: undefined,
    });

    expect(result).toBeUndefined();
  });

  it("should call internalError and return undefined if formatter throws", () => {
    const formatter = () => {
      throw new Error("fail");
    };

    const result = tryCustomFormatter({
      label: "test",
      input: "anything",
      customFormatter: formatter,
    });

    expect(result).toBeUndefined();
    expect(internalError).toHaveBeenCalledWith({
      error: expect.any(Error),
      message: "custom test formatter failed.",
    });
  });
});
