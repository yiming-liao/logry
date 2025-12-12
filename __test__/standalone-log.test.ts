import { describe, it, expect, vi, beforeEach } from "vitest";
import { logPipeline } from "@/pipeline";
import { DEFAULT_HOOKS } from "@/pipeline/hooks";
import { PRESETS } from "@/shared/presets";
import { standaloneLog } from "@/standalone-log";

vi.mock("@/pipeline", () => ({
  logPipeline: vi.fn(),
}));

describe("standaloneLog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const levels = ["trace", "debug", "info", "warn", "error", "fatal"] as const;

  it("calls logPipeline for each log level", () => {
    for (const level of levels) {
      standaloneLog[level]("hello");

      expect(logPipeline).toHaveBeenCalledWith(
        expect.objectContaining({
          level,
          hooks: DEFAULT_HOOKS,
        }),
      );
    }
  });

  it("passes arguments correctly", () => {
    standaloneLog.info("a", { c: 1 });

    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ["a", { c: 1 }],
      }),
    );
  });

  it("always applies the pretty preset", () => {
    standaloneLog.warn("msg");

    expect(logPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        configs: { ...PRESETS.pretty },
      }),
    );
  });

  it("does not include LoggerCore in the call", () => {
    standaloneLog.error("err");

    expect(logPipeline).toHaveBeenCalledWith(
      expect.not.objectContaining({ core: expect.anything() }),
    );
  });
});
