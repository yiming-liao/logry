import { withTimeout } from "@/modules/handlers/handler-manager/utils/with-timeout";

describe("withTimeout", () => {
  it("resolves if the promise completes before timeout", async () => {
    const result = await withTimeout(
      "id",
      new Promise((resolve) => setTimeout(() => resolve("done"), 50)),
      100,
    );
    expect(result).toBe("done");
  });

  it("rejects if the promise exceeds timeout", async () => {
    await expect(
      withTimeout(
        "id",
        new Promise((resolve) => setTimeout(() => resolve("late"), 200)),
        100,
      ),
    ).rejects.toThrow("Timeout exceeded");
  });

  it("calls onTimeout callback if timeout is triggered", async () => {
    const onTimeout = jest.fn();

    await expect(
      withTimeout(
        "id",
        new Promise((resolve) => setTimeout(() => resolve("late"), 200)),
        100,
        onTimeout,
      ),
    ).rejects.toThrow("Timeout exceeded");

    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it("does not call onTimeout if promise resolves in time", async () => {
    const onTimeout = jest.fn();

    const result = await withTimeout(
      "id",
      new Promise((resolve) => setTimeout(() => resolve("early"), 50)),
      100,
      onTimeout,
    );

    expect(result).toBe("early");
    expect(onTimeout).not.toHaveBeenCalled();
  });

  it("cleans up timer after resolution", async () => {
    // This test ensures no unhandled timeout lingers, indirectly via fake timers
    jest.useFakeTimers();

    const promise = new Promise((resolve) =>
      setTimeout(() => resolve("ok"), 10),
    );
    const result = withTimeout("id", promise, 100);

    jest.advanceTimersByTime(50); // resolve earlier than timeout
    await expect(result).resolves.toBe("ok");

    jest.runOnlyPendingTimers(); // this should not trigger anything anymore
    jest.useRealTimers(); // reset timers
  });
});
