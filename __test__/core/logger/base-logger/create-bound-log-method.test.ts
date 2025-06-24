import { createBoundLogMethod } from "@/core/logger/base-logger/utils/create-bound-log-method";
import { shouldLog } from "@/core/logger/utils/should-log";

jest.mock("@/core/logger/utils/should-log", () => ({
  shouldLog: jest.fn(),
}));

describe("createBoundLogMethod", () => {
  const mockLog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a function", () => {
    const boundLog = createBoundLogMethod(mockLog, "info", "warn");
    expect(typeof boundLog).toBe("function");
  });

  it("should call log if shouldLog returns true", () => {
    (shouldLog as jest.Mock).mockReturnValue(true);
    const boundLog = createBoundLogMethod(mockLog, "info", "warn");

    boundLog("test message", { some: "meta" }, { context: { a: 123 } });

    expect(shouldLog).toHaveBeenCalledWith({
      effectiveLevel: "info",
      level: "warn",
    });
    expect(mockLog).toHaveBeenCalledWith({
      level: "warn",
      message: "test message",
      meta: { some: "meta" },
      options: { context: { a: 123 } },
    });
  });

  it("should not call log if shouldLog returns false", () => {
    (shouldLog as jest.Mock).mockReturnValue(false);
    const boundLog = createBoundLogMethod(mockLog, "info", "debug");

    boundLog("test message");

    expect(shouldLog).toHaveBeenCalledWith({
      effectiveLevel: "info",
      level: "debug",
    });
    expect(mockLog).not.toHaveBeenCalled();
  });

  it("should support calls without meta and options", () => {
    (shouldLog as jest.Mock).mockReturnValue(true);
    const boundLog = createBoundLogMethod(mockLog, "info", "info");

    boundLog("message only");

    expect(mockLog).toHaveBeenCalledWith({
      level: "info",
      message: "message only",
      meta: undefined,
      options: undefined,
    });
  });
});
