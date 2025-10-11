import type { LogOptions } from "@/core/logger/types";
import type { LoggerCore } from "@/core/logger-core";
import { logAtLevel } from "@/core/logger/base-logger/utils/log-at-level";
import { parseLogArgs } from "@/core/logger/base-logger/utils/parse-log-args";
import { shouldLog } from "@/core/logger/utils/should-log";

jest.mock("@/core/logger/base-logger/utils/parse-log-args");
jest.mock("@/core/logger/utils/should-log");

describe("logAtLevel", () => {
  let mockCore: LoggerCore;
  let mockLog: jest.MockedFunction<(opts: LogOptions) => void>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCore = {
      id: "logger-1",
      level: "info",
    } as unknown as LoggerCore;

    mockLog = jest.fn();
  });

  it("should parse log arguments", () => {
    (parseLogArgs as jest.Mock).mockReturnValue({
      message: "hello",
      meta: { a: 1 },
      options: { scope: ["test"] },
    });
    (shouldLog as jest.Mock).mockReturnValue(false);

    logAtLevel({
      level: "info",
      log: mockLog,
      core: mockCore,
      args: ["hello", { a: 1 }, { scope: ["test"] }],
    });

    expect(parseLogArgs).toHaveBeenCalledWith(
      "hello",
      { a: 1 },
      { scope: ["test"] },
    );
  });

  it("should call log if shouldLog returns true", () => {
    (parseLogArgs as jest.Mock).mockReturnValue({
      message: "test message",
      meta: { b: 2 },
      options: { context: { user: "u1" } },
    });
    (shouldLog as jest.Mock).mockReturnValue(true);

    logAtLevel({
      level: "warn",
      log: mockLog,
      core: mockCore,
      args: ["test message", { b: 2 }, { context: { user: "u1" } }],
    });

    expect(mockLog).toHaveBeenCalledWith({
      level: "warn",
      message: "test message",
      meta: { b: 2 },
      options: { context: { user: "u1" } },
      id: "logger-1",
    });
  });

  it("should not call log if shouldLog returns false", () => {
    (parseLogArgs as jest.Mock).mockReturnValue({
      message: "skip message",
      meta: undefined,
      options: undefined,
    });
    (shouldLog as jest.Mock).mockReturnValue(false);

    logAtLevel({
      level: "debug",
      log: mockLog,
      core: mockCore,
      args: ["skip message"],
    });

    expect(mockLog).not.toHaveBeenCalled();
  });

  it("should handle empty args gracefully", () => {
    (parseLogArgs as jest.Mock).mockReturnValue({
      message: undefined,
      meta: undefined,
      options: undefined,
    });
    (shouldLog as jest.Mock).mockReturnValue(true);

    logAtLevel({
      level: "error",
      log: mockLog,
      core: mockCore,
      args: [],
    });

    expect(mockLog).toHaveBeenCalledWith({
      level: "error",
      message: undefined,
      meta: undefined,
      options: undefined,
      id: "logger-1",
    });
  });
});
