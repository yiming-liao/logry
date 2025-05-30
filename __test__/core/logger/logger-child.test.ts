import { Logger } from "@/core/logger";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { LoggerCore } from "@/core/logger-core";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

jest.mock("@/shared/utils/assert-valid-level", () => ({
  assertValidLevel: jest.fn(),
}));
jest.mock("@/core/logger/utils/merge/merge-inherited-options", () => ({
  mergeInheritedOptions: jest.fn(),
}));

describe("Logger.child", () => {
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

  it("should create a child Logger with merged options and valid level", () => {
    (mergeInheritedOptions as jest.Mock).mockReturnValue({
      scope: ["child"],
      context: { user: "test" },
      normalizerConfig: {},
      formatterConfig: {},
    });
    (assertValidLevel as jest.Mock).mockImplementation(() => {});

    const childLogger = logger.child({
      level: "debug",
      scope: ["child"],
      context: { user: "test" },
      formatterConfig: {},
      normalizerConfig: {},
    });

    expect(assertValidLevel).toHaveBeenCalledWith("debug");
    expect(mergeInheritedOptions).toHaveBeenCalled();
    expect(childLogger).toBeInstanceOf(Logger);
    expect(childLogger["scope"]).toEqual(["child"]);
    expect(childLogger["context"]).toEqual({ user: "test" });
  });

  it("should call assertValidLevel even if level is undefined", () => {
    logger.child({});
    expect(assertValidLevel).toHaveBeenCalledWith(undefined);
  });
});
