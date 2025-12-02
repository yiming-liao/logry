import type { LoggerCoreOptions } from "@/core/logger-core/logger-core-types";
import { LoggerCore } from "@/core/logger-core/logger-core";
import { DEFAULT_LOGGER_LEVEL, DEFAULT_LOGGER_NAME } from "@/shared/constants";

describe("LoggerCore", () => {
  it("should initialize with default values when no options are provided", () => {
    const logger = new LoggerCore();

    expect(logger.id).toBe(DEFAULT_LOGGER_NAME);
    expect(logger.level).toBe(DEFAULT_LOGGER_LEVEL);
    expect(logger.scope).toEqual([]);
    expect(logger.context).toBeUndefined();
    expect(logger.formatterConfig).toBeUndefined();
    expect(logger.normalizerConfig).toBeUndefined();
    expect(logger.handlerManagerConfig).toBeUndefined();
  });

  it("should accept custom options and initialize properties correctly", () => {
    const options: LoggerCoreOptions = {
      id: "my-logger",
      level: "warn",
      scope: ["app", "module"],
      context: { user: "test" },
      formatterConfig: {
        /* mock formatter config */
      },
      normalizerConfig: {
        /* mock normalizer config */
      },
      handlerManagerConfig: {
        /* mock handler config */
      },
    };

    const logger = new LoggerCore(options);

    expect(logger.id).toBe("my-logger");
    expect(logger.level).toBe("warn");
    expect(logger.scope).toEqual(["app", "module"]);
    expect(logger.context).toEqual({ user: "test" });
    expect(logger.formatterConfig).toBe(options.formatterConfig);
    expect(logger.normalizerConfig).toBe(options.normalizerConfig);
    expect(logger.handlerManagerConfig).toBe(options.handlerManagerConfig);
  });

  it("should convert single scope string into array", () => {
    const logger = new LoggerCore({ scope: "single-scope" });
    expect(logger.scope).toEqual(["single-scope"]);
  });

  it("should setLevel correctly updates the log level", () => {
    const logger = new LoggerCore({ level: "info" });
    logger.setLevel("error");
    expect(logger.level).toBe("error");
  });

  it("should throw an error when setLevel receives invalid level", () => {
    const logger = new LoggerCore();
    // @ts-expect-error intentionally passing invalid level
    expect(() => logger.setLevel("invalid-level")).toThrow();
  });

  it("should resetLevel restores the initial log level", () => {
    const logger = new LoggerCore({ level: "debug" });
    logger.setLevel("error");
    expect(logger.level).toBe("error");
    logger.resetLevel();
    expect(logger.level).toBe("debug");
  });
});
