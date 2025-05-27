import type { LogPayload } from "../../../src/types";
import { dispatchLog } from "../../../src/log-pipeline/dispatch/dispatch-log";
import { resolvePlatform } from "../../../src/log-pipeline/dispatch/utils/resolve-platform";
import { outputBrowserLog } from "../../../src/log-pipeline/output/browser";
import { outputNodeLog } from "../../../src/log-pipeline/output/node";

jest.mock("../../../src/log-pipeline/dispatch/utils/resolve-platform", () => ({
  resolvePlatform: jest.fn(),
}));
jest.mock("../../../src/log-pipeline/output/browser", () => ({
  outputBrowserLog: jest.fn(),
}));
jest.mock("../../../src/log-pipeline/output/node", () => ({
  outputNodeLog: jest.fn(),
}));

describe("dispatchLog", () => {
  const dummyPayload = {
    id: "123",
    level: "info",
    context: "test",
    message: "hello",
    meta: {},
    outputConfig: {
      node: { foo: "bar" },
      browser: { baz: "qux" },
    },
  } as LogPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not log if level is 'silent'", () => {
    dispatchLog({ ...dummyPayload, level: "silent" });

    expect(outputNodeLog).not.toHaveBeenCalled();
    expect(outputBrowserLog).not.toHaveBeenCalled();
  });

  it("logs with outputNodeLog when platform is 'node'", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("node");
    (outputNodeLog as jest.Mock).mockImplementation(() => {});
    dispatchLog(dummyPayload);

    expect(outputNodeLog).toHaveBeenCalledWith({
      id: dummyPayload.id,
      level: dummyPayload.level,
      context: dummyPayload.context,
      message: dummyPayload.message,
      meta: dummyPayload.meta,
      nodeOutputConfig: dummyPayload.outputConfig?.node,
    });
    expect(outputBrowserLog).not.toHaveBeenCalled();
  });

  it("logs with outputBrowserLog when platform is 'browser'", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("browser");
    (outputBrowserLog as jest.Mock).mockImplementation(() => {});
    dispatchLog(dummyPayload);

    expect(outputBrowserLog).toHaveBeenCalledWith({
      id: dummyPayload.id,
      level: dummyPayload.level,
      context: dummyPayload.context,
      message: dummyPayload.message,
      meta: dummyPayload.meta,
      browserOutputConfig: dummyPayload.outputConfig?.browser,
    });
    expect(outputNodeLog).not.toHaveBeenCalled();
  });

  it("logs with outputNodeLog when outputConfig is undefined", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("node");
    const spyNode = (outputNodeLog as jest.Mock).mockImplementation(() => {});
    const spyBrowser = outputBrowserLog;

    const payloadWithoutOutputConfig = {
      ...dummyPayload,
      outputConfig: undefined,
    };

    dispatchLog(payloadWithoutOutputConfig);

    expect(spyNode).toHaveBeenCalledWith({
      id: payloadWithoutOutputConfig.id,
      level: payloadWithoutOutputConfig.level,
      context: payloadWithoutOutputConfig.context,
      message: payloadWithoutOutputConfig.message,
      meta: payloadWithoutOutputConfig.meta,
      nodeOutputConfig: undefined,
    });
    expect(spyBrowser).not.toHaveBeenCalled();
  });

  it("logs with outputNodeLog when outputConfig.node is undefined (empty outputConfig)", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("node");
    const spyNode = (outputNodeLog as jest.Mock).mockImplementation(() => {});
    const spyBrowser = outputBrowserLog;

    const payloadWithEmptyOutputConfig = { ...dummyPayload, outputConfig: {} };

    dispatchLog(payloadWithEmptyOutputConfig);

    expect(spyNode).toHaveBeenCalledWith({
      id: payloadWithEmptyOutputConfig.id,
      level: payloadWithEmptyOutputConfig.level,
      context: payloadWithEmptyOutputConfig.context,
      message: payloadWithEmptyOutputConfig.message,
      meta: payloadWithEmptyOutputConfig.meta,
      nodeOutputConfig: undefined,
    });
    expect(spyBrowser).not.toHaveBeenCalled();
  });

  it("logs with outputBrowserLog when outputConfig is undefined", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("browser");
    const spyNode = outputNodeLog;
    const spyBrowser = (outputBrowserLog as jest.Mock).mockImplementation(
      () => {},
    );

    const payloadWithoutOutputConfig = {
      ...dummyPayload,
      outputConfig: undefined,
    };

    dispatchLog(payloadWithoutOutputConfig);

    expect(spyBrowser).toHaveBeenCalledWith({
      id: payloadWithoutOutputConfig.id,
      level: payloadWithoutOutputConfig.level,
      context: payloadWithoutOutputConfig.context,
      message: payloadWithoutOutputConfig.message,
      meta: payloadWithoutOutputConfig.meta,
      browserOutputConfig: undefined,
    });
    expect(spyNode).not.toHaveBeenCalled();
  });

  it("logs with outputBrowserLog when outputConfig.browser is undefined (empty outputConfig)", () => {
    (resolvePlatform as jest.Mock).mockReturnValue("browser");
    const spyNode = outputNodeLog;
    const spyBrowser = (outputBrowserLog as jest.Mock).mockImplementation(
      () => {},
    );

    const payloadWithEmptyOutputConfig = { ...dummyPayload, outputConfig: {} };

    dispatchLog(payloadWithEmptyOutputConfig);

    expect(spyBrowser).toHaveBeenCalledWith({
      id: payloadWithEmptyOutputConfig.id,
      level: payloadWithEmptyOutputConfig.level,
      context: payloadWithEmptyOutputConfig.context,
      message: payloadWithEmptyOutputConfig.message,
      meta: payloadWithEmptyOutputConfig.meta,
      browserOutputConfig: undefined,
    });
    expect(spyNode).not.toHaveBeenCalled();
  });
});
