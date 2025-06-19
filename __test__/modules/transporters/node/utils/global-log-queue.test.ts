import * as internalModule from "@/internal";
import { LogQueue } from "@/modules/transporters/node/utils/global-log-queue";

describe("LogQueue", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should run queued functions in sequence", async () => {
    const queue = new LogQueue();
    const results: number[] = [];

    await queue.queueWrite(async () => {
      results.push(1);
    });

    await queue.queueWrite(async () => {
      results.push(2);
    });

    expect(results).toEqual([1, 2]);
  });

  it("should catch and log errors without throwing", async () => {
    const queue = new LogQueue();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loggedErrors: any[] = [];

    // Spy on internalLog and capture errors
    const spy = jest
      .spyOn(internalModule, "internalLog")
      .mockImplementation((error) => {
        loggedErrors.push(error);
      });

    await queue.queueWrite(async () => {
      throw new Error("fail");
    });

    // 等待 Promise 完成
    await new Promise((r) => setTimeout(r, 0));

    expect(loggedErrors.length).toBeGreaterThan(0);
    expect(loggedErrors[0].message).toContain("Queue write error.");

    spy.mockRestore();
  });

  it("should continue processing after error", async () => {
    const queue = new LogQueue();
    const results: string[] = [];

    await queue.queueWrite(async () => {
      results.push("first");
    });

    await queue.queueWrite(async () => {
      throw new Error("fail");
    });

    await queue.queueWrite(async () => {
      results.push("third");
    });

    // 等待 Promise 完成
    await new Promise((r) => setTimeout(r, 0));

    expect(results).toEqual(["first", "third"]);
  });
});
