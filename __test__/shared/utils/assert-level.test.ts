/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { LEVELS } from "@/shared/level";
import { assertLevel } from "@/shared/utils/assert-level";

describe("assertLevel", () => {
  it("does not throw for valid levels", () => {
    for (const level of LEVELS) {
      expect(() => assertLevel(level)).not.toThrow();
    }
  });

  it("throws an error for invalid levels", () => {
    const invalids = ["DEBUG", "Info", "fatal123", "", "none", null, undefined];

    for (const val of invalids) {
      // @ts-expect-error — purposely testing invalid input
      expect(() => assertLevel(val)).toThrowError(/Invalid log level/);
    }
  });

  it("includes the level name in the error message", () => {
    expect(() => assertLevel("bad-level" as any)).toThrow(
      "Invalid log level: bad-level",
    );
  });
});
