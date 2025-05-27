import { createLogWithLevel } from "../../../src/logger/utils/create-log-with-level";
import { shouldLog } from "../../../src/logger/utils/should-log";

jest.mock("../../../src/logger/utils/should-log");

describe("createLogWithLevel", () => {
  const mockLog = jest.fn();

  beforeEach(() => {
    mockLog.mockClear();
    (shouldLog as jest.Mock).mockClear();
  });

  it("logs all messages if configLevel is undefined", () => {
    const logger = createLogWithLevel(mockLog);
    const logError = logger("error");

    logError("error message", { user: 1 }, { context: "test" });
    expect(mockLog).toHaveBeenCalledWith(
      "error",
      "error message",
      { user: 1 },
      { context: "test" },
    );
  });

  it("calls shouldLog and logs only if shouldLog returns true", () => {
    (shouldLog as jest.Mock).mockReturnValue(true);
    const logger = createLogWithLevel(mockLog, "warn");
    const logInfo = logger("info");

    logInfo("info message");
    expect(shouldLog).toHaveBeenCalledWith({
      configLevel: "warn",
      level: "info",
    });
    expect(mockLog).toHaveBeenCalledWith(
      "info",
      "info message",
      undefined,
      undefined,
    );
  });

  it("does not log if shouldLog returns false", () => {
    (shouldLog as jest.Mock).mockReturnValue(false);
    const logger = createLogWithLevel(mockLog, "warn");
    const logDebug = logger("debug");

    logDebug("debug message");
    expect(shouldLog).toHaveBeenCalledWith({
      configLevel: "warn",
      level: "debug",
    });
    expect(mockLog).not.toHaveBeenCalled();
  });
});
