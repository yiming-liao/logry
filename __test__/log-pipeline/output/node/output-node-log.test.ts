import type { OutputNodeLogPayload } from "../../../../src/log-pipeline/output/node/output-node-log-types";
import { formatMeta } from "../../../../src/log-pipeline/format/node/format-meta";
import { formatNodeLog } from "../../../../src/log-pipeline/format/node/format-node-log";
import { outputNodeLog } from "../../../../src/log-pipeline/output/node";
import { resolveOutputConfig } from "../../../../src/log-pipeline/output/node/utils/resolve-output-config";
import { validateOutputPayload } from "../../../../src/log-pipeline/output/utils/validate-output-payload";
import { printNodeLog } from "../../../../src/log-pipeline/print/node/print-node-log";

jest.mock(
  "../../../../src/log-pipeline/output/node/utils/resolve-output-config",
);
jest.mock("../../../../src/log-pipeline/format/node/format-node-log");
jest.mock("../../../../src/log-pipeline/output/utils/validate-output-payload");
jest.mock("../../../../src/log-pipeline/print/node/print-node-log");
jest.mock("../../../../src/log-pipeline/format/node/format-meta");

describe("outputNodeLog", () => {
  const basePayload: OutputNodeLogPayload = {
    id: "123",
    level: "info",
    scope: ["app"],
    message: "Hello",
    meta: { user: "amy" },
    nodeOutputConfig: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error mock node env
    delete global.window;

    (resolveOutputConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideScope: false,
      scopeSeparator: " > ",
      showOnlyLatestScope: false,
      messagePrefix: "[log]",
      messageLineBreaks: 1,
      metaLineBreaks: 1,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
      stringifyMeta: false,
      metaDepth: 2,
      topBorder: false,
      bottomBorder: false,
      useColor: false,
      formatter: undefined,
    });

    (formatNodeLog as jest.Mock).mockReturnValue("log line");
    (formatMeta as jest.Mock).mockImplementation((meta) => meta);
    (printNodeLog as jest.Mock).mockImplementation(() => {});
    (validateOutputPayload as jest.Mock).mockImplementation(() => {});
  });

  it("calls validateOutputPayload with correct args", () => {
    outputNodeLog(basePayload);
    expect(validateOutputPayload).toHaveBeenCalledWith({
      level: "info",
      message: "Hello",
    });
  });

  it("calls formatNodeLog and printNodeLog", () => {
    outputNodeLog(basePayload);
    expect(formatNodeLog).toHaveBeenCalled();
    expect(printNodeLog).toHaveBeenCalledWith(
      expect.objectContaining({
        logLine: "log line",
      }),
    );
  });

  it("skips output when in browser", () => {
    const originalWindow = global.window;
    // @ts-expect-error: for browser env
    global.window = {};

    outputNodeLog(basePayload);

    expect(formatNodeLog).not.toHaveBeenCalled();
    expect(printNodeLog).not.toHaveBeenCalled();

    global.window = originalWindow;
  });

  it("stringifies meta when stringifyMeta is true", () => {
    const meta = { user: "amy" };
    const stringified = JSON.stringify(meta);

    (resolveOutputConfig as jest.Mock).mockReturnValue({
      ...resolveOutputConfig(),
      stringifyMeta: true,
      metaLineBreaks: 1,
    });

    (formatMeta as jest.Mock).mockReturnValue(meta);

    outputNodeLog({ ...basePayload, meta });

    expect(printNodeLog).toHaveBeenCalledWith(
      expect.objectContaining({
        logLine: expect.stringContaining(stringified),
      }),
    );
  });

  it("does not throw when JSON.stringify fails", () => {
    const circular = {} as { self: unknown };
    circular.self = circular;

    (resolveOutputConfig as jest.Mock).mockReturnValue({
      ...resolveOutputConfig(),
      stringifyMeta: true,
      metaLineBreaks: 1,
    });

    expect(() =>
      outputNodeLog({ ...basePayload, meta: circular }),
    ).not.toThrow();
  });

  it("appends pretty stringified meta when stringifyMeta is 'pretty'", () => {
    const payloadWithMeta = {
      ...basePayload,
      meta: { foo: "bar", nested: { a: 1 } },
    };

    (resolveOutputConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideScope: false,
      scopeSeparator: " > ",
      showOnlyLatestScope: false,
      messagePrefix: "[log]",
      messageLineBreaks: 1,
      metaLineBreaks: 1,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
      stringifyMeta: "pretty",
      metaDepth: 2,
      topBorder: false,
      bottomBorder: false,
      useColor: false,
      formatter: undefined,
    });

    (formatNodeLog as jest.Mock).mockReturnValue("log line");
    (formatMeta as jest.Mock).mockImplementation((meta) => meta);

    outputNodeLog(payloadWithMeta);

    const expectedMetaString = JSON.stringify(payloadWithMeta.meta, null, 2);
    const expectedLogLine = "log line\n" + expectedMetaString;

    expect(printNodeLog).toHaveBeenCalledWith(
      expect.objectContaining({
        logLine: expectedLogLine,
      }),
    );
  });
});
