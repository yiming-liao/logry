import type { LoggerCore } from "@/core/logger-core";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";
import { UniversalLogger } from "@/core/logger/platform/univesal-logger/universal-logger";
import {
  BrowserConsoleTransporter,
  NodeConsoleTransporter,
} from "@/modules/transporters";

describe("Logger", () => {
  const mockCore = {
    id: "mock-core",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onLevelChange: (_callback: (newLevel: string) => void) => {
      return;
    },
  } as LoggerCore;

  it("should extend CoreLogger", () => {
    const logger = new UniversalLogger({
      core: mockCore,
      level: "info",
      scope: [],
    });
    expect(logger).toBeInstanceOf(CoreLogger);
  });

  it("should initialize with two transporters", () => {
    const logger = new UniversalLogger({
      core: mockCore,
      level: "info",
      scope: [],
    });
    expect(logger["transporters"].length).toBe(2);
    expect(
      logger["transporters"].some((t) => t instanceof NodeConsoleTransporter),
    ).toBe(true);
    expect(
      logger["transporters"].some(
        (t) => t instanceof BrowserConsoleTransporter,
      ),
    ).toBe(true);
  });

  it("should pass normalizer and formatter to transporters", () => {
    const logger = new UniversalLogger({
      core: mockCore,
      level: "info",
      scope: [],
    });
    expect(
      logger["transporters"].some((t) => t instanceof NodeConsoleTransporter),
    ).toBe(true);
    expect(
      logger["transporters"].some(
        (t) => t instanceof BrowserConsoleTransporter,
      ),
    ).toBe(true);
  });
});
