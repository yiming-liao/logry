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

    methods.error("error message", { user: 1 }, { context: "test" });
    expect(mockLog).toHaveBeenCalledWith(
      "error",
      "error message",
      { user: 1 },
      { context: "test" },
    );

    methods.warn("warn message");
    expect(mockLog).toHaveBeenCalledWith(
      "warn",
      "warn message",
      undefined,
      undefined,
    );

    methods.info("info message", null);
    expect(mockLog).toHaveBeenCalledWith(
      "info",
      "info message",
      null,
      undefined,
    );

    methods.debug("debug message", undefined, { context: "test" });
    expect(mockLog).toHaveBeenCalledWith("debug", "debug message", undefined, {
      context: "test",
    });
  });
});
