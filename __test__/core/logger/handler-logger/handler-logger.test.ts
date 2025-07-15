import type { RawPayload } from "@/shared/types/log-payload";
import { HandlerLogger } from "@/core/logger/handler-logger/handler-logger";

function createMockHandler() {
  return jest.fn();
}

describe("HandlerLogger", () => {
  describe("constructor()", () => {
    it("should initialize with HandlerManager", () => {
      const logger = new HandlerLogger({});
      expect(typeof logger["handlerManager"]).toBe("object");
    });
  });

  const id = "test-handler";

  describe("getHandlers()", () => {
    it("should get all handlers", () => {
      const logger = new HandlerLogger({});
      const handler1 = createMockHandler();
      const handler2 = createMockHandler();
      logger.addHandler(handler1, "h1");
      logger.addHandler(handler2, "h2");

      const handlers = logger.getHandlers();
      expect(handlers.length).toBeGreaterThanOrEqual(2);
      expect(handlers.find((h) => h.id === "h1")?.handler).toBe(handler1);
      expect(handlers.find((h) => h.id === "h2")?.handler).toBe(handler2);
    });
  });

  describe("getHandler()", () => {
    it("should add and get handler", () => {
      const logger = new HandlerLogger({});
      const handler = createMockHandler();
      logger.addHandler(handler, id);
      const gotten = logger.getHandler(id);
      expect(gotten).toBeDefined();
      expect(gotten?.id).toBe(id);
      expect(gotten?.handler).toBe(handler);
    });
  });

  describe("addHandler()", () => {
    it("should add handler", () => {
      const logger = new HandlerLogger({});
      const handler = createMockHandler();
      logger.addHandler(handler, id);
      const handlers = logger["handlerManager"]["handlers"];
      expect(handlers.find((h) => h.id === id)?.handler).toBe(handler);
    });
  });

  describe("removeHandler()", () => {
    it("should remove handler", () => {
      const logger = new HandlerLogger({});
      const handler = createMockHandler();
      const id = "to-remove";
      logger.addHandler(handler, id);
      logger.removeHandler(id);

      const gotten = logger.getHandler(id);
      expect(gotten).toBeUndefined();
    });
  });

  describe("afterTransport()", () => {
    it("should run handlers after transport", () => {
      const logger = new HandlerLogger({});
      const handler = createMockHandler();
      logger.addHandler(handler, "run-after-transport");

      const payload = { level: "info", message: "test" } as RawPayload;
      logger["afterTransport"](payload);

      expect(handler).toHaveBeenCalledWith(payload);
    });
  });

  describe("flush()", () => {
    it("should flush without error", async () => {
      const logger = new HandlerLogger({});
      await expect(logger.flush()).resolves.toBeUndefined();
    });
  });

  describe("dispose()", () => {
    it("should dispose without error", async () => {
      const logger = new HandlerLogger({});
      await expect(logger.dispose()).resolves.toBeUndefined();
    });
  });
});
