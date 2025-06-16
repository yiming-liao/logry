import type { FlushStrategy } from "@/modules/handler-manager/handler-config-types";
import { setupFlushStrategy } from "@/modules/handler-manager/utils/setup-flush-strategy";

describe("setupFlushStrategy", () => {
  it("should return cancel function when flushStrategy provides one", async () => {
    const flush = jest.fn().mockResolvedValue(undefined);
    const cancelFn = jest.fn();

    const flushStrategy: FlushStrategy = (flushCallback) => {
      flushCallback();
      return cancelFn;
    };

    const result = setupFlushStrategy({ flushStrategy, flush });

    expect(typeof result).toBe("function");
    result?.();
    expect(cancelFn).toHaveBeenCalled();
    expect(flush).toHaveBeenCalled();
  });

  it("should not return anything if flushStrategy returns undefined", () => {
    const flush = jest.fn().mockResolvedValue(undefined);
    const flushStrategy: FlushStrategy = () => {
      return undefined;
    };

    const result = setupFlushStrategy({ flushStrategy, flush });
    expect(result).toBeUndefined();
  });

  it("should call onError if flush throws error", async () => {
    const error = new Error("flush failed");
    const flush = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();

    const flushStrategy: FlushStrategy = (flushCallback) => {
      flushCallback();
      return undefined;
    };

    setupFlushStrategy({ flushStrategy, flush, onError });

    await new Promise(process.nextTick);

    expect(onError).toHaveBeenCalledWith({
      error,
      id: "flush strategy",
      isFlushError: true,
    });
  });

  it("should call onError if flushStrategy throws error", () => {
    const error = new Error("flush strategy failed");
    const flush = jest.fn();
    const onError = jest.fn();

    const flushStrategy: FlushStrategy = () => {
      throw error;
    };

    setupFlushStrategy({ flushStrategy, flush, onError });

    expect(onError).toHaveBeenCalledWith({
      error,
      id: "flush strategy setup",
      isFlushError: false,
    });
  });

  it("should handle missing onError gracefully", () => {
    const flush = jest.fn().mockResolvedValue(undefined);
    const flushStrategy: FlushStrategy = () => {
      throw new Error("flush strategy fails");
    };

    expect(() => setupFlushStrategy({ flushStrategy, flush })).not.toThrow();
  });
});
