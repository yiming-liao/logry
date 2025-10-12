import type { RawPayload } from "@/shared/types/log-payload";
import { executeHandler } from "@/core/handler-manager/utils/execute-handler";

describe("executeHandler", () => {
  const dummyPayload = {} as RawPayload;
  const handlerId = "test-handler";

  it("should call function handler with rawPayload", async () => {
    const fnHandler = jest.fn().mockResolvedValue(undefined);

    await executeHandler({
      handler: fnHandler,
      id: handlerId,
      rawPayload: dummyPayload,
    });

    expect(fnHandler).toHaveBeenCalledWith(dummyPayload);
  });

  it("should call class handler's handle method with rawPayload", async () => {
    const classHandler = {
      platform: "node" as const,
      handle: jest.fn().mockResolvedValue(undefined),
    };

    expect(typeof classHandler.handle).toBe("function");

    await executeHandler({
      handler: classHandler,
      id: handlerId,
      rawPayload: dummyPayload,
    });

    expect(classHandler.handle).toHaveBeenCalledWith(dummyPayload);
  });

  it("should catch error and call onError callback for function handler", async () => {
    const error = new Error("Handler error");
    const fnHandler = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();

    await executeHandler({
      handler: fnHandler,
      id: handlerId,
      rawPayload: dummyPayload,
      onError,
    });

    expect(onError).toHaveBeenCalledWith({ error, id: handlerId });
  });

  it("should catch error and call onError callback for class handler", async () => {
    const error = new Error("Handler error");
    const classHandler = {
      platform: "node" as const,
      handle: jest.fn().mockRejectedValue(error),
    };
    const onError = jest.fn();

    await executeHandler({
      handler: classHandler,
      id: handlerId,
      rawPayload: dummyPayload,
      onError,
    });

    expect(onError).toHaveBeenCalledWith({ error, id: handlerId });
  });

  it("should not throw if onError is not provided and handler throws", async () => {
    const error = new Error("Handler error");
    const fnHandler = jest.fn().mockRejectedValue(error);

    await expect(
      executeHandler({
        handler: fnHandler,
        id: handlerId,
        rawPayload: dummyPayload,
      }),
    ).resolves.toBeUndefined();
  });
});
