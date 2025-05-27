import type { OutputBrowserLogPayload } from "../../../../src/log-pipeline/output/browser/output-browser-log-types";
import { formatBrowserLog } from "../../../../src/log-pipeline/format/browser/format-browser-log";
import { outputBrowserLog } from "../../../../src/log-pipeline/output/browser";
import { resolveOutputConfig } from "../../../../src/log-pipeline/output/browser/utils/resolve-output-config";
import { validateOutputPayload } from "../../../../src/log-pipeline/output/utils/validate-output-payload";
import { printBrowserLog } from "../../../../src/log-pipeline/print/browser/print-browser-log";

jest.mock("../../../../src/log-pipeline/print/browser/print-browser-log");
jest.mock(
  "../../../../src/log-pipeline/output/browser/utils/resolve-output-config",
);
jest.mock("../../../../src/log-pipeline/output/utils/validate-output-payload");
jest.mock("../../../../src/log-pipeline/format/browser/format-browser-log");

const basePayload: OutputBrowserLogPayload = {
  id: "abc123",
  level: "info",
  context: "test",
  message: "Hello",
  meta: { foo: "bar" },
  browserOutputConfig: {},
};

const mockResolvedConfig = {
  hideDate: false,
  hideId: false,
  hideContext: false,
  contextSeparator: " > ",
  showOnlyLatestContext: false,
  messagePrefix: "",
  messageLineBreaks: 0,
  metaLineBreaks: 0,
  topLineBreaks: 0,
  bottomLineBreaks: 0,
  stringifyMeta: false,
  formatter: undefined,
};

describe("outputBrowserLog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (formatBrowserLog as jest.Mock).mockReturnValue(["%cHello", "color: red"]);
  });

  (global as { window: unknown }).window = {};

  it("does nothing if not in a browser environment", () => {
    const originalWindow = global.window;
    // @ts-expect-error mock node env
    delete global.window;
    outputBrowserLog(basePayload);
    expect(validateOutputPayload).not.toHaveBeenCalled();
    expect(formatBrowserLog).not.toHaveBeenCalled();
    expect(printBrowserLog).not.toHaveBeenCalled();
    global.window = originalWindow;
  });

  it("calls validateOutputPayload with correct args", () => {
    (resolveOutputConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: " > ",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      metaLineBreaks: 0,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
      stringifyMeta: false,
      formatter: undefined,
    });

    outputBrowserLog(basePayload);

    expect(validateOutputPayload).toHaveBeenCalledWith({
      level: "info",
      message: "Hello",
    });
  });

  it("formats log and prints to console", () => {
    (resolveOutputConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: " > ",
      showOnlyLatestContext: false,
      messagePrefix: "[log]",
      messageLineBreaks: 0,
      metaLineBreaks: 1,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
      stringifyMeta: false,
      formatter: undefined,
    });

    outputBrowserLog(basePayload);

    expect(printBrowserLog).toHaveBeenCalledWith({
      logArgs: ["%cHello\n", "color: red", basePayload.meta],
    });
  });

  it("stringifies meta as pretty JSON if stringifyMeta is 'pretty'", () => {
    (resolveOutputConfig as jest.Mock).mockReturnValue({
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: " > ",
      showOnlyLatestContext: false,
      messagePrefix: "[log]",
      messageLineBreaks: 0,
      metaLineBreaks: 1,
      topLineBreaks: 0,
      bottomLineBreaks: 0,
      stringifyMeta: "pretty",
      formatter: undefined,
    });

    outputBrowserLog(basePayload);

    expect(printBrowserLog).toHaveBeenCalledWith({
      logArgs: [
        "%cHello\n",
        "color: red",
        JSON.stringify(basePayload.meta, null, 2),
      ],
    });
  });

  it("skips meta if not provided", () => {
    const payloadWithoutMeta = { ...basePayload, meta: undefined };
    outputBrowserLog(payloadWithoutMeta);

    const args = (printBrowserLog as jest.Mock).mock.calls[0][0].logArgs;
    expect(args).not.toContain(undefined);
  });

  it("stringifies meta as compact JSON if stringifyMeta is true", () => {
    (resolveOutputConfig as jest.Mock).mockReturnValue({
      ...mockResolvedConfig,
      stringifyMeta: true,
      messageLineBreaks: 0,
    });

    outputBrowserLog(basePayload);

    expect(printBrowserLog).toHaveBeenCalledWith({
      logArgs: ["%cHello", "color: red", JSON.stringify(basePayload.meta)],
    });
  });

  it("silently ignores stringify errors", () => {
    const circular = {} as { self: unknown };
    circular.self = circular;

    const payloadWithCircularMeta = {
      ...basePayload,
      meta: circular,
    };

    (resolveOutputConfig as jest.Mock).mockReturnValue({
      ...mockResolvedConfig,
      stringifyMeta: true,
      messageLineBreaks: 0,
    });

    expect(() => outputBrowserLog(payloadWithCircularMeta)).not.toThrow();

    const args = (printBrowserLog as jest.Mock).mock.calls[0][0].logArgs;
    expect(args).not.toContain(expect.stringContaining("self"));
  });

  it("appends bottom line breaks if bottomLineBreaks is set", () => {
    (resolveOutputConfig as jest.Mock).mockReturnValue({
      ...mockResolvedConfig,
      bottomLineBreaks: 2,
    });

    outputBrowserLog(basePayload);

    const args = (printBrowserLog as jest.Mock).mock.calls[0][0].logArgs;
    expect(args[args.length - 1]).toBe("\n\n");
  });
});
