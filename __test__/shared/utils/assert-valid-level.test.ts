import type { Level } from "@/shared/types";
import { LEVEL_CONFIG } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

describe("assertValidLevel", () => {
  it("should not throw for all valid log levels", () => {
    for (const level of Object.keys(LEVEL_CONFIG)) {
      expect(() => assertValidLevel(level as Level)).not.toThrow();
    }
  });

  it("should throw for an invalid log level", () => {
    expect(() => assertValidLevel("invalid-level" as Level)).toThrow(
      "[logry] Invalid log level: invalid-level",
    );
  });

  it("should...", () => {
    expect(() => assertValidLevel(undefined as unknown as Level)).not.toThrow();
  });

  it("should throw for null", () => {
    expect(() => assertValidLevel(null as unknown as Level)).toThrow();
  });

  it("should throw for number or other types", () => {
    expect(() => assertValidLevel(123 as unknown as Level)).toThrow();
    expect(() => assertValidLevel({} as unknown as Level)).toThrow();
    expect(() => assertValidLevel([] as unknown as Level)).toThrow();
  });
});
