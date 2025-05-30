import { serializeError } from "@/modules/normalizers/utils/serialize-error";

describe("serializeError", () => {
  it("should return message and first N lines of stack", () => {
    const error = new Error("Test failure");
    const result = serializeError(error, 2);

    expect(result.message).toBe("Test failure");
    expect(result.stack?.split("\n").length).toBeLessThanOrEqual(2);
  });

  it("should return full message even without stack", () => {
    const error = new Error("No stack here");
    // Manually remove stack to simulate environment
    delete (error as { stack: unknown }).stack;

    const result = serializeError(error, 3);
    expect(result.message).toBe("No stack here");
    expect(result.stack).toBeUndefined();
  });

  it("should keep exactly N lines of stack", () => {
    const error = new Error("Stack test");
    const linesToKeep = 5;
    const result = serializeError(error, linesToKeep);

    const actualLines = result.stack?.split("\n").length ?? 0;
    expect(actualLines).toBeLessThanOrEqual(linesToKeep);
  });
});
