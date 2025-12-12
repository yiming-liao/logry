/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseLoggerConstructorOptions } from "@/logger/base-logger/types";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BaseLogger } from "@/logger/base-logger/base-logger";
import { logPipeline } from "@/pipeline";

vi.mock("@/pipeline", () => ({
  logPipeline: vi.fn(),
}));

describe("BaseLogger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createLogger = (options: BaseLoggerConstructorOptions = {}) =>
    new BaseLogger(options);

  // ---------------------------------------------------------------------------
  // 1. Basic call forwarding
  // ---------------------------------------------------------------------------
  it("should call logPipeline with correct level and args", () => {
    const logger = createLogger({ level: "trace" });

    logger.info("hello");

    expect(logPipeline).toHaveBeenCalledTimes(1);
    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
        args: ["hello"],
      }),
    );
  });

  // ---------------------------------------------------------------------------
  // 2. Level filtering
  // ---------------------------------------------------------------------------
  it("should respect level filtering", () => {
    const logger = createLogger({ level: "error" }); // info < error

    logger.info("hello"); // should be blocked
    expect(logPipeline).not.toHaveBeenCalled();

    logger.error("boom"); // should run
    expect(logPipeline).toHaveBeenCalledTimes(1);
    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({ level: "error" }),
    );
  });

  // ---------------------------------------------------------------------------
  // 3. Force bypass
  // ---------------------------------------------------------------------------
  it("force.<level> should bypass level filtering", () => {
    const logger = createLogger({ level: "fatal" });

    logger.info("normal"); // should NOT run
    expect(logPipeline).not.toHaveBeenCalled();

    logger.force.info("forced!"); // should bypass filter
    expect(logPipeline).toHaveBeenCalledTimes(1);
    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "info",
      }),
    );
  });

  // ---------------------------------------------------------------------------
  // 4. Force should NOT change logger state
  // ---------------------------------------------------------------------------
  it("force.<level> should not affect normal logger behavior", () => {
    const logger = createLogger({ level: "error" });

    logger.force.debug("forced");

    expect(logPipeline).toHaveBeenCalledTimes(1);

    logger.debug("blocked");
    // blocked call should not run
    expect(logPipeline).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // 5. args passthrough
  // ---------------------------------------------------------------------------
  it("should pass args array correctly to logPipeline", () => {
    const logger = createLogger({ level: "trace" });

    logger.warn("a", { b: 1 });

    expect(logPipeline).toHaveBeenCalledTimes(1);
    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ["a", { b: 1 }],
      }),
    );
  });

  // ---------------------------------------------------------------------------
  // 6. hooks: should use pluginManager.getHooks if present
  // ---------------------------------------------------------------------------
  it("should pass pluginManager hooks if available", () => {
    const logger = createLogger({ level: "info" });

    const fakeHooks = [{ name: "testHook" } as any];

    // Inject pluginManager manually
    (logger as any).pluginManager = {
      getHooks: () => fakeHooks,
    };

    logger.info("x");

    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        hooks: fakeHooks,
      }),
    );
  });

  // ---------------------------------------------------------------------------
  // 7. hooks: should use empty array when pluginManager missing
  // ---------------------------------------------------------------------------
  it("should not pass hooks if no pluginManager exists", () => {
    const logger = createLogger({ level: "info" });

    logger.info("hello");

    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({ hooks: [] }),
    );
  });

  // ---------------------------------------------------------------------------
  // 8. child(): merging configs, scope, id, level, context
  // ---------------------------------------------------------------------------
  it("should create a child logger with merged configs and scope", () => {
    const logger = createLogger({
      id: "root",
      level: "debug",
      scope: ["main"],
      context: { a: 1 },
      normalizeConfig: { foo: 1 } as any,
      formatConfig: { bar: 1 } as any,
    });

    const child = logger.child({
      scope: "child",
      context: { b: 2 },
      normalizeConfig: { foo: 2 } as any,
    });

    expect(child.core.id).toBe("root"); // inherited
    expect(child.core.level).toBe("debug");
    expect(child.core.scope).toEqual(["main", "child"]);
    expect(child.core.context).toEqual({ a: 1, b: 2 });

    expect(child["configs"]).toEqual({
      normalizeConfig: { foo: 2 },
      formatConfig: { bar: 1 },
    });
  });

  // ---------------------------------------------------------------------------
  // 9. force.<level> should call all variants and pass correct level
  // ---------------------------------------------------------------------------
  it("should execute all force.<level> variants", () => {
    const logger = createLogger({ level: "fatal" });

    const levels = [
      "trace",
      "debug",
      "info",
      "warn",
      "error",
      "fatal",
    ] as const;

    for (const lv of levels) {
      vi.clearAllMocks();
      logger.force[lv]("x");
      expect(logPipeline).toHaveBeenCalledTimes(1);
      expect(logPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ level: lv }),
      );
    }
  });
});
