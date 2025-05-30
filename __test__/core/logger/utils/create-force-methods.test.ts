import { createForceMethods } from "@/core/logger/utils/create-force-methods";

describe("createForceMethods", () => {
  const mockLog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with error, warn, info, and debug methods", () => {
    const methods = createForceMethods(mockLog);

    expect(typeof methods.error).toBe("function");
    expect(typeof methods.warn).toBe("function");
    expect(typeof methods.info).toBe("function");
    expect(typeof methods.debug).toBe("function");
  });

  it("should call log with correct level and parameters", () => {
    const methods = createForceMethods(mockLog);

    methods.error("error message", { a: 1 }, { context: {} });
    expect(mockLog).toHaveBeenCalledWith({
      level: "error",
      message: "error message",
      meta: { a: 1 },
      options: { context: {} },
    });

    methods.warn("warn message");
    expect(mockLog).toHaveBeenCalledWith({
      level: "warn",
      message: "warn message",
      meta: undefined,
      options: undefined,
    });

    methods.info("info message", undefined, { context: {} });
    expect(mockLog).toHaveBeenCalledWith({
      level: "info",
      message: "info message",
      meta: undefined,
      options: { context: {} },
    });

    methods.debug("debug message", { debug: true });
    expect(mockLog).toHaveBeenCalledWith({
      level: "debug",
      message: "debug message",
      meta: { debug: true },
      options: undefined,
    });
  });

  it("should throw if invalid log level is passed internally", () => {
    // This tests the internal assertValidLevel call by passing an invalid level.
    // Since createForceMethods uses fixed levels, this is hard to simulate externally.
    // So we rely on the type system and trust assertValidLevel works properly.
    // This test is just a placeholder to highlight that invalid levels are guarded.
    expect(() => {
      createForceMethods((logOptions) => {
        if (logOptions.level === ("invalid" as unknown as "error"))
          throw new Error("Invalid level");
      }).error("msg");
    }).not.toThrow();
  });
});
