import type { LogLevel, WriteConfig } from "../src/types";
import { CONTEXT_SEPARATOR, LOG_LEVEL_PRIORITY } from "../src/constants";
import { LoggerCore } from "../src/core";
import { Logger } from "../src/logger";
import { write } from "../src/write/write";

jest.mock("../src/write/write", () => ({
  write: jest.fn(),
}));

describe("Logger", () => {
  const loggerId = "test-logger";
  let core: LoggerCore;

  beforeEach(() => {
    core = new LoggerCore(loggerId, "info");
    (write as jest.Mock).mockClear();
  });

  describe("log level validation", () => {
    it("should throw if log level is invalid", () => {
      const logger = new Logger(core);
      expect(() => {
        logger[`log`]("invalid-level" as LogLevel, "message");
      }).toThrow("[logry] Invalid log level: invalid-level");
    });

    it("should not throw for valid log levels", () => {
      const logger = new Logger(core);
      Object.keys(LOG_LEVEL_PRIORITY).forEach((level) => {
        expect(() => {
          logger[`log`](level as LogLevel, "test message");
        }).not.toThrow();
      });
    });
  });

  describe("logging behavior", () => {
    let logger: Logger;

    beforeEach(() => {
      jest.spyOn(LoggerCore, "assertValidLevel").mockImplementation(() => {});
      logger = new Logger(core);
    });

    it("should call write when log level passes threshold", () => {
      logger.info("info message");
      expect(write).toHaveBeenCalledTimes(1);
      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({
          level: "info",
          message: "info message",
          id: logger[`core`].id,
        }),
      );
    });

    it("should not call write when log level below threshold", () => {
      logger = new Logger(core, "warn"); // 設定 level = warn
      logger.info("info message"); // info < warn，理應不會寫出
      expect(write).not.toHaveBeenCalled();
    });

    it("should merge writeConfig correctly", () => {
      const customWriteConfig = { foo: "bar" } as unknown as WriteConfig;
      logger = new Logger(core, undefined, undefined, customWriteConfig);

      logger.info("test", undefined, {
        writeConfig: { foo: "override" } as unknown as WriteConfig,
      });

      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({
          writeConfig: expect.objectContaining({ foo: "override" }),
        }),
      );
    });
  });

  describe("child logger", () => {
    beforeEach(() => {
      jest.spyOn(LoggerCore, "assertValidLevel").mockImplementation(() => {});
    });

    it("should create child logger with combined context", () => {
      const logger = new Logger(core, "info", "parentContext");
      const child = logger.child({ context: "childContext" });

      expect(child).toBeInstanceOf(Logger);
      expect((child as unknown as Logger)[`context`]).toBe(
        `parentContext${CONTEXT_SEPARATOR}childContext`,
      );
    });

    it("child logger inherits level and writeConfig if not specified", () => {
      const writeConfig = { some: "config" } as unknown as WriteConfig;
      const logger = new Logger(core, "warn", "ctx", writeConfig);
      const child = logger.child();

      expect((child as unknown as Logger)[`level`]).toBe("warn");
      expect((child as unknown as Logger)[`writeConfig`]).toBe(writeConfig);
      expect((child as unknown as Logger)[`context`]).toBe("ctx");
    });

    it("child logger can override level, context, and writeConfig", () => {
      const logger = new Logger(core, "warn", "parentCtx", {
        a: 1,
      } as WriteConfig);
      const child = logger.child({
        level: "error",
        context: "childCtx",
        writeConfig: { b: 2 } as WriteConfig,
      });

      expect((child as unknown as Logger)[`level`]).toBe("error");
      expect((child as unknown as Logger)[`context`]).toBe(
        `parentCtx${CONTEXT_SEPARATOR}childCtx`,
      );
      expect((child as unknown as Logger)[`writeConfig`]).toEqual({
        b: 2,
      });
    });
  });

  describe("level shortcut methods", () => {
    beforeEach(() => {
      jest.spyOn(LoggerCore, "assertValidLevel").mockImplementation(() => {});
    });

    it("debug calls log with debug level", () => {
      const core = {
        id: "test-id",
        level: "debug",
        writeConfig: {},
      } as LoggerCore;
      const logger = new Logger(core);
      logger.debug("debug message");
      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({ level: "debug", message: "debug message" }),
      );
    });

    it("info calls log with info level", () => {
      const logger = new Logger(core);
      logger.info("info message");
      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({ level: "info", message: "info message" }),
      );
    });

    it("warn calls log with warn level", () => {
      const logger = new Logger(core);
      logger.warn("warn message");
      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({ level: "warn", message: "warn message" }),
      );
    });

    it("error calls log with error level", () => {
      const logger = new Logger(core);
      logger.error("error message");
      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({ level: "error", message: "error message" }),
      );
    });
  });
});
