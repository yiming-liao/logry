import { validateOutputPayload } from "../../../../src/log-pipeline/output/utils/validate-output-payload";

describe("validateOutputPayload", () => {
  it("should pass with valid level and message", () => {
    expect(() =>
      validateOutputPayload({
        level: "info",
        message: "Log something",
      }),
    ).not.toThrow();
  });

  it("should throw error for invalid log level", () => {
    expect(() =>
      validateOutputPayload({
        // @ts-expect-error: invalid level on purpose
        level: "wrong",
        message: "Hello",
      }),
    ).toThrow("[logry] Invalid log level: wrong");
  });

  it("should throw error for empty message", () => {
    expect(() =>
      validateOutputPayload({
        level: "warn",
        message: "   ", // whitespace only
      }),
    ).toThrow("[logry] 'message' are required and cannot be empty.");
  });

  it("should throw error for missing message", () => {
    expect(() =>
      validateOutputPayload({
        level: "error",
        message: "",
      }),
    ).toThrow("[logry] 'message' are required and cannot be empty.");
  });

  it("should throw error when message is undefined", () => {
    expect(() =>
      validateOutputPayload({
        level: "info",
        // @ts-expect-error: intentionally undefined
        message: undefined,
      }),
    ).toThrow("[logry] 'message' are required and cannot be empty.");
  });

  it("should throw error when message is null", () => {
    expect(() =>
      validateOutputPayload({
        level: "info",
        // @ts-expect-error: intentionally null
        message: null,
      }),
    ).toThrow("[logry] 'message' are required and cannot be empty.");
  });
});
