/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PipelineManager } from "@/logger/pipeline-manager";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PluginLogger } from "@/logger/plugin-logger/plugin-logger";

describe("PluginLogger", () => {
  let logger: PluginLogger;
  let mockPipeline: PipelineManager & Record<string, any>;

  beforeEach(() => {
    logger = new PluginLogger();
    mockPipeline = {
      clone: vi.fn(() => mockPipeline),
      use: vi.fn(),
      flush: vi.fn(),
      dispose: vi.fn(),
      remove: vi.fn(),
      debug: vi.fn(),
    } as any;

    Object.defineProperty(logger, "pluginManager", {
      value: mockPipeline,
      writable: true,
    });
  });

  it("creates a PipelineManager instance", () => {
    expect(logger["pluginManager"]).toBeDefined();
    expect(logger["pluginManager"]).toBe(mockPipeline);
  });

  it("creates child logger with cloned PipelineManager", () => {
    const child = logger.child();
    expect(mockPipeline.clone).toHaveBeenCalledWith(child);
    expect(child["pluginManager"]).toBe(mockPipeline);
  });

  it("delegates use(plugin)", async () => {
    const plugin = { name: "x" } as any;
    await logger.use(plugin);
    expect(mockPipeline.use).toHaveBeenCalledWith(plugin);
  });

  it("delegates flush()", async () => {
    await logger.flush();
    expect(mockPipeline.flush).toHaveBeenCalledTimes(1);
  });

  it("delegates dispose()", async () => {
    await logger.dispose();
    expect(mockPipeline.dispose).toHaveBeenCalledTimes(1);
  });

  it("delegates remove(name)", async () => {
    await logger.remove("abc");
    expect(mockPipeline.remove).toHaveBeenCalledWith("abc");
  });

  it("delegates debugHooks()", () => {
    logger.debugHooks();
    expect(mockPipeline.debug).toHaveBeenCalledTimes(1);
  });
});
