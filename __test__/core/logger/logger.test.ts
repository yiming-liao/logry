import { Logger } from "@/core/logger";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { LoggerCore } from "@/core/logger-core";

jest.mock("@/core/logger/utils/merge/merge-inherited-options", () => ({
  mergeInheritedOptions: jest.fn(),
}));

describe("Logger", () => {
  const core = new LoggerCore({ id: "test", level: "info" });
  const logger = new Logger({
    core,
    level: "debug",
    scope: "app",
    context: { env: "dev" },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("construction", () => {
    it("should initialize Logger with core properties, methods, and transporters", () => {
      expect(logger).toBeInstanceOf(Logger);
      expect(typeof logger.debug).toBe("function");
      expect(typeof logger.force.error).toBe("function");
      expect(logger["transporters"].length).toBeGreaterThan(0);
      expect(logger["normalizer"]).toBeDefined();
      expect(logger["nodeFormatter"]).toBeDefined();
    });
  });

  describe("getCore", () => {
    it("should return the core instance", () => {
      expect(logger.getCore()).toBe(core);
    });
  });

  describe("mergeInheritedOptions", () => {
    it("should call mergeInheritedOptions util with base and additions", () => {
      const additions = { scope: ["child"], context: { a: 1 } };
      (mergeInheritedOptions as jest.Mock).mockReturnValue({ merged: true });

      const result = logger["mergeInheritedOptions"](additions);

      expect(mergeInheritedOptions).toHaveBeenCalledWith(
        {
          scope: logger["scope"],
          context: logger["context"],
          normalizerConfig: logger["normalizerConfig"],
          formatterConfig: logger["formatterConfig"],
        },
        additions,
      );
      expect(result).toEqual({ merged: true });
    });

    it("should call mergeInheritedOptions util with undefined additions when no param", () => {
      (mergeInheritedOptions as jest.Mock).mockReturnValue({ merged: true });

      const result = logger["mergeInheritedOptions"]();

      expect(mergeInheritedOptions).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
      );
      expect(result).toEqual({ merged: true });
    });
  });
});
