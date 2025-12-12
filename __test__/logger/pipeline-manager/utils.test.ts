/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  isPlugin,
  init,
  flush,
  dispose,
  remove,
} from "@/logger/pipeline-manager/utils";
import { DEFAULT_HOOK_NAMES } from "@/pipeline/hooks";

const logger = {} as any;

describe("plugin utils", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------------
  // isPlugin
  // ---------------------------------------------------------------------
  it("isPlugin returns true for any object with plugin lifecycle methods", () => {
    expect(isPlugin({ run: vi.fn() } as any)).toBe(true);
    expect(isPlugin({ onInit: vi.fn() } as any)).toBe(true);
    expect(isPlugin({ flush: vi.fn() } as any)).toBe(true);
    expect(isPlugin({ dispose: vi.fn() } as any)).toBe(true);
  });

  it("isPlugin returns false for objects without lifecycle methods", () => {
    expect(isPlugin({ name: "hook" } as any)).toBe(false);
  });

  // ---------------------------------------------------------------------
  // init()
  // ---------------------------------------------------------------------
  it("init calls onInit when plugin provides it", async () => {
    const plugin = { onInit: vi.fn(), name: "p" };
    await init(plugin as any, logger);

    expect(plugin.onInit).toHaveBeenCalledWith(logger);
  });

  it("init logs error when onInit throws", async () => {
    const error = new Error("fail");
    const plugin = {
      onInit: vi.fn(() => {
        throw error;
      }),
      name: "p",
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await init(plugin as any, logger);

    expect(spy).toHaveBeenCalled();
  });

  it("init does nothing when plugin is not a plugin", async () => {
    const plugin = { name: "hookWithoutLifecycle" }; // isPlugin = false
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await init(plugin as any, logger);

    expect(spy).not.toHaveBeenCalled();
  });

  it("init logs error using (anonymous) when plugin.name is undefined", async () => {
    const error = new Error("anon fail");

    const plugin = {
      onInit: vi.fn().mockRejectedValue(error),
      // name intentionally missing
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await init(plugin as any, logger);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain('Plugin "(anonymous)" init error:');
  });

  // ---------------------------------------------------------------------
  // flush()
  // ---------------------------------------------------------------------
  it("flush calls plugin.flush when present", async () => {
    const plugin = { flush: vi.fn(), name: "p" };
    await flush([plugin as any]);

    expect(plugin.flush).toHaveBeenCalled();
  });

  it("flush logs error when flush throws", async () => {
    const plugin = {
      flush: vi.fn(() => {
        throw new Error("boom");
      }),
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await flush([plugin as any]);

    expect(spy).toHaveBeenCalled();
  });

  it("flush skips items that are not plugins", async () => {
    const hooks = [{ name: "notPlugin" }]; // isPlugin = false
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await flush(hooks as any);

    expect(spy).not.toHaveBeenCalled();
  });

  it("flush skips plugins without flush()", async () => {
    const hooks = [{ name: "plugin", onInit: vi.fn() }]; // plugin but no flush
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await flush(hooks as any);

    expect(spy).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------
  // dispose()
  // ---------------------------------------------------------------------
  it("dispose calls plugin.dispose when present", async () => {
    const plugin = { dispose: vi.fn(), name: "p" };
    await dispose([plugin as any]);

    expect(plugin.dispose).toHaveBeenCalled();
  });

  it("dispose logs error when dispose throws", async () => {
    const plugin = {
      dispose: vi.fn(() => {
        throw new Error("fail");
      }),
    };

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await dispose([plugin as any]);

    expect(spy).toHaveBeenCalled();
  });

  it("dispose skips non-plugins", async () => {
    const hooks = [{ name: "plainHook" }]; // not plugin
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await dispose(hooks as any);

    expect(spy).not.toHaveBeenCalled();
  });

  it("dispose skips plugins without dispose()", async () => {
    const hooks = [{ name: "plugin", run: vi.fn() }]; // plugin but no dispose
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    await dispose(hooks as any);

    expect(spy).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------
  // remove()
  // ---------------------------------------------------------------------
  it("remove does nothing for default hook names", async () => {
    const hookName = DEFAULT_HOOK_NAMES[0];
    const hooks = [{ name: hookName }] as any[];

    await remove(hookName, hooks);

    // still here
    expect(hooks.length).toBe(1);
  });

  it("remove calls dispose on matching plugin", async () => {
    const plugin = { name: "pluginA", dispose: vi.fn() };
    const hooks = [plugin] as any;

    await remove("pluginA", hooks);

    expect(plugin.dispose).toHaveBeenCalled();
  });

  it("remove deletes only the plugin with matching name", async () => {
    const hooks = [
      { name: "a" },
      { name: "b", dispose: vi.fn() },
      { name: "c" },
    ] as any[];

    await remove("b", hooks);

    expect(hooks.map((h) => h.name)).toEqual(["a", "c"]);
  });

  it("remove leaves unrelated plugins untouched", async () => {
    const hooks = [{ name: "x" }, { name: "y" }] as any[];

    await remove("x", hooks);

    expect(hooks.map((h) => h.name)).toEqual(["y"]);
  });
});
