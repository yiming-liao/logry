import type { Level } from "@/shared/types";
import { LoggerCore } from "@/core/logger-core/logger-core";
import { internalLog } from "@/internal";
import { HandlerManager } from "@/modules/handlers/handler-manager";
import { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_ID } from "@/shared/constants";

jest.mock("@/internal", () => ({
  internalLog: jest.fn(),
}));

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

  // 新增部分：測試 levelChangeCallbacks 的功能

  it("should call registered callbacks when level changes", () => {
    const logger = new LoggerCore({});
    const callback = jest.fn();

    logger.onLevelChange(callback);
    logger.setLevel("error");

    expect(callback).toHaveBeenCalledWith("error");
  });

  it("should call registered callbacks when level resets", () => {
    const logger = new LoggerCore({ level: "warn" });
    const callback = jest.fn();

    logger.onLevelChange(callback);
    logger.setLevel("error");
    logger.resetLevel();

    expect(callback).toHaveBeenCalledWith("warn");
  });

  it("should not call callback after it has been removed", () => {
    const logger = new LoggerCore({});
    const callback = jest.fn();

    logger.onLevelChange(callback);
    logger.offLevelChange(callback);
    logger.setLevel("error");

    expect(callback).not.toHaveBeenCalled();
  });

  it("should catch errors thrown by callbacks and continue notifying others", () => {
    const logger = new LoggerCore({});

    // 這裡已被 jest.mock 自動 mock，直接拿來用
    const callback1 = () => {
      throw new Error("callback error");
    };
    const callback2 = jest.fn();

    logger.onLevelChange(callback1);
    logger.onLevelChange(callback2);

    logger.setLevel("info");

    expect(callback2).toHaveBeenCalled();
    expect(internalLog).toHaveBeenCalled();
  });
});
