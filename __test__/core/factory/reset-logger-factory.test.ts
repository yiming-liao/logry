import { resetCoreMap, getOrCreateLogger } from "@/core/factory";

describe("resetLoggerFactory", () => {
  it("should reset the logger factory and remove all logger cores", () => {
    const logger1 = getOrCreateLogger({ id: "reset-test" });

    resetCoreMap();

    const logger2 = getOrCreateLogger({ id: "reset-test" });

    expect(logger1["core"]).not.toBe(logger2["core"]);
  });
});
