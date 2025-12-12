/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseLogger } from "@/logger/base-logger";
import { rura } from "rura";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PipelineManager } from "@/logger/pipeline-manager/pipeline-manager";
import { init, flush, dispose, remove } from "@/logger/pipeline-manager/utils";
import { DEFAULT_HOOKS } from "@/pipeline/hooks";

vi.mock("@/logger/pipeline-manager/utils", () => ({
  init: vi.fn(),
  flush: vi.fn(),
  dispose: vi.fn(),
  remove: vi.fn(),
}));

vi.mock("rura", () => ({
  rura: {
    createHook: vi.fn((name, fn) => ({ name, run: fn })),
    createHookAsync: vi.fn((name, fn) => ({ name, run: fn })),
    createPipeline: vi.fn(() => ({
      debugHooks: vi.fn((cb) => {
        if (cb) cb([]);
      }),
    })),
  },
}));

describe("PipelineManager", () => {
  let logger: BaseLogger;
  let manager: PipelineManager;

  beforeEach(() => {
    logger = {} as BaseLogger;
    manager = new PipelineManager(logger);

    vi.clearAllMocks();
  });

  // -------------------------------------------------------------
  // getHooks()
  // -------------------------------------------------------------
  it("returns the current hook list", () => {
    const hooks = manager.getHooks();
    expect(hooks).toEqual(DEFAULT_HOOKS);
    expect(Array.isArray(hooks)).toBe(true);
  });

  // -------------------------------------------------------------
  // clone()
  // -------------------------------------------------------------
  it("clones hook list for a new logger", () => {
    const newLogger = {} as BaseLogger;
    const cloned = manager.clone(newLogger);

    expect(cloned).not.toBe(manager);
    expect(cloned.getHooks()).toEqual(manager.getHooks());
    expect(cloned.getHooks()).not.toBe(manager.getHooks());
  });

  // -------------------------------------------------------------
  // use()
  // -------------------------------------------------------------
  it("adds a plugin, sorts hooks, and calls init()", async () => {
    const plugin = { name: "p", order: 50 } as any;

    await manager.use(plugin);

    const hooks = manager.getHooks();
    expect(hooks.includes(plugin)).toBe(true);
    expect(init).toHaveBeenCalledWith(plugin, logger);
  });

  it("sorts hooks by order when using a plugin", async () => {
    const p1 = { name: "a", order: 300 } as any;
    const p2 = { name: "b", order: 10 } as any;
    const p3 = { name: "c", order: 200 } as any;

    await manager.use(p1);
    await manager.use(p2);
    await manager.use(p3);

    const ordered = manager.getHooks().filter((h) => "order" in h);
    expect(ordered.map((p) => p.order)).toEqual([10, 200, 300]);
  });

  // -------------------------------------------------------------
  // flush()
  // -------------------------------------------------------------
  it("calls flush() utility with hook list", async () => {
    await manager.flush();
    expect(flush).toHaveBeenCalledWith(manager.getHooks());
  });

  // -------------------------------------------------------------
  // dispose()
  // -------------------------------------------------------------
  it("calls dispose() utility with hook list", async () => {
    await manager.dispose();
    expect(dispose).toHaveBeenCalledWith(manager.getHooks());
  });

  // -------------------------------------------------------------
  // remove()
  // -------------------------------------------------------------
  it("calls remove() utility with correct params", async () => {
    await manager.remove("plugin1");
    expect(remove).toHaveBeenCalledWith("plugin1", manager.getHooks());
  });

  // -------------------------------------------------------------
  // debug()
  // -------------------------------------------------------------
  it("calls rura.createPipeline().debugHooks()", () => {
    manager.debug();
    expect(rura.createPipeline).toHaveBeenCalledWith(manager.getHooks());
    const pipelineInstance = (rura.createPipeline as any).mock.results[0].value;
    expect(pipelineInstance.debugHooks).toHaveBeenCalledTimes(1);
  });
});
