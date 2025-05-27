import type { LoggerCore } from "../../src/core";
import { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_ID } from "../../src/constants";

describe("getOrCreateLogger", () => {
  let coreMap: Map<string, LoggerCore>;
  let getOrCreateLogger: typeof import("../../src/factory/get-or-create-logger").getOrCreateLogger;
  let LoggerCore: typeof import("../../src/core").LoggerCore;
  let Logger: typeof import("../../src/logger").Logger;

  beforeEach(async () => {
    jest.resetModules();

    coreMap = new Map();

    jest.doMock("../../src/factory/core-map", () => ({
      coreMap,
    }));

    ({ getOrCreateLogger } = await import(
      "../../src/factory/get-or-create-logger"
    ));
    ({ LoggerCore } = await import("../../src/core"));
    ({ Logger } = await import("../../src/logger"));

    coreMap.clear();
    const core = new LoggerCore(DEFAULT_LOGGER_ID, DEFAULT_LOG_LEVEL);
    coreMap.set(DEFAULT_LOGGER_ID, core);
  });

  it("should create a new logger instance", () => {
    const logger = getOrCreateLogger({ id: "test-logger" });
    expect(logger).toBeInstanceOf(Logger);
  });

  it("should return the same logger core for the same ID", () => {
    const logger1 = getOrCreateLogger({ id: "shared-logger" });
    const logger2 = getOrCreateLogger({ id: "shared-logger" });
    expect(logger1["core"]).toBe(logger2["core"]);
  });

  it("should update log level if a new level is provided", () => {
    const logger = getOrCreateLogger({ id: "level-test", level: "error" });
    expect(logger["core"].level).toBe("error");

    const updatedLogger = getOrCreateLogger({
      id: "level-test",
      level: "warn",
    });
    expect(updatedLogger["core"].level).toBe("warn");
  });

  it("should create a new logger if the logger core cannot be found", () => {
    const logger = getOrCreateLogger({ id: "non-existing-logger" });
    expect(logger).toBeInstanceOf(Logger);
  });

  it("should use default values when options are not provided", () => {
    const logger = getOrCreateLogger();
    expect(logger).toBeInstanceOf(Logger);
    expect(logger["core"].id).toBe(DEFAULT_LOGGER_ID);
    expect(logger["core"].level).toBe(DEFAULT_LOG_LEVEL);
  });

  it("should use default values when partial options are provided", () => {
    const logger = getOrCreateLogger({ context: "ctx" });
    expect(logger).toBeInstanceOf(Logger);
    expect(logger["core"].id).toBe(DEFAULT_LOGGER_ID);
    expect(logger["core"].level).toBe(DEFAULT_LOG_LEVEL);
  });
});
