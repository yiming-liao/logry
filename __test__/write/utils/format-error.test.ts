import { formatError } from "../../../src/write/utils/format-error";

describe("formatError", () => {
  it("should return message and sliced stack", () => {
    const error = new Error("Test error");
    error.stack = `Error: Test error\nat line1\nat line2\nat line3\nat line4`;

    const result = formatError(error, 2);

    expect(result.message).toBe("Test error");
    expect(result.stack).toBe("Error: Test error\nat line1");
  });

  it("should return full stack if fewer lines than limit", () => {
    const error = new Error("Oops");
    error.stack = `Error: Oops\nat onlyLine`;

    const result = formatError(error, 5);
    expect(result.stack).toBe("Error: Oops\nat onlyLine");
  });

  it("should return undefined stack if error.stack is undefined", () => {
    const error = new Error("No stack");
    // 模擬沒有 stack 的錯誤
    Object.defineProperty(error, "stack", { value: undefined });

    const result = formatError(error);
    expect(result.stack).toBeUndefined();
  });

  it("should handle 0 stackLines gracefully", () => {
    const error = new Error("Zero");
    error.stack = `Error: Zero\nat line1\nat line2`;

    const result = formatError(error, 0);
    expect(result.stack).toBe(""); // 雖然是空字串，但仍是 defined
  });
});
