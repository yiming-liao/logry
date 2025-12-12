/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LogContext } from "@/shared/types/log-context";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { print } from "@/pipeline/hooks/print/print";
import {
  composeAnsi,
  composePlain,
  composeBrowser,
} from "@/pipeline/hooks/print/utils/compose";

vi.mock("@/pipeline/hooks/print/utils/compose", () => ({
  composeAnsi: vi.fn(),
  composeBrowser: vi.fn(),
  composePlain: vi.fn(),
}));

// mock console methods
const spyInfo = vi.spyOn(console, "info").mockImplementation(() => {});

let ctx: LogContext;

beforeEach(() => {
  vi.clearAllMocks();
  ctx = {
    raw: { level: "info", timestamp: 1, id: "x", scope: [], message: "" },
    rendered: {
      timestamp: { plain: "T", ansi: "T" },
      id: { plain: "I", ansi: "I" },
      level: { plain: "L", ansi: "L" },
      scope: { plain: "S", ansi: "S" },
      message: { plain: "M", ansi: "M" },
      meta: { plain: "m", ansi: "m" },
      context: { plain: "c", ansi: "c" },
    },
    configs: {
      normalizeConfig: {},
      formatConfig: {},
      renderConfig: {},
      printConfig: {},
    },
    env: { isServer: false, isBrowser: false, isPlain: false },
  };
});

describe("print hook", () => {
  it("prints using Node composer", () => {
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    vi.mocked(composeAnsi).mockReturnValue("NODE_OUTPUT");
    print.run(ctx);
    expect(spyInfo).toHaveBeenCalledWith("NODE_OUTPUT");
  });

  it("prints using Edge composer", () => {
    ctx.env = { isServer: false, isBrowser: false, isPlain: true };
    vi.mocked(composePlain).mockReturnValue("EDGE_OUTPUT");
    print.run(ctx);
    expect(spyInfo).toHaveBeenCalledWith("EDGE_OUTPUT");
  });

  it("prints using Browser composer with CSS styles", () => {
    ctx.env = { isServer: false, isBrowser: true, isPlain: false };
    vi.mocked(composeBrowser).mockReturnValue({
      text: "%cT%cI",
      cssStyle: ["color:red", ""],
    });
    print.run(ctx);
    expect(spyInfo).toHaveBeenCalled();
    const args = spyInfo.mock.calls[0];
    expect(args[0]).toBe("%cT%cI");
    expect(args[1]).toBe("color:red");
    expect(args[2]).toBe("");
  });

  it("applies line breaks before and after printing", () => {
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    vi.mocked(composeAnsi).mockReturnValue("CORE");
    ctx.configs.printConfig.lineBreaksBefore = 2;
    ctx.configs.printConfig.lineBreaksAfter = 1;
    print.run(ctx);
    expect(spyInfo).toHaveBeenCalledWith("\n\nCORE\n");
  });

  it("throws if rendered context is missing", () => {
    ctx.rendered = undefined as any;
    expect(() => print.run(ctx)).toThrowError(
      /received an unrendered context/i,
    );
  });

  it("handles unknown environment (all false) gracefully", () => {
    ctx.env = { isServer: false, isBrowser: false, isPlain: false };
    expect(composeAnsi).not.toHaveBeenCalled();
    expect(composePlain).not.toHaveBeenCalled();
    expect(composeBrowser).not.toHaveBeenCalled();
    print.run(ctx);
  });

  it("throws wrapped error when customPrinter throws", () => {
    ctx.configs.printConfig.customPrinter = () => {
      throw new Error("boom");
    };
    expect(() => print.run(ctx)).toThrowError(/custom printer failed: boom/);
  });

  it("throws wrapped error when customPrinter throws non-Error value", () => {
    ctx.configs.printConfig.customPrinter = () => {
      throw "something bad";
    };
    expect(() => print.run(ctx)).toThrowError(
      /custom printer failed: something bad/,
    );
  });

  it("uses default printConfig when printConfig is undefined", () => {
    ctx.configs.printConfig = undefined as any;
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    vi.mocked(composeAnsi).mockReturnValue("DEFAULT");
    print.run(ctx);
    expect(spyInfo).toHaveBeenCalledWith("DEFAULT");
  });

  it("skips printing when consoleMode is silent", () => {
    ctx.configs.printConfig.consoleMode = "silent";
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    print.run(ctx);
    expect(spyInfo).not.toHaveBeenCalled();
    expect(composeAnsi).not.toHaveBeenCalled();
    expect(composePlain).not.toHaveBeenCalled();
    expect(composeBrowser).not.toHaveBeenCalled();
  });

  it("falls back to console.log when level is unknown", () => {
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    ctx.raw.level = "unknown" as any;
    const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.mocked(composeAnsi).mockReturnValue("FALLBACK_OUTPUT");
    print.run(ctx);
    expect(spyLog).toHaveBeenCalledWith("FALLBACK_OUTPUT");
  });

  it("uses console.log when consoleMode is log", () => {
    ctx.env = { isServer: true, isBrowser: false, isPlain: false };
    ctx.configs.printConfig.consoleMode = "log";
    const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.mocked(composeAnsi).mockReturnValue("LOG_OUTPUT");
    print.run(ctx);
    expect(spyLog).toHaveBeenCalledWith("LOG_OUTPUT");
    expect(spyInfo).not.toHaveBeenCalled();
  });
});
