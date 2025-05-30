import { internalError } from "@/internal";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

jest.mock("@/internal/internal-error", () => ({
  internalError: jest.fn(),
}));

describe("tryCustomNormalizer", () => {
  it("should return result from valid custom normalizer", () => {
    const result = tryCustomNormalizer({
      label: "scope",
      input: "abc",
      customNormalizer: (input) => input.toUpperCase(),
    });

    expect(result).toBe("ABC");
  });

  it("should call internalError on normalizer failure", () => {
    const failingFn = () => {
      throw new Error("Oops");
    };

    const result = tryCustomNormalizer({
      label: "meta",
      input: {},
      customNormalizer: failingFn,
    });

    expect(result).toBeUndefined();
    expect(internalError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "custom meta normalizer failed.",
        error: expect.any(Error),
      }),
    );
  });

  it("should return undefined if no custom normalizer is provided", () => {
    const result = tryCustomNormalizer({
      label: "scope",
      input: "value",
    });

    expect(result).toBeUndefined();
  });

  it("should return undefined if customNormalizer is not a function", () => {
    const result = tryCustomNormalizer({
      label: "test",
      input: 123,
      customNormalizer: undefined,
    });

    expect(result).toBeUndefined();
  });
});
