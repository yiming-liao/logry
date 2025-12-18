/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createLogger } from "@/create-logger";
import { PluginLogger } from "@/logger/plugin-logger";
import { PRESETS } from "@/shared/presets";

vi.mock("@/logger/plugin-logger", () => ({
  PluginLogger: vi.fn().mockImplementation(function (this: any, opts) {
    this.opts = opts;
  }),
}));

describe("createLogger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses the default preset when none is provided", () => {
    createLogger();
    const args = (PluginLogger as any).mock.calls[0][0];
    expect(args.formatConfig).toEqual(PRESETS.pretty.formatConfig);
    expect(args.renderConfig).toEqual(PRESETS.pretty.renderConfig);
  });

  it("merges user formatConfig overrides with preset", () => {
    createLogger({
      preset: "pretty",
      formatConfig: {
        timestamp: { color: "red" } as any,
      },
    });
    const args = (PluginLogger as any).mock.calls[0][0];
    expect(args.formatConfig.timestamp.color).toBe("red");
    expect(args.formatConfig.timestamp).toBeDefined();
  });

  it("merges user renderConfig overrides with preset", () => {
    createLogger({
      preset: "pretty",
      renderConfig: {
        level: {
          cssStyle: "color: gold;",
        },
      },
    });
    const args = (PluginLogger as any).mock.calls[0][0];
    expect(args.renderConfig.level.cssStyle).toBe("color: gold;");
    expect(args.renderConfig.timestamp).toBeDefined();
  });

  it("merges both formatConfig and renderConfig simultaneously", () => {
    createLogger({
      preset: "pretty",
      formatConfig: { level: { color: "blue" } as any },
      renderConfig: { meta: { cssStyle: "opacity: 0.5;" } },
    });
    const args = (PluginLogger as any).mock.calls[0][0];
    expect(args.formatConfig.level.color).toBe("blue");
    expect(args.renderConfig.meta.cssStyle).toBe("opacity: 0.5;");
  });

  it("passes other constructor options directly into PluginLogger", () => {
    createLogger({
      id: "AAA",
      context: { x: 1 },
    });
    const args = (PluginLogger as any).mock.calls[0][0];
    expect(args.id).toBe("AAA");
    expect(args.context).toEqual({ x: 1 });
  });
});
