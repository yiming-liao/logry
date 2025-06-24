import type { ChildOptions } from "@/core/logger/types";
import type { LoggerCore } from "@/core/logger-core";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";

function createMockCore() {
  return {
    level: "info",
    id: "core-id",
    handlerManager: {},
    onLevelChange: jest.fn(),
  } as unknown as LoggerCore;
}

describe("CoreLogger", () => {
  describe("constructor()", () => {
    it("should initialize with core and level", () => {
      const core = createMockCore();
      const logger = new CoreLogger({ core, level: "warn" });
      expect(logger.getCore()).toBe(core);
      expect(logger["level"]).toBe("warn");
    });

    it("should fallback to core level if no level provided", () => {
      const core = createMockCore();
      const logger = new CoreLogger({ core });
      expect(logger["level"]).toBe(core.level);
    });

    it("should update level and log methods on core level change", () => {
      let levelChangeCallback: (level: string) => void = () => {};
      const core = {
        level: "info",
        id: "core-id",
        handlerManager: {},
        onLevelChange: jest.fn((cb) => {
          levelChangeCallback = cb;
        }),
      } as unknown as LoggerCore;

      const logger = new CoreLogger({ core, level: "info" });

      expect(core.onLevelChange).toHaveBeenCalled();

      levelChangeCallback("warn");

      expect(logger["level"]).toBe("warn");
    });
  });

  describe("child()", () => {
    it("should create child logger with merged options", () => {
      const core = createMockCore();
      const logger = new CoreLogger({ core, level: "info", scope: ["base"] });

      const childOptions: ChildOptions = {
        level: "warn",
        scope: ["child"],
        context: { user: "test" },
      };

      const childLogger = logger.child(childOptions);
      expect(childLogger).toBeInstanceOf(CoreLogger);
      expect(childLogger["level"]).toBe("warn");
      expect(childLogger["scope"]).toContain("child");
    });

    it("should throw on invalid level in child", () => {
      const core = createMockCore();
      const logger = new CoreLogger({ core });
      expect(() =>
        logger.child({ level: "invalid-level" as "error" }),
      ).toThrow();
    });
  });
});
