import type {
  CancelFlushStrategy,
  OnErrorCallback,
  FlushStrategy,
} from "@/core/handler-manager/handler-manager-config-types";

type SetupFlushStrategyOptions = {
  flushStrategy: FlushStrategy;
  flush: () => Promise<void>;
  onError?: OnErrorCallback;
};

/**
 * Sets up a flush strategy and returns a cancel function (if any).
 */
export function setupFlushStrategy({
  flushStrategy,
  flush,
  onError,
}: SetupFlushStrategyOptions): CancelFlushStrategy | undefined {
  try {
    const cancel = flushStrategy(async () => {
      try {
        await flush();
      } catch (error) {
        onError?.({
          error,
          id: "flush strategy",
          isFlushError: true,
        });
      }
    });

    if (typeof cancel === "function") {
      return cancel;
    }
  } catch (error) {
    onError?.({
      error,
      id: "flush strategy setup",
      isFlushError: false,
    });
  }
  return undefined;
}
