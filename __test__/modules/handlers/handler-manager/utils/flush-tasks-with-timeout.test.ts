import { flushTasksWithTimeout } from "@/modules/handlers/handler-manager/utils/flush-tasks-with-timeout";
import { withTimeout } from "@/modules/handlers/handler-manager/utils/with-timeout";

jest.mock("@/modules/handlers/handler-manager/utils/with-timeout", () => ({
  withTimeout: jest.fn(),
}));

describe("flushTasksWithTimeout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call withTimeout for each task when timeout > 0", async () => {
    const task1 = Promise.resolve("done1");
    const task2 = Promise.resolve("done2");
    const map = new Map<Promise<unknown>, string>([
      [task1, "handler1"],
      [task2, "handler2"],
    ]);

    (withTimeout as jest.Mock).mockImplementation((id, task) => task);

    await flushTasksWithTimeout(map, 1000);

    expect(withTimeout).toHaveBeenCalledTimes(2);
    expect(withTimeout).toHaveBeenCalledWith("handler1", task1, 1000);
    expect(withTimeout).toHaveBeenCalledWith("handler2", task2, 1000);
  });

  it("should not call withTimeout when timeout is 0", async () => {
    const task1 = Promise.resolve("done1");
    const task2 = Promise.resolve("done2");
    const map = new Map<Promise<unknown>, string>([
      [task1, "handler1"],
      [task2, "handler2"],
    ]);

    await flushTasksWithTimeout(map, 0);

    expect(withTimeout).not.toHaveBeenCalled();
  });

  it("should not call withTimeout when timeout is negative", async () => {
    const task = Promise.resolve("done");
    const map = new Map<Promise<unknown>, string>([[task, "handlerX"]]);

    await flushTasksWithTimeout(map, -500);

    expect(withTimeout).not.toHaveBeenCalled();
  });

  it("should handle rejection in tasks when timeout is 0", async () => {
    const task = Promise.reject(new Error("fail"));
    const map = new Map<Promise<unknown>, string>([[task, "badHandler"]]);

    await expect(flushTasksWithTimeout(map, 0)).resolves.toBeUndefined();
    expect(withTimeout).not.toHaveBeenCalled();
  });
});
