import { LOG_LEVELS } from "../../../src/constants";
import { validateWriteOptions } from "../../../src/write/utils/validate-write-options";

describe("validateWriteOptions", () => {
  const validBase = {
    message: "A valid log message",
    level: LOG_LEVELS[0],
  };

  it("should not throw with valid options", () => {
    expect(() => validateWriteOptions(validBase)).not.toThrow();
  });

  it("should throw if level is invalid", () => {
    expect(() =>
      validateWriteOptions({ ...validBase, level: "invalid" as "error" }),
    ).toThrow(/Invalid log level/);
  });

  it("should throw if message is missing or empty", () => {
    expect(() => validateWriteOptions({ ...validBase, message: "  " })).toThrow(
      /required and cannot be empty/,
    );
  });

  it("should throw if borderWidth is negative", () => {
    expect(() =>
      validateWriteOptions({ ...validBase, borderWidth: -1 }),
    ).toThrow(/Invalid borderWidth/);
  });

  it("should throw if borderWidth is NaN or non-finite", () => {
    expect(() =>
      validateWriteOptions({ ...validBase, borderWidth: Infinity }),
    ).toThrow(/Invalid borderWidth/);
    expect(() =>
      validateWriteOptions({ ...validBase, borderWidth: NaN }),
    ).toThrow(/Invalid borderWidth/);
  });

  it("should pass if borderWidth is zero or a positive number", () => {
    expect(() =>
      validateWriteOptions({ ...validBase, borderWidth: 0 }),
    ).not.toThrow();
    expect(() =>
      validateWriteOptions({ ...validBase, borderWidth: 2 }),
    ).not.toThrow();
  });

  it("should throw if message is undefined", () => {
    expect(() =>
      validateWriteOptions({
        ...validBase,
        message: undefined as unknown as string,
      }),
    ).toThrow(/required and cannot be empty/);
  });
});
