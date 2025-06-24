import type { Transporter } from "@/modules/transporters";
import type { RawPayload } from "@/shared/types/log-payload";
import { BaseLogger } from "@/core/logger/base-logger/base-logger";

const createMockTransporter = (): Transporter => ({
  platform: "node",
  transport: jest.fn(),
});

describe("BaseLogger", () => {
  describe("constructor()", () => {
    it("should initialize with default level and empty Transporters", () => {
      const logger = new BaseLogger({});
      expect(logger["level"]).toBeDefined();
      expect(logger["transporters"]).toEqual([]);
    });

    it("should store scope as array when scope is string", () => {
      const logger = new BaseLogger({ scope: "singleScope" });
      expect(logger["scope"]).toEqual(["singleScope"]);
    });

    it("should keep scope as array when scope is array", () => {
      const scopes = ["scope1", "scope2"];
      const logger = new BaseLogger({ scope: scopes });
      expect(logger["scope"]).toEqual(scopes);
    });
  });

  describe("updateLogMethods()", () => {
    it("should bind log methods based on level", () => {
      const logger = new BaseLogger({ level: "info" });
      expect(typeof logger.info).toBe("function");
      expect(typeof logger.error).toBe("function");
    });
  });

  describe("mergeInheritedOptions()", () => {
    it("should merge logger options with runtime additions", () => {
      const logger = new BaseLogger({ scope: ["core"], context: { a: 1 } });
      const result = logger["mergeInheritedOptions"]({ context: { b: 2 } });
      expect(result.context).toEqual({ a: 1, b: 2 });
      expect(result.scope).toEqual(["core"]);
    });
  });

  describe("log()", () => {
    it("should skip logging if level is silent", () => {
      const logger = new BaseLogger({ level: "silent" });
      const transportSpy = jest.fn();
      logger["transporters"] = [{ platform: "node", transport: transportSpy }];
      logger["log"]({
        level: "silent",
        id: "test",
        message: "Hello",
        meta: {},
        options: {},
      });
      expect(transportSpy).not.toHaveBeenCalled();
    });

    it("should call transporters and afterTransport", () => {
      const logger = new BaseLogger({});
      const transporter = createMockTransporter();
      const afterTransport = jest.fn();
      logger["transporters"] = [transporter];
      logger["afterTransport"] = afterTransport;

      logger["log"]({
        level: "warn",
        message: "Hello",
        meta: { x: 1 },
        options: {},
      });

      expect(transporter.transport).toHaveBeenCalled();
      expect(afterTransport).toHaveBeenCalled();
    });
  });

  describe("afterTransport()", () => {
    it("should do nothing by default", () => {
      const logger = new BaseLogger({});
      expect(() => logger["afterTransport"]({} as RawPayload)).not.toThrow();
    });
  });
});
