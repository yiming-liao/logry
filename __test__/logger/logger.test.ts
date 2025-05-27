import type { LoggerCore } from "../../src/core/logger-core";
import { HandlerManager } from "../../src/handler/handler-manager";
import { dispatchLog } from "../../src/log-pipeline/dispatch";
import { Logger } from "../../src/logger";

jest.mock("../../src/log-pipeline/dispatch");
jest.mock("../../src/handler/handler-manager");

describe("Logger", () => {
  let coreMock: LoggerCore;
  let handlerManagerMock: HandlerManager;

  beforeEach(() => {
    jest.clearAllMocks();

    handlerManagerMock = {
      runHandlers: jest.fn(),
      flush: jest.fn(() => Promise.resolve()),
      setConfig: jest.fn(),
      addHandler: jest.fn(),
      removeHandler: jest.fn(),
      dispose: jest.fn(),
    } as unknown as HandlerManager;
    (HandlerManager as jest.Mock).mockImplementation(() => handlerManagerMock);

    coreMock = {
      level: "info",
      id: "core-id-123",
      outputConfig: {
        node: { topLineBreaks: 1 },
      },
      handlerManager: handlerManagerMock,
    } as unknown as LoggerCore;
  });

  describe("constructor", () => {
    it("should initialize with correct properties", () => {
      const logger = new Logger(coreMock, "warn", "my-context", {
        node: { topLineBreaks: 1 },
      });

      expect(logger["level"]).toBe("warn");
      expect(logger["context"]).toBe("my-context");
      expect(logger["outputConfig"]).toEqual({
        node: { topLineBreaks: 1 },
      });

      expect(typeof logger.error).toBe("function");
      expect(typeof logger.warn).toBe("function");
      expect(typeof logger.info).toBe("function");
      expect(typeof logger.debug).toBe("function");
      expect(logger.force).toHaveProperty("error");
      expect(logger.force).toHaveProperty("warn");
      expect(logger.force).toHaveProperty("info");
      expect(logger.force).toHaveProperty("debug");
    });
  });

  describe("logging behavior", () => {
    it("should dispatch and run handlers", () => {
      const logger = new Logger(coreMock);
      logger.info("test message", { user: "u1" }, { context: "ctx1" });

      expect(dispatchLog).toHaveBeenCalledTimes(1);
      const payload = (dispatchLog as jest.Mock).mock.calls[0][0];
      expect(payload.level).toBe("info");
      expect(payload.message).toBe("test message");
      expect(payload.meta).toEqual({ user: "u1" });
      expect(payload.context).toBe("ctx1");
      expect(payload.outputConfig).toEqual(coreMock.outputConfig);

      expect(handlerManagerMock.runHandlers).toHaveBeenCalledWith(payload);
    });

    it("should use fallback context and outputConfig when options is undefined", () => {
      const logger = new Logger(
        coreMock,
        "info",
        "default-ctx",
        coreMock.outputConfig,
      );

      logger["log"]("info", "message without options");

      expect(dispatchLog).toHaveBeenCalledTimes(1);
      const payload = (dispatchLog as jest.Mock).mock.calls[0][0];
      expect(payload.context).toBe("default-ctx");
      expect(payload.outputConfig).toEqual(coreMock.outputConfig);
    });

    it("should not dispatch logs below the set level", () => {
      const logger = new Logger(coreMock, "warn");
      logger.info("this should not be logged");

      expect(dispatchLog).not.toHaveBeenCalled();
    });
  });

  describe("force log methods", () => {
    it("should bypass level filtering", () => {
      const logger = new Logger(coreMock, "error", "ctx");
      logger.force.debug("force log", { tag: "force" });

      const payload = (dispatchLog as jest.Mock).mock.calls[0][0];
      expect(payload.level).toBe("debug");
      expect(payload.message).toBe("force log");
      expect(payload.meta).toEqual({ tag: "force" });

      expect(handlerManagerMock.runHandlers).toHaveBeenCalledWith(payload);
    });

    it("should log even when level is below threshold", () => {
      const logger = new Logger(coreMock, "error");

      logger.info("normal info");
      logger.force.info("forced info");

      expect(dispatchLog).toHaveBeenCalledTimes(1);
      expect((dispatchLog as jest.Mock).mock.calls[0][0].message).toBe(
        "forced info",
      );
    });
  });

  describe("child logger creation", () => {
    it("should create new Logger with merged context and config", () => {
      const logger = new Logger(coreMock, "warn", "ctx1", {
        node: { topLineBreaks: 1 },
      });
      const child = logger.child({
        level: "debug",
        context: "ctx2",
        outputConfig: {
          node: { topLineBreaks: 2 },
        },
      });

      expect(child).toBeInstanceOf(Logger);
      expect(child["level"]).toBe("debug");
      expect(child["context"]).toContain("ctx1");
      expect(child["context"]).toContain("ctx2");
      expect(child["outputConfig"]).toEqual(
        expect.objectContaining({
          node: { topLineBreaks: 2 },
        }),
      );
    });

    it("should work correctly without options", () => {
      const logger = new Logger(coreMock, "info", "ctx1", {
        node: { topLineBreaks: 1 },
      });
      const child = logger.child();

      expect(child).toBeInstanceOf(Logger);
      expect(child["level"]).toBe(logger["level"]);
      expect(child["context"]).toBe(logger["context"]);
      expect(child["outputConfig"]).toEqual(logger["outputConfig"]);
    });
  });

  describe("handler management", () => {
    it("should add a handler using handlerManager", () => {
      const logger = new Logger(coreMock, "info", "context");

      const fakeHandler = jest.fn();
      logger.addHandler(fakeHandler, "custom-id");

      expect(handlerManagerMock.addHandler).toHaveBeenCalledWith(
        fakeHandler,
        "custom-id",
      );
    });

    it("should remove a handler using handlerManager", () => {
      const logger = new Logger(coreMock, "info", "context");

      logger.removeHandler("custom-id");

      expect(handlerManagerMock.removeHandler).toHaveBeenCalledWith(
        "custom-id",
      );
    });

    it("should flush calls handlerManager.flush", async () => {
      const logger = new Logger(coreMock);
      await logger.flush();
      expect(handlerManagerMock.flush).toHaveBeenCalled();
    });

    it("should dispose calls handlerManager.dispose", () => {
      const logger = new Logger(coreMock);
      logger.dispose();
      expect(handlerManagerMock.dispose).toHaveBeenCalled();
    });
  });
});
