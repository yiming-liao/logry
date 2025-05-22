import type { LogLevel } from "../../src/types";
import { DEFAULT_LOG_LEVEL, LOG_LEVEL_PRIORITY } from "../../src/constants";
import { LoggerCore } from "../../src/core";

describe("LoggerCore", () => {
  let logger: LoggerCore;

  beforeEach(() => {
    logger = new LoggerCore("testLogger");
  });

  it("should initialize with default log level", () => {
    expect(logger.level).toBe(DEFAULT_LOG_LEVEL);
  });

  it("should set a new log level", () => {
    logger.setLevel("debug");
    expect(logger.level).toBe("debug");
  });

  it("should reset to the initial log level", () => {
    logger.setLevel("debug");
    logger.resetLevel();
    expect(logger.level).toBe(DEFAULT_LOG_LEVEL);
  });

  it("should throw error for invalid log level", () => {
    expect(() => logger.setLevel("invalidLevel" as LogLevel)).toThrow(
      "[logry] Invalid log level: invalidLevel",
    );
    expect(() =>
      LoggerCore.assertValidLevel("invalidLevel" as LogLevel),
    ).toThrow("[logry] Invalid log level: invalidLevel");
  });

  it("should check log level validation correctly", () => {
    Object.keys(LOG_LEVEL_PRIORITY).forEach((level) => {
      expect(() =>
        LoggerCore.assertValidLevel(level as LogLevel),
      ).not.toThrow();
    });

    expect(() =>
      LoggerCore.assertValidLevel("nonExistingLevel" as LogLevel),
    ).toThrow("[logry] Invalid log level: nonExistingLevel");
  });

  it("should initialize with provided valid log level", () => {
    const customLogger = new LoggerCore("custom", "error");
    expect(customLogger.level).toBe("error");
  });

  it("should throw when initialized with invalid log level", () => {
    expect(() => new LoggerCore("invalid", "notALevel" as LogLevel)).toThrow(
      "[logry] Invalid log level: notALevel",
    );
  });
});
