import type { LogLevel } from "../../src/types";
import { LOG_LEVEL_PRIORITY } from "../../src/constants";
import { assertValidLevel } from "../../src/utils/assert-valid-level";

describe("assertValidLevel", () => {
  it("should not throw for all valid log levels", () => {
    for (const level of Object.keys(LOG_LEVEL_PRIORITY)) {
      expect(() => assertValidLevel(level as LogLevel)).not.toThrow();
    }
  });

  it("should throw for an invalid log level", () => {
    expect(() => assertValidLevel("invalid-level" as LogLevel)).toThrow(
      "[logry] Invalid log level: invalid-level",
    );
  });

  it("should throw for undefined", () => {
    expect(() => assertValidLevel(undefined as unknown as LogLevel)).toThrow();
  });

  it("should throw for null", () => {
    expect(() => assertValidLevel(null as unknown as LogLevel)).toThrow();
  });

  it("should throw for number or other types", () => {
    expect(() => assertValidLevel(123 as unknown as LogLevel)).toThrow();
    expect(() => assertValidLevel({} as unknown as LogLevel)).toThrow();
    expect(() => assertValidLevel([] as unknown as LogLevel)).toThrow();
  });
});
