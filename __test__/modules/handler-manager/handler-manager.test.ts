import type { RawPayload } from "@/core/logger/types";
import { HandlerManager } from "@/modules/handler-manager";
import { withTimeout } from "@/modules/handler-manager/utils/with-timeout";

jest.mock("@/modules/handler-manager/utils/with-timeout", () => ({
  withTimeout: jest.fn((task: Promise<void>) => task),
}));

describe("HandlerManager", () => {
  let manager: HandlerManager;

  const mockPayload: RawPayload = { message: "test log" } as RawPayload;

  beforeEach(() => {
    jest.clearAllMocks();
    manager = new HandlerManager();
  });

  it("adds handlers and executes them on runHandlers", async () => {
    const handler = jest.fn().mockResolvedValue(undefined);
    manager.addHandler(handler, "test");
    manager.runHandlers(mockPayload);
    await manager.flush();
    expect(handler).toHaveBeenCalledWith(mockPayload);
  });

  it("should not allow duplicate ids (auto-generate new id if conflict)", () => {
    const handler = jest.fn();
    manager.addHandler(handler, "duplicate-id");
    // addHandler should auto-generate a new id, not throw
    manager.addHandler(handler, "duplicate-id");
    const handlers = manager.getHandlers();
    const ids = handlers.map((h) => h.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("removes handler by ID", () => {
    const handler = jest.fn();
    manager.addHandler(handler, "removable");
    expect(manager.removeHandler("removable")).toBe(true);
    expect(manager.removeHandler("nonexistent")).toBe(false);
  });

  it("calls onError when a handler fails", async () => {
    const error = new Error("fail!");
    const handler = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();
    manager.setConfig({ onError });
    manager.addHandler(handler, "fail-handler");
    manager.runHandlers(mockPayload);
    await manager.flush();
    expect(onError).toHaveBeenCalledWith(error, "fail-handler");
  });

  it("calls onError when flush times out", async () => {
    (withTimeout as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Timeout");
    });
    const onError = jest.fn();
    manager.setConfig({ onError });
    const handler = jest.fn().mockResolvedValue(undefined);
    manager.addHandler(handler, "timeout-handler");
    manager.runHandlers(mockPayload);
    await manager.flush();
    expect(onError).toHaveBeenCalledWith(expect.any(Error), "flushTimeout");
  });

  it("clears pending tasks after flush", async () => {
    const handler = jest.fn().mockResolvedValue(undefined);
    manager.addHandler(handler, "pending");
    manager.runHandlers(mockPayload);
    expect((manager as HandlerManager)["pendingTasks"].size).toBeGreaterThan(0);
    await manager.flush();
    expect((manager as HandlerManager)["pendingTasks"].size).toBe(0);
  });

  it("flushes with provided timeout", async () => {
    const handler = jest.fn().mockResolvedValue(undefined);
    manager.addHandler(handler, "custom");
    manager.runHandlers(mockPayload);
    await manager.flush(100);
    expect(handler).toHaveBeenCalled();
  });

  it("supports flushStrategy with cancel", () => {
    const cancel = jest.fn();
    manager.setConfig({
      flushStrategy: () => cancel,
    });
    manager.dispose();
    expect(cancel).toHaveBeenCalled();
  });

  it("flushStrategy is replaced on setConfig", () => {
    const cancel1 = jest.fn();
    const cancel2 = jest.fn();
    manager.setConfig({ flushStrategy: () => cancel1 });
    manager.setConfig({ flushStrategy: () => cancel2 });
    expect(cancel1).toHaveBeenCalled();
    manager.dispose();
    expect(cancel2).toHaveBeenCalled();
  });

  it("returns the current config via getConfig", () => {
    const onError = jest.fn();
    const flushTimeout = 777;
    const config = { onError, flushTimeout };
    manager.setConfig(config);
    expect(manager.getConfig()).toEqual(config);
  });

  it("assigns auto-incremented ID when ID is not provided", () => {
    const handler = jest.fn();
    manager.addHandler(handler);
    const handlers = manager.getHandlers();
    expect(handlers[0].id).toMatch(/^handler-\d+$/);
  });

  it('adds handler at the start when position is "start"', () => {
    const first = jest.fn();
    const second = jest.fn();
    manager.addHandler(first, "first");
    manager.addHandler(second, "second", "start");
    const handlers = manager.getHandlers();
    expect(handlers[0].id).toBe("second");
    expect(handlers[1].id).toBe("first");
  });

  it("returns a shallow copy of handlers array", () => {
    const handler = jest.fn();
    manager.addHandler(handler, "my-handler");
    const handlersCopy = manager.getHandlers();
    expect(handlersCopy).toEqual([{ id: "my-handler", handler }]);
    expect(handlersCopy).not.toBe((manager as HandlerManager)["handlers"]);
  });

  it("flushes without timeout if timeout is 0 or negative", async () => {
    const handler = jest.fn().mockResolvedValue(undefined);
    manager.addHandler(handler, "no-timeout");
    manager.runHandlers(mockPayload);
    await manager.flush(0);
    expect(handler).toHaveBeenCalled();
  });
});
