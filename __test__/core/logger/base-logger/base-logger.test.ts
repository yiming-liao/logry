/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoggerCoreOptions } from "@/core/logger-core/logger-core-types";
import { BaseLogger } from "@/core/logger/base-logger/base-logger";
import { logAtLevel } from "@/core/logger/base-logger/utils/log-at-level";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { LoggerCore } from "@/core/logger-core";

jest.mock("@/core/logger-core");
jest.mock("@/core/logger/utils/payload/transport-payload");
jest.mock("@/core/logger/utils/payload/build-payload");
jest.mock("@/core/logger/utils/create-force-methods");
jest.mock("@/core/logger/base-logger/utils/log-at-level");

describe("BaseLogger", () => {
  const mockOptions: LoggerCoreOptions = { id: "test-logger", level: "debug" };

  beforeEach(() => {
    jest.clearAllMocks();

    (LoggerCore as jest.Mock).mockImplementation(() => ({
      id: "mock-core-id",
      scope: [],
      context: {},
      normalizerConfig: {},
      formatterConfig: {},
      handlerManagerConfig: {},
    }));

    (createForceMethods as jest.Mock).mockImplementation(() => ({
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
    }));

    (buildPayload as jest.Mock).mockImplementation((payload) => payload);
    (transportPayload as jest.Mock).mockImplementation(() => {});
  });

  describe("constructor", () => {
    it("should initialize LoggerCore, bind log, and create force methods", () => {
      const logger = new BaseLogger(mockOptions);
      expect(LoggerCore).toHaveBeenCalledWith(mockOptions);
      expect(logger["log"]).toBeInstanceOf(Function);
      expect(createForceMethods).toHaveBeenCalledWith(
        logger["log"],
        "mock-core-id",
      );
      expect(logger.force).toBeDefined();
    });
  });

  describe("core getter", () => {
    it("should return a read-only snapshot of core", () => {
      const logger = new BaseLogger(mockOptions);
      const snapshot = logger.core;
      expect(snapshot.scope).toEqual(expect.any(Array));
      expect(snapshot.context).toEqual(expect.any(Object));
      expect(snapshot.normalizerConfig).toEqual(expect.any(Object));
      expect(snapshot.formatterConfig).toEqual(expect.any(Object));
      expect(snapshot.handlerManagerConfig).toEqual(expect.any(Object));
    });
  });

  describe("child", () => {
    it("should create a new BaseLogger with merged options", () => {
      const logger = new BaseLogger(mockOptions);
      const childLogger = logger.child({ level: "info", id: "child-id" });
      expect(childLogger).toBeInstanceOf(BaseLogger);
      expect(childLogger.core.scope).toEqual(expect.any(Array));
      expect(childLogger.core.context).toEqual(expect.any(Object));
    });
  });

  describe("log methods (trace, debug, info, warn, error, fatal)", () => {
    it("should call log method for each level", () => {
      const logger = new BaseLogger(mockOptions);

      logger.trace({ level: "trace", message: "trace msg" });
      logger.debug({ level: "debug", message: "debug msg" });
      logger.info({ level: "info", message: "info msg" });
      logger.warn({ level: "warn", message: "warn msg" });
      logger.error({ level: "error", message: "error msg" });
      logger.fatal({ level: "fatal", message: "fatal msg" });

      expect(logAtLevel).toHaveBeenCalledTimes(6);
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "trace" }),
      );
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "debug" }),
      );
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "info" }),
      );
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "warn" }),
      );
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "error" }),
      );
      expect(logAtLevel).toHaveBeenCalledWith(
        expect.objectContaining({ level: "fatal" }),
      );
    });
  });

  describe("mergeOptions", () => {
    it("should call mergeWithCoreOptions with core and additions", () => {
      const logger = new BaseLogger(mockOptions);
      const merged = logger["mergeOptions"]({ scope: ["1"] });
      expect(merged).toBeDefined();
    });
  });

  describe("log", () => {
    it("should not log if level is silent", () => {
      const logger = new BaseLogger(mockOptions);
      const spyAfterTransport = jest.spyOn(logger as any, "afterTransport");
      (logger as any).log({ level: "silent", message: "should not log" });
      expect(transportPayload).not.toHaveBeenCalled();
      expect(spyAfterTransport).not.toHaveBeenCalled();
    });

    it("should build payload and transport it for valid level", () => {
      const logger = new BaseLogger(mockOptions);

      (logger as any).log({ level: "info", message: "hello world" });

      expect(buildPayload).toHaveBeenCalledWith(
        expect.objectContaining({ level: "info", message: "hello world" }),
      );
      expect(transportPayload).toHaveBeenCalledWith(
        expect.objectContaining({
          transporters: expect.any(Array),
          rawPayload: expect.objectContaining({ level: "info" }),
        }),
      );
    });
  });

  describe("afterTransport", () => {
    it("can be called after transportPayload", () => {
      const logger = new BaseLogger(mockOptions);
      const spy = jest.spyOn(logger, "afterTransport" as any);
      (logger as any).log({ level: "info", message: "test" });
      expect(spy).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
