import type { LoggerCore } from "../../src/core/logger-core";
import { dispatchLog } from "../../src/log-pipeline/dispatch";
import { Logger } from "../../src/logger";

jest.mock("../../src/log-pipeline/dispatch");
jest.mock("../../src/logger/utils/create-force-methods", () => ({
  createForceMethods: jest.fn(() => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  })),
}));
jest.mock("../../src/logger/utils/create-log-with-level", () => ({
  createLogWithLevel: jest.fn((logFn) => () => logFn),
}));

const createMockHandlerManager = () => ({
  addHandler: jest.fn(),
  removeHandler: jest.fn(),
  flush: jest.fn(() => Promise.resolve()),
  dispose: jest.fn(),
  runHandlers: jest.fn(),
});

describe("Logger", () => {
  let core: LoggerCore;
  let logger: Logger;

  beforeEach(() => {
    core = {
      id: "core-id",
      level: "info",
      outputConfig: {},
      handlerManager: createMockHandlerManager(),
    } as unknown as LoggerCore;
    logger = new Logger({
      core,
      scope: ["test"],
    });
  });

  describe("Initialization", () => {
    it("should initialize log and force methods correctly", () => {
      expect(logger.info).toBeDefined();
      expect(logger.error).toBeDefined();
      expect(logger.force).toHaveProperty("info");
    });
  });

  describe("Child Logger Creation", () => {
    it("creates a child logger with merged scope and context", () => {
      const child = logger.child({
        scope: ["child"],
        context: { user: "child" },
      });

      expect(child).toBeInstanceOf(Logger);
      expect(child["scope"]).toEqual(["test", "child"]);
    });

    it("merges parent and child scopes correctly", () => {
      const parent = new Logger({
        core,
        level: "info",
        scope: ["parent"],
      });

      const child = parent.child({ scope: "child" });
      expect(child["scope"]).toEqual(["parent", "child"]);
    });
  });

  describe("Logging Behavior", () => {
    it("dispatches logs and triggers handlers", () => {
      logger["log"]({
        level: "info",
        message: "Test message",
        meta: { foo: "bar" },
      });

      expect(dispatchLog).toHaveBeenCalledWith(
        expect.objectContaining({
          level: "info",
          message: "Test message",
          meta: { foo: "bar" },
          id: "core-id",
        }),
      );

      expect(core.handlerManager.runHandlers).toHaveBeenCalledWith(
        expect.objectContaining({
          level: "info",
          message: "Test message",
        }),
      );
    });
  });

  describe("Handler Management", () => {
    it("adds a log handler", () => {
      const fn = jest.fn();
      logger.addHandler(fn, "my-handler");
      expect(core.handlerManager.addHandler).toHaveBeenCalledWith(
        fn,
        "my-handler",
      );
    });

    it("removes a log handler", () => {
      logger.removeHandler("my-handler");
      expect(core.handlerManager.removeHandler).toHaveBeenCalledWith(
        "my-handler",
      );
    });

    it("flushes all log handlers", async () => {
      await logger.flush();
      expect(core.handlerManager.flush).toHaveBeenCalled();
    });

    it("disposes the handler manager", () => {
      logger.dispose();
      expect(core.handlerManager.dispose).toHaveBeenCalled();
    });
  });
});
