import type { Level } from "@/shared/types";
import { shouldLog } from "@/core/logger/utils/should-log";
import { LEVEL_CONFIG } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

jest.mock("@/shared/utils/assert-valid-level", () => ({
  assertValidLevel: jest.fn(),
}));

describe("shouldLog", () => {
  const allLevels = Object.keys(LEVEL_CONFIG) as Level[];

  it("should call assertValidLevel for both levels", () => {
    shouldLog({ effectiveLevel: "info", level: "warn" });

    expect(assertValidLevel).toHaveBeenCalledWith("info");
    expect(assertValidLevel).toHaveBeenCalledWith("warn");
  });

  it("should return true if level has higher priority than effectiveLevel", () => {
    const result = shouldLog({ effectiveLevel: "info", level: "error" });
    expect(result).toBe(true);
  });

  it("should return true if level has equal priority to effectiveLevel", () => {
    const result = shouldLog({ effectiveLevel: "info", level: "info" });
    expect(result).toBe(true);
  });

  it("should return false if level has lower priority than effectiveLevel", () => {
    const result = shouldLog({ effectiveLevel: "error", level: "debug" });
    expect(result).toBe(false);
  });

  it("should correctly evaluate all combinations of levels", () => {
    for (const effectiveLevel of allLevels) {
      for (const level of allLevels) {
        const expected =
          LEVEL_CONFIG[level].priority >= LEVEL_CONFIG[effectiveLevel].priority;
        const result = shouldLog({ effectiveLevel, level });
        expect(result).toBe(expected);
      }
    }
  });
});
