/* eslint-disable @typescript-eslint/no-explicit-any */
import { initHandler } from "@/modules/handler-manager/utils/init-handler";

describe("initHandler", () => {
  it("should not call init if handler is not a HandlerClass", () => {
    const handler = {};
    const onError = jest.fn();
    initHandler({ handler: handler as any, id: "id1", onError });
    // no async calls expected, so onError should never be called
    expect(onError).not.toHaveBeenCalled();
  });

  it("should not call init if handler does not have init method", () => {
    const handler = { handle: () => {} };
    const onError = jest.fn();
    initHandler({ handler: handler as any, id: "id2", onError });
    expect(onError).not.toHaveBeenCalled();
  });

  it("should call init if handler has init method", async () => {
    const initMock = jest.fn().mockResolvedValue(undefined);
    const handler = { handle: () => {}, init: initMock };
    const onError = jest.fn();

    initHandler({ handler, id: "id3", onError });

    // Wait for promise microtask queue to flush
    await new Promise(process.nextTick);

    expect(initMock).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("should call onError if init rejects", async () => {
    const error = new Error("fail");
    const initMock = jest.fn().mockRejectedValue(error);
    const handler = { handle: () => {}, init: initMock };
    const onError = jest.fn();

    initHandler({ handler, id: "id4", onError });

    await new Promise(process.nextTick);

    expect(initMock).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith({ error, id: "id4" });
  });

  it("should not throw if onError is not provided", async () => {
    const error = new Error("fail");
    const initMock = jest.fn().mockRejectedValue(error);
    const handler = { handle: () => {}, init: initMock };

    expect(() => initHandler({ handler, id: "id5" })).not.toThrow();

    // wait microtask queue, no unhandled rejection
    await new Promise(process.nextTick);
  });
});
