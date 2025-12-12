import { describe, it, expect, vi, beforeEach } from "vitest";
import { LEVEL_CONSOLE_MAP } from "@/pipeline/hooks/print/utils/level-console-map";

describe("LEVEL_CONSOLE_MAP", () => {
  const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});
  const spyInfo = vi.spyOn(console, "info").mockImplementation(() => {});
  const spyWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const spyError = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("routes trace → console.log", () => {
    LEVEL_CONSOLE_MAP.trace("A", 1);
    expect(spyLog).toHaveBeenCalledWith("A", 1);
  });

  it("routes debug → console.log", () => {
    LEVEL_CONSOLE_MAP.debug("B", 2);
    expect(spyLog).toHaveBeenCalledWith("B", 2);
  });

  it("routes info → console.info", () => {
    LEVEL_CONSOLE_MAP.info("C", 3);
    expect(spyInfo).toHaveBeenCalledWith("C", 3);
  });

  it("routes warn → console.warn", () => {
    LEVEL_CONSOLE_MAP.warn("D", 4);
    expect(spyWarn).toHaveBeenCalledWith("D", 4);
  });

  it("routes error → console.error", () => {
    LEVEL_CONSOLE_MAP.error("E", 5);
    expect(spyError).toHaveBeenCalledWith("E", 5);
  });

  it("routes fatal → console.error", () => {
    LEVEL_CONSOLE_MAP.fatal("F", 6);
    expect(spyError).toHaveBeenCalledWith("F", 6);
  });
});
