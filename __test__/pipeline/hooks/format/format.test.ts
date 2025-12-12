/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LogContext } from "@/shared/types/log-context";
import { describe, it, expect } from "vitest";
import { format } from "@/pipeline/hooks/format";

const createCtx = (overrides: Partial<LogContext> = {}): LogContext =>
  ({
    normalized:
      overrides.normalized !== undefined
        ? overrides.normalized
        : {
            timestamp: 123_456_789,
            id: "logger-1",
            level: "info",
            scope: ["test"],
            message: "hello",
            meta: { a: 1 },
            context: { ver: 1 },
          },
    configs: {
      formatConfig: overrides.configs?.formatConfig,
    },
    env: {
      isServer: true,
      isBrowser: false,
      isPlain: false,
      ...overrides.env,
    },
  }) as LogContext;

describe("format hook", () => {
  it("should throw if ctx.normalized is missing", () => {
    const ctx = createCtx({ normalized: null as any });
    expect(() => format.run(ctx)).toThrow(/unnormalized/);
  });

  it("should format all fields into ctx.formatted", () => {
    const ctx = createCtx();
    format.run(ctx);
    expect(ctx.formatted).toMatchObject({
      timestamp: expect.anything(),
      id: "logger-1",
      level: expect.anything(),
      scope: expect.anything(),
      message: "hello",
      meta: expect.anything(),
      context: expect.anything(),
    });
  });

  it("should hide id and message when hide option is enabled", () => {
    const ctx = createCtx({
      configs: {
        formatConfig: {
          id: { hide: true },
          message: { hide: true },
        },
        normalizeConfig: {},
        renderConfig: {},
        printConfig: {},
      },
    });
    format.run(ctx);
    expect(ctx.formatted?.id).toBeNull();
    expect(ctx.formatted?.message).toBeNull();
  });

  it("should use custom formatter when provided", () => {
    const ctx = createCtx({
      configs: {
        formatConfig: {
          level: {
            customFormatter: () => "CUSTOM_LEVEL",
          },
        },
        normalizeConfig: {},
        renderConfig: {},
        printConfig: {},
      },
    });
    format.run(ctx);
    expect(ctx.formatted?.level).toBe("CUSTOM_LEVEL");
  });

  it("should skip custom formatter if it returns undefined", () => {
    const ctx = createCtx({
      configs: {
        formatConfig: {
          level: {
            customFormatter: () => undefined,
          },
        },
        normalizeConfig: {},
        renderConfig: {},
        printConfig: {},
      },
    });
    format.run(ctx);
    expect(ctx.formatted?.level).not.toBeUndefined();
    expect(ctx.formatted?.level).not.toBe(null);
  });
});
