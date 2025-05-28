import { dispatchLog } from "../../../src/log-pipeline/dispatch";
import * as platformUtils from "../../../src/log-pipeline/dispatch/utils/resolve-platform";
import * as browserOutput from "../../../src/log-pipeline/output/browser";
import * as nodeOutput from "../../../src/log-pipeline/output/node";

describe("dispatchLog", () => {
  const basePayload = {
    id: "123",
    level: "info" as const,
    scope: ["core"],
    message: "Test log",
    meta: { a: 1 },
    context: { user: "alice" },
    outputConfig: {
      node: { hideDate: true },
      browser: { hideScope: true },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not log when level is 'silent'", () => {
    const spyNode = jest.spyOn(nodeOutput, "outputNodeLog");
    const spyBrowser = jest.spyOn(browserOutput, "outputBrowserLog");

    dispatchLog({
      ...basePayload,
      level: "silent",
    });

    expect(spyNode).not.toHaveBeenCalled();
    expect(spyBrowser).not.toHaveBeenCalled();
  });

  it("logs to node output when platform is node", () => {
    jest.spyOn(platformUtils, "resolvePlatform").mockReturnValue("node");
    const spy = jest
      .spyOn(nodeOutput, "outputNodeLog")
      .mockImplementation(() => {});

    dispatchLog(basePayload);

    expect(spy).toHaveBeenCalledWith({
      id: "123",
      level: "info",
      scope: ["core"],
      message: "Test log",
      meta: { a: 1 },
      context: { user: "alice" },
      nodeOutputConfig: { hideDate: true },
    });
  });

  it("logs to browser output when platform is browser", () => {
    jest.spyOn(platformUtils, "resolvePlatform").mockReturnValue("browser");
    const spy = jest
      .spyOn(browserOutput, "outputBrowserLog")
      .mockImplementation(() => {});

    dispatchLog(basePayload);

    expect(spy).toHaveBeenCalledWith({
      id: "123",
      level: "info",
      scope: ["core"],
      message: "Test log",
      meta: { a: 1 },
      context: { user: "alice" },
      browserOutputConfig: { hideScope: true },
    });
  });

  it("does not throw if outputConfig is undefined", () => {
    jest.spyOn(platformUtils, "resolvePlatform").mockReturnValue("node");
    const spy = jest
      .spyOn(nodeOutput, "outputNodeLog")
      .mockImplementation(() => {});

    expect(() =>
      dispatchLog({
        ...basePayload,
        outputConfig: undefined,
      }),
    ).not.toThrow();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        nodeOutputConfig: undefined,
      }),
    );
  });
});
