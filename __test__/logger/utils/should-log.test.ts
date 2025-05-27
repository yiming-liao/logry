import type { LogLevel } from "../../../src/types";
import { LOG_LEVEL_PRIORITY } from "../../../src/constants";
import { shouldLog } from "../../../src/logger/utils/should-log";

describe("shouldLog", () => {
  const allLevels: LogLevel[] = ["error", "warn", "info", "debug"];

  it("should log if message level has higher or equal priority", () => {
    for (const configLevel of allLevels) {
      for (const level of allLevels) {
        const expected =
          LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[configLevel];
        expect(shouldLog({ configLevel, level })).toBe(expected);
      }
    }
  });

  it("should throw error if invalid level is passed", () => {
    const badLevel = "verbose" as LogLevel;
    expect(() => shouldLog({ configLevel: "info", level: badLevel })).toThrow();
    expect(() => shouldLog({ configLevel: badLevel, level: "info" })).toThrow();
  });
});
