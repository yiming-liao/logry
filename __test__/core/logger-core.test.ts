import type { HandlerConfig } from "../../src/handler/handler-types";
import type { OutputConfig } from "../../src/output-config-types";
import type { LogLevel } from "../../src/types";
import { DEFAULT_LOG_LEVEL } from "../../src/constants";
import { LoggerCore } from "../../src/core";
import { HandlerManager } from "../../src/handler";
import { assertValidLevel } from "../../src/utils/assert-valid-level";

jest.mock("../../src/utils/assert-valid-level", () => ({
  assertValidLevel: jest.fn(),
}));

describe("LoggerCore", () => {
  const mockedAssertValidLevel = assertValidLevel as jest.Mock;

  beforeEach(() => {
    mockedAssertValidLevel.mockClear();
  });

  it("should initialize with default level and default HandlerManager", () => {
    const logger = new LoggerCore("test-id");

    expect(mockedAssertValidLevel).toHaveBeenCalledWith(DEFAULT_LOG_LEVEL);
    expect(logger.level).toBe(DEFAULT_LOG_LEVEL);
    expect(logger["initialLevel"]).toBe(DEFAULT_LOG_LEVEL);
    expect(logger.id).toBe("test-id");
    expect(logger.outputConfig).toBeUndefined();

    expect(logger.handlerManager).toBeInstanceOf(HandlerManager);
  });

  it("should initialize with given valid level and outputConfig", () => {
    const outputConfig = { someOption: true } as OutputConfig;
    const level = "info" as const;
    const logger = new LoggerCore("logger2", level, outputConfig);

    expect(mockedAssertValidLevel).toHaveBeenCalledWith(level);
    expect(logger.level).toBe(level);
    expect(logger["initialLevel"]).toBe(level);
    expect(logger.outputConfig).toBe(outputConfig);
    expect(logger.handlerManager).toBeInstanceOf(HandlerManager);
  });

  it("should initialize with provided handlerConfig and call setConfig on HandlerManager", () => {
    const handlerConfig = { flushTimeout: 1000 } as HandlerConfig;

    const spySetConfig = jest.spyOn(HandlerManager.prototype, "setConfig");

    const logger = new LoggerCore(
      "id",
      DEFAULT_LOG_LEVEL,
      undefined,
      handlerConfig,
    );

    expect(logger.handlerManager).toBeInstanceOf(HandlerManager);
    expect(spySetConfig).toHaveBeenCalledWith(handlerConfig);

    spySetConfig.mockRestore();
  });

  it("should call assertValidLevel on setLevel and update level", () => {
    const logger = new LoggerCore("id");
    const newLevel = "warn" as const;

    logger.setLevel(newLevel);

    expect(mockedAssertValidLevel).toHaveBeenCalledWith(newLevel);
    expect(logger.level).toBe(newLevel);
  });

  it("should reset level to initialLevel", () => {
    const logger = new LoggerCore("id", "error" as const);
    logger.setLevel("warn" as const);
    expect(logger.level).toBe("warn");

    logger.resetLevel();
    expect(logger.level).toBe("error");
  });

  it("should allow setLevel after resetLevel", () => {
    const logger = new LoggerCore("id", "info" as const);
    logger.setLevel("warn" as const);
    logger.resetLevel();
    expect(logger.level).toBe("info");

    logger.setLevel("error" as const);
    expect(logger.level).toBe("error");
  });

  it("should throw if invalid level passed to constructor", () => {
    mockedAssertValidLevel.mockImplementationOnce(() => {
      throw new Error("Invalid level");
    });

    expect(() => new LoggerCore("id", "invalid" as LogLevel)).toThrow(
      "Invalid level",
    );
  });

  it("should throw if invalid level passed to setLevel", () => {
    const logger = new LoggerCore("id");

    mockedAssertValidLevel.mockImplementationOnce(() => {
      throw new Error("Invalid level");
    });

    expect(() => logger.setLevel("invalid" as LogLevel)).toThrow(
      "Invalid level",
    );
  });
});
