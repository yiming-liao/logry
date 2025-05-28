import { createForceMethods } from "../../../src/logger/utils/create-force-methods";

describe("createForceMethods", () => {
  const mockLog = jest.fn();

  beforeEach(() => {
    mockLog.mockClear();
  });

  it("returns an object with error, warn, info, debug methods", () => {
    const methods = createForceMethods(mockLog);

    expect(typeof methods.error).toBe("function");
    expect(typeof methods.warn).toBe("function");
    expect(typeof methods.info).toBe("function");
    expect(typeof methods.debug).toBe("function");
  });

  it("each method calls the original log function with the correct level", () => {
    const methods = createForceMethods(mockLog);

    methods.error("error message", { user: 1 }, { scope: "test" });
    expect(mockLog).toHaveBeenCalledWith({
      level: "error",
      message: "error message",
      meta: { user: 1 },
      options: { scope: "test" },
    });

    methods.warn("warn message");
    expect(mockLog).toHaveBeenCalledWith({
      level: "warn",
      message: "warn message",
      meta: undefined,
      options: undefined,
    });

    methods.info("info message", null);
    expect(mockLog).toHaveBeenCalledWith({
      level: "info",
      message: "info message",
      meta: null,
      options: undefined,
    });

    methods.debug("debug message", undefined, { scope: "test" });
    expect(mockLog).toHaveBeenCalledWith({
      level: "debug",
      message: "debug message",
      meta: undefined,
      options: { scope: "test" },
    });
  });
});
