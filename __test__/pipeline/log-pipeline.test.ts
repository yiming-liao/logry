/* eslint-disable @typescript-eslint/no-explicit-any */
import { rura } from "rura";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { logPipeline } from "@/pipeline/log-pipeline";

const syncHook = { name: "sync", run: vi.fn() };
const asyncHook = { name: "async", run: vi.fn(), __async: true };

vi.spyOn(rura, "isAsyncHook").mockImplementation((h: any) => !!h.__async);
vi.spyOn(rura, "createPipeline").mockImplementation(
  (hooks) =>
    ({ run: (ctx: any) => hooks?.forEach((h: any) => h.run(ctx)) }) as any,
);

describe("logPipeline", () => {
  let core: any;

  beforeEach(() => {
    vi.clearAllMocks();
    core = { id: "LOG", scope: ["base"], context: { a: 1 } };
  });

  it("runs sync hooks immediately", () => {
    logPipeline({
      hooks: [syncHook],
      level: "info",
      core,
      args: ["message"],
    });
    expect(syncHook.run).toHaveBeenCalled();
  });

  it("runs async hooks in background", async () => {
    asyncHook.run.mockResolvedValueOnce(undefined);
    logPipeline({
      hooks: [asyncHook],
      level: "info",
      core,
      args: ["msg"],
    });
    await Promise.resolve();
    expect(asyncHook.run).toHaveBeenCalled();
  });

  it("builds merged context correctly", () => {
    const hook = { run: vi.fn() } as any;
    logPipeline({
      hooks: [hook],
      level: "debug",
      core,
      configs: {
        normalizeConfig: { x: 1 },
        formatConfig: { y: 2 },
      } as any,
      args: ["hello", { meta: true }, { normalizeConfig: { x: 9 } }],
    });
    const ctx = hook.run.mock.calls[0][0];
    expect(ctx.raw.message).toBe("hello");
    expect(ctx.raw.meta).toEqual({ meta: true });
    expect(ctx.raw.context).toEqual({ a: 1 });
    expect(ctx.configs.normalizeConfig).toEqual({ x: 9 });
    expect(ctx.configs.formatConfig.y).toBe(2);
    expect(ctx.configs.formatConfig).toMatchObject({ y: 2 });
  });

  it("resolves scopes correctly", () => {
    const hook = { run: vi.fn() } as any;
    logPipeline({
      hooks: [hook],
      level: "info",
      core: { scope: ["A"] } as any,
      args: ["msg", {}, { scope: "B" }],
    });
    const ctx = hook.run.mock.calls[0][0];
    expect(ctx.raw.scope).toEqual(["A", "B"]);
  });

  it("does not throw if no async hooks exist", () => {
    expect(() =>
      logPipeline({ hooks: [], level: "info", args: ["msg"] }),
    ).not.toThrow();
  });

  it("logs errors when an async hook fails", async () => {
    const spyError = vi.spyOn(console, "error").mockImplementation(() => {});
    const failingHook = {
      name: "fail",
      __async: true,
      run: vi.fn().mockRejectedValue(new Error("boom")),
    };
    logPipeline({
      hooks: [failingHook],
      level: "info",
      args: ["msg"],
    });
    await Promise.resolve();
    expect(spyError).toHaveBeenCalled();
    const call = spyError.mock.calls[0];
    expect(call[0]).toMatch(/async hook failed/i);
    expect(call[1]).toBeInstanceOf(Error);
    expect(call[1].message).toBe("boom");
  });
});
