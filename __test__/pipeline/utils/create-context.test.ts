import { describe, it, expect, beforeEach, vi } from "vitest";
import { createContext } from "@/pipeline/utils/create-context";
import { getEnv } from "@/pipeline/utils/platform";
import { LEVEL_CONFIG } from "@/shared/level";

vi.mock("@/pipeline/utils/platform", () => ({
  getEnv: vi.fn(() => ({ isServer: true, isBrowser: false, isPlain: false })),
}));

describe("createContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a valid LogContext object", () => {
    const ctx = createContext({
      level: "info",
      scope: ["test"],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {},
      printConfig: {},
    });

    expect(ctx.raw.level).toBe("info");
    expect(ctx.raw.scope).toEqual(["test"]);
    expect(ctx.configs.normalizeConfig).toEqual({});
    expect(ctx.configs.formatConfig).toEqual({});
    expect(ctx.configs.renderConfig).toBeDefined();
    expect(getEnv).toHaveBeenCalled();
  });

  it("should use Date.now() when timestamp is not provided", () => {
    const now = Date.now();
    const ctx = createContext({
      level: "warn",
      scope: [],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {},
      printConfig: {},
    });

    expect(ctx.raw.timestamp).toBeGreaterThanOrEqual(now);
  });

  it("should merge level defaults into renderConfig.level", () => {
    const userRender = {
      level: {
        cssStyle: "color: pink;",
      },
    };

    const ctx = createContext({
      level: "error",
      scope: [],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: userRender,
      printConfig: {},
    });

    const merged = ctx.configs.renderConfig.level;

    expect(merged?.cssStyle).toBe("color: pink;");
    expect(merged?.ansiStyle).toBe(LEVEL_CONFIG.error.ansiStyle);
  });

  it("should fallback to LEVEL_CONFIG when renderConfig.level is missing", () => {
    const ctx = createContext({
      level: "fatal",
      scope: [],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {},
      printConfig: {},
    });

    const merged = ctx.configs.renderConfig.level;

    expect(merged?.ansiStyle).toBe(LEVEL_CONFIG.fatal.ansiStyle);
    expect(merged?.cssStyle).toBe(LEVEL_CONFIG.fatal.cssStyle);
  });

  it("should allow user-provided ansiStyle to override levelConfig", () => {
    const custom = () => "custom";

    const ctx = createContext({
      level: "info",
      scope: [],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {
        level: { ansiStyle: custom },
      },
      printConfig: {},
    });

    expect(ctx.configs.renderConfig.level?.ansiStyle).toBe(custom);
    expect(ctx.configs.renderConfig.level?.cssStyle).toBe(
      LEVEL_CONFIG.info.cssStyle,
    );
  });

  it("should preserve all other renderConfig fields", () => {
    const ctx = createContext({
      level: "warn",
      scope: [],
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {
        timestamp: { cssStyle: "opacity:0.6;" },
        message: { cssStyle: "font-weight:bold;" },
      },
      printConfig: {},
    });

    expect(ctx.configs.renderConfig.timestamp?.cssStyle).toBe("opacity:0.6;");
    expect(ctx.configs.renderConfig.message?.cssStyle).toBe(
      "font-weight:bold;",
    );
  });
});
