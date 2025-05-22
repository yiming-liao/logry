import { logry } from "../../src/factory";
import { resetCoreMap } from "../../src/factory/reset-core-map";

describe("resetLoggerFactory", () => {
  it("should reset the logger factory and remove all logger cores", () => {
    const logger1 = logry({ id: "reset-test" });

    resetCoreMap();

    const logger2 = logry({ id: "reset-test" });

    expect(logger1["core"]).not.toBe(logger2["core"]);
  });
});
