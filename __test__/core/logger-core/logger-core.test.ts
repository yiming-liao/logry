import type { Level } from "@/shared/types";
import { LoggerCore } from "@/core/logger-core/logger-core";
import { HandlerManager } from "@/modules/handler-manager";
import { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_ID } from "@/shared/constants";

describe("LoggerCore", () => {
  let spySetConfig: jest.SpyInstance;

  beforeEach(() => {
    spySetConfig = jest.spyOn(HandlerManager.prototype, "setConfig");
  });

  afterEach(() => {
    spySetConfig.mockRestore();
  });

  it("should create instance with default values", () => {
    const logger = new LoggerCore({});
    expect(logger.id).toBe(DEFAULT_LOGGER_ID);
    expect(logger.level).toBe(DEFAULT_LOG_LEVEL);
  });

  it("should create instance with custom values", () => {
    const customId = "customLogger";
    const customLevel: Level = "debug";
    const logger = new LoggerCore({ id: customId, level: customLevel });

    expect(logger.id).toBe(customId);
    expect(logger.level).toBe(customLevel);
  });

  it("should throw error if invalid level is set in constructor", () => {
    expect(() => {
      // @ts-expect-error Testing invalid level input
      new LoggerCore({ level: "invalidLevel" });
    }).toThrow();
  });

  it("should update log level dynamically", () => {
    const logger = new LoggerCore({});
    logger.setLevel("info");
    expect(logger.level).toBe("info");
  });

  it("should throw error if invalid level is set via setLevel", () => {
    const logger = new LoggerCore({});
    expect(() => {
      // @ts-expect-error Testing invalid level input
      logger.setLevel("invalidLevel");
    }).toThrow();
  });

  it("should reset level to initialLevel", () => {
    const logger = new LoggerCore({ level: "warn" });
    logger.setLevel("error");
    expect(logger.level).toBe("error");

    logger.resetLevel();
    expect(logger.level).toBe("warn");
  });

  it("should call handlerManager.setConfig if handlerConfig is provided", () => {
    const handlerConfig = {};
    spySetConfig.mockClear();
    new LoggerCore({ handlerConfig });
    expect(spySetConfig).toHaveBeenCalled();
    expect(spySetConfig).toHaveBeenCalledWith(handlerConfig);
  });
});
