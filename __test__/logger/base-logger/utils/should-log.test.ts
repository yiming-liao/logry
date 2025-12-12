import { describe, it, expect, vi } from "vitest";
import { shouldLog } from "@/logger/base-logger/utils/should-log";
import { LEVEL_CONFIG } from "@/shared/level";
import { assertLevel } from "@/shared/utils/assert-level";

vi.mock("@/shared/utils/assert-level", () => ({
  assertLevel: vi.fn(),
}));

describe("shouldLog", () => {
  const levels = Object.keys(LEVEL_CONFIG) as Array<keyof typeof LEVEL_CONFIG>;

  it("calls assertLevel for both effectiveLevel and level", () => {
    shouldLog({ effectiveLevel: "info", level: "error" });

    expect(assertLevel).toHaveBeenCalledTimes(2);
    expect(assertLevel).toHaveBeenCalledWith("info");
    expect(assertLevel).toHaveBeenCalledWith("error");
  });

  // -------------------------------------------------------------
  // Priority comparison
  // -------------------------------------------------------------
  it("returns true when message level has equal or higher priority", () => {
    // error >= info
    expect(shouldLog({ effectiveLevel: "info", level: "error" })).toBe(true);

    // info >= info
    expect(shouldLog({ effectiveLevel: "info", level: "info" })).toBe(true);
  });

  it("returns false when message level has lower priority", () => {
    // debug < info
    expect(shouldLog({ effectiveLevel: "info", level: "debug" })).toBe(false);
  });

  // -------------------------------------------------------------
  // Test all levels (optional but ensures stability across config)
  // -------------------------------------------------------------
  it("correctly compares LEVEL_CONFIG priorities across the full level set", () => {
    for (const effectiveLevel of levels) {
      for (const level of levels) {
        const expected =
          LEVEL_CONFIG[level].priority >= LEVEL_CONFIG[effectiveLevel].priority;

        expect(shouldLog({ effectiveLevel, level })).toBe(expected);
      }
    }
  });
});
