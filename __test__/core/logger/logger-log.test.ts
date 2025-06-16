import type { LoggerCore } from "@/core/logger-core/logger-core";
import { Logger } from "@/core/logger/logger";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

jest.mock("@/core/logger/utils/payload/build-payload");
jest.mock("@/core/logger/utils/payload/transport-payload");
jest.mock("@/shared/utils/assert-valid-level");

describe("Logger.log", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate level, build payload, transport it, and run handlers", async () => {
    const mockCore = {
      id: "logger-1",
      level: "info",
      onLevelChange: jest.fn(),
      handlerManager: {
        runHandlers: jest.fn(),
      },
    } as unknown as LoggerCore;

    const logger = new Logger({
      core: mockCore,
      level: "debug",
    });

    const mockPayload = { id: "mock-payload" };
    (buildPayload as jest.Mock).mockReturnValue(mockPayload);

    await logger["log"]({
      level: "info",
      message: "Test message",
      meta: { key: "value" },
    });

    expect(assertValidLevel).toHaveBeenCalledWith("info");
    expect(buildPayload).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        message: "Test message",
        meta: { key: "value" },
        id: "logger-1",
      }),
    );
    expect(transportPayload).toHaveBeenCalledWith({
      transporters: expect.any(Array),
      rawPayload: mockPayload,
    });
    expect(mockCore.handlerManager.runHandlers).toHaveBeenCalledWith(
      mockPayload,
    );
  });

  it("should do nothing if level is 'silent'", async () => {
    const mockCore: LoggerCore = {
      id: "logger-1",
      level: "info",
      onLevelChange: jest.fn(),
      handlerManager: {
        runHandlers: jest.fn(),
      },
    } as unknown as LoggerCore;

    const logger = new Logger({ core: mockCore, level: "silent" });

    await logger["log"]({
      level: "silent",
      message: "This should not be logged",
    });

    expect(buildPayload).not.toHaveBeenCalled();
    expect(transportPayload).not.toHaveBeenCalled();
    expect(mockCore.handlerManager.runHandlers).not.toHaveBeenCalled();
  });
});
