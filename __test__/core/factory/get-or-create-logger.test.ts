import type { LoggerPreset } from "@/presets/types";
import { coreMap } from "@/core/factory";
import { getOrCreateLogger } from "@/core/factory/get-or-create-logger";
import { Logger } from "@/core/logger/logger";
import { LoggerCore } from "@/core/logger-core";
import { internalLog } from "@/internal";
import { loggerPresets } from "@/presets";

jest.mock("@/internal/internal-log", () => ({
  internalLog: jest.fn(),
}));

describe("getOrCreateLogger", () => {
  beforeEach(() => {
    coreMap.clear();
    jest.clearAllMocks();
  });

  it("should creates and returns a new Logger and LoggerCore if none exists", () => {
    const logger = getOrCreateLogger({ id: "test-id" });

    const core = coreMap.get("test-id");

    expect(core).toBeDefined();
    expect(core).toBeInstanceOf(LoggerCore);
    expect(logger).toBeInstanceOf(Logger);
    expect(logger.getCore()).toBe(core);
  });

  it("should returns existing LoggerCore and emits warning if core-level configs are passed", () => {
    // First create the core
    getOrCreateLogger({ id: "test-id" });

    // Call again with config, should warn and reuse core
    const logger = getOrCreateLogger({
      id: "test-id",
      level: "info",
      formatterConfig: {},
    });

    expect(internalLog).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "warn",
        message: expect.stringContaining(
          `LoggerCore with id "test-id" already exists`,
        ),
      }),
    );

    const core = coreMap.get("test-id");
    expect(logger.getCore()).toBe(core);
  });

  it("should does not warn if no core-level configs are passed on existing core", () => {
    getOrCreateLogger({ id: "test-id" });

    getOrCreateLogger({ id: "test-id" });

    expect(internalLog).not.toHaveBeenCalled();
  });

  it("should uses default logger ID when no ID provided", () => {
    const logger = getOrCreateLogger();

    const core = coreMap.get(logger.getCore().id);

    expect(core).toBeDefined();
    expect(logger.getCore().id).toBeDefined();
  });
});

describe("getOrCreateLogger with preset", () => {
  beforeEach(() => {
    coreMap.clear();
    jest.clearAllMocks();
  });

  it("should merge preset configs when creating new LoggerCore", () => {
    const presetName = Object.keys(loggerPresets)[0];
    expect(presetName).toBeDefined();

    const logger = getOrCreateLogger({
      id: "preset-test",
      preset: presetName as LoggerPreset,
    });

    const core = coreMap.get("preset-test");
    expect(core).toBeDefined();
    expect(core).toBeInstanceOf(LoggerCore);
    expect(logger).toBeInstanceOf(Logger);

    expect(core?.["formatterConfig"]).toMatchObject(
      loggerPresets[presetName as LoggerPreset].formatterConfig,
    );
    expect(core?.["normalizerConfig"]).toMatchObject(
      loggerPresets[presetName as LoggerPreset].normalizerConfig,
    );
  });

  it("should warn and ignore configs when core already exists with preset passed", () => {
    const presetName = Object.keys(loggerPresets)[0];

    getOrCreateLogger({ id: "preset-test-2" });

    const logger = getOrCreateLogger({
      id: "preset-test-2",
      preset: presetName as LoggerPreset,
      level: "debug",
      formatterConfig: {},
    });

    expect(internalLog).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "warn",
        message: expect.stringContaining(
          `LoggerCore with id "preset-test-2" already exists`,
        ),
      }),
    );

    const core = coreMap.get("preset-test-2");
    expect(logger.getCore()).toBe(core);
  });
});
