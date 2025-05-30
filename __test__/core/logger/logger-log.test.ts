import { Logger } from "@/core/logger";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { formatPayload } from "@/core/logger/utils/payload/format-payload";
import { normalizePayload } from "@/core/logger/utils/payload/normalize-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { LoggerCore } from "@/core/logger-core";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

jest.mock("@/shared/utils/assert-valid-level", () => ({
  assertValidLevel: jest.fn(),
}));
jest.mock("@/core/logger/utils/merge/merge-inherited-options", () => ({
  mergeInheritedOptions: jest.fn(),
}));
jest.mock("@/core/logger/utils/payload/build-payload", () => ({
  buildPayload: jest.fn(),
}));
jest.mock("@/core/logger/utils/payload/normalize-payload", () => ({
  normalizePayload: jest.fn(),
}));
jest.mock("@/core/logger/utils/payload/format-payload", () => ({
  formatPayload: jest.fn(),
}));
jest.mock("@/core/logger/utils/payload/transport-payload", () => ({
  transportPayload: jest.fn(),
}));

describe("Logger.log", () => {
  const core = new LoggerCore({ id: "test", level: "info" });
  const logger = new Logger({
    core,
    level: "debug",
    scope: "app",
    context: { env: "dev" },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should skip log if level is 'silent'", () => {
    logger["log"]({ level: "silent", message: "skip", meta: {} });
    expect(assertValidLevel).toHaveBeenCalledWith("silent");
    expect(mergeInheritedOptions).not.toHaveBeenCalled();
    expect(buildPayload).not.toHaveBeenCalled();
    expect(transportPayload).not.toHaveBeenCalled();
  });

  it("should process and transport payload when level is valid", () => {
    const additions = {
      scope: ["s"],
      context: { env: "test" },
      formatterConfig: {},
      normalizerConfig: {},
    };
    const payload = { message: "log", level: "info" };
    const normalized = { formatterConfig: {}, extra: "data" };
    const formatted = { ready: true };

    (mergeInheritedOptions as jest.Mock).mockReturnValue(additions);
    (buildPayload as jest.Mock).mockReturnValue(payload);
    (normalizePayload as jest.Mock).mockReturnValue(normalized);
    (formatPayload as jest.Mock).mockReturnValue(formatted);

    const spyHandler = jest.spyOn(logger["handlerManager"], "runHandlers");

    logger["log"]({
      level: "info",
      message: "log",
      meta: { foo: "bar" },
      options: {
        scope: additions.scope,
        context: additions.context,
        formatterConfig: additions.formatterConfig,
        normalizerConfig: additions.normalizerConfig,
      },
    });

    expect(assertValidLevel).toHaveBeenCalledWith("info");
    expect(mergeInheritedOptions).toHaveBeenCalledWith(
      {
        scope: logger["scope"],
        context: logger["context"],
        normalizerConfig: logger["normalizerConfig"],
        formatterConfig: logger["formatterConfig"],
      },
      additions,
    );
    expect(buildPayload).toHaveBeenCalledWith({
      timestamp: expect.any(Number),
      level: "info",
      id: "test",
      message: "log",
      meta: { foo: "bar" },
      ...additions,
    });
    expect(normalizePayload).toHaveBeenCalledWith(
      logger["normalizer"].normalize,
      payload,
    );
    expect(formatPayload).toHaveBeenCalledWith({
      normalizedPayload: normalized,
      formatterConfig: {},
      nodeFormatter: logger["nodeFormatter"],
      browserFormatter: logger["browserFormatter"],
    });
    expect(transportPayload).toHaveBeenCalledWith({
      transporters: logger["transporters"],
      readyPayload: formatted,
    });
    expect(spyHandler).toHaveBeenCalledWith(payload);
  });
});
