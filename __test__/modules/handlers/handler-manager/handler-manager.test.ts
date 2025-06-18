/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RawPayload } from "@/core/logger";
import type { HandlerClass } from "@/modules/handlers/types";
import { HandlerManager } from "@/modules/handlers/handler-manager";
import { DEFAULT_FLUSH_TIMEOUT } from "@/modules/handlers/handler-manager/constants";
import { flushTasksWithTimeout } from "@/modules/handlers/handler-manager/utils/flush-tasks-with-timeout";
import { initHandler } from "@/modules/handlers/handler-manager/utils/init-handler";
import { isHandlerClass } from "@/modules/handlers/handler-manager/utils/is-handler-class";

jest.mock(
  "@/modules/handlers/handler-manager/utils/flush-tasks-with-timeout",
  () => ({
    flushTasksWithTimeout: jest.fn(),
  }),
);

jest.mock("@/modules/handlers/handler-manager/utils/init-handler", () => ({
  initHandler: jest.fn(),
}));

jest.mock("@/modules/handlers/handler-manager/utils/is-handler-class", () => ({
  isHandlerClass: jest.fn(),
}));

describe("HandlerManager", () => {
  describe("addHandler", () => {
    it("should add handler to end with generated id", () => {
      const manager = new HandlerManager();
      const handler = jest.fn();
      const id = manager.addHandler(handler);
      const handlers = manager.getHandlers();
      expect(handlers[0].handler).toBe(handler);
      expect(handlers[0].id).toBe(id);
      expect(initHandler).toHaveBeenCalledWith({
        handler,
        id,
        onError: undefined,
      });
    });

    it("should add handler to start with custom id", () => {
      const manager = new HandlerManager();
      const handler = jest.fn();
      manager.addHandler(() => {}, "last");
      manager.addHandler(handler, "first", "start");
      const handlers = manager.getHandlers();
      expect(handlers[0].id).toBe("first");
    });
  });

  describe("getHandler", () => {
    it("should return correct handler by id", () => {
      const manager = new HandlerManager();
      const handler = jest.fn();
      const id = manager.addHandler(handler);
      expect(manager.getHandler(id)).toBe(handler);
    });

    it("should return undefined if handler not found", () => {
      const manager = new HandlerManager();
      expect(manager.getHandler("unknown")).toBeUndefined();
    });
  });

  describe("removeHandler", () => {
    it("should remove handler by id", () => {
      const manager = new HandlerManager();
      const id = manager.addHandler(() => {});
      expect(manager.removeHandler(id)).toBe(true);
      expect(manager.getHandler(id)).toBeUndefined();
    });

    it("should return false if id not found", () => {
      const manager = new HandlerManager();
      expect(manager.removeHandler("not-exist")).toBe(false);
    });
  });

  describe("runHandlers", () => {
    it("should run all handlers and track tasks", async () => {
      const manager = new HandlerManager();
      const handler = jest.fn(() => Promise.resolve());
      manager.addHandler(handler);
      manager.runHandlers({
        level: "info",
        message: "msg",
        id: "id",
        timestamp: Date.now(),
      } as RawPayload);

      await new Promise((r) => setTimeout(r, 10));

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("flush", () => {
    it("should flush all tasks with default timeout", async () => {
      const manager = new HandlerManager();
      const task = Promise.resolve();
      manager.addHandler(() => task);
      manager.runHandlers({
        level: "info",
        message: "flush",
        id: "id",
        timestamp: Date.now(),
      } as RawPayload);
      await manager.flush();
      expect(flushTasksWithTimeout).toHaveBeenCalledWith(
        expect.any(Map),
        DEFAULT_FLUSH_TIMEOUT,
      );
    });
  });

  describe("setConfig", () => {
    it("should set config and call flush strategy", async () => {
      let flushCallback!: () => Promise<void>;
      const strategy = jest.fn((flush: () => Promise<void>) => {
        flushCallback = flush;
        return () => {};
      });
      const manager = new HandlerManager({ flushStrategy: strategy });
      const flushSpy = jest.spyOn(manager as any, "flush");
      manager.setConfig({ flushStrategy: strategy });
      expect(strategy).toHaveBeenCalledTimes(2);
      await flushCallback();
      expect(flushSpy).toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("should dispose all handler classes", async () => {
      const dispose = jest.fn();
      const handler = { dispose };
      (isHandlerClass as unknown as jest.Mock).mockReturnValue(true);
      const manager = new HandlerManager();
      manager.addHandler(handler as unknown as HandlerClass);
      await manager.dispose();
      expect(dispose).toHaveBeenCalled();
      expect(manager.getHandlers().length).toBe(0);
    });

    it("should ignore dispose if handler is not a class", async () => {
      (isHandlerClass as unknown as jest.Mock).mockReturnValue(false);
      const manager = new HandlerManager();
      manager.addHandler(() => {});
      await manager.dispose();
      expect(manager.getHandlers().length).toBe(0);
    });
  });
});
