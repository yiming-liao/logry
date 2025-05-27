import { DEFAULT_NODE_LEVEL_COLOR_CODE } from "../../../../src/constants";
import { formatNodeLog } from "../../../../src/log-pipeline/format/node/format-node-log";
import { composeLogLine } from "../../../../src/log-pipeline/format/node/utils/compose-log-line";
import { contextEncoder } from "../../../../src/utils/context-encoder";

jest.mock("../../../../src/log-pipeline/format/node/utils/compose-log-line");
jest.mock("../../../../src/utils/context-encoder");
jest.mock("../../../../src/log-pipeline/format/utils/format-timestamp", () => ({
  formatTimestamp: jest.fn(() => "2025-05-25T12:00:00Z"),
}));

describe("formatNodeLog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns formatted string using composeLogLine without color", () => {
    (contextEncoder.displayContext as jest.Mock).mockReturnValue({
      fullContext: "app.module",
      lastContext: "module",
    });

    (composeLogLine as jest.Mock).mockReturnValue("COMPOSED_LOG_LINE");

    const log = formatNodeLog({
      id: "123",
      level: "info",
      context: "app.module",
      message: "Test message",
      meta: null,
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ".",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 1,
      useColor: false,
      formatter: undefined,
    });

    expect(log).toBe("COMPOSED_LOG_LINE");

    expect(contextEncoder.displayContext).toHaveBeenCalledWith(
      "app.module",
      ".",
    );
    expect(composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        timestampTag: "[2025-05-25T12:00:00Z] ",
        idTag: "[123] ",
        levelTag: "[INFO]  ",
        contextTag: "(app.module) ",
        linesBeforeMessage: "\n",
        messageLine: "Test message ",
      }),
      false,
      expect.any(Number),
    );
  });

  it("uses only latest context if flag is true", () => {
    (contextEncoder.displayContext as jest.Mock).mockReturnValue({
      fullContext: "app.module",
      lastContext: "module",
    });

    (composeLogLine as jest.Mock).mockReturnValue("COMPOSED_LINE_LATEST");

    const log = formatNodeLog({
      id: "123",
      level: "warn",
      context: "app.module",
      message: "Warning message",
      meta: null,
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ".",
      showOnlyLatestContext: true,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: true,
      formatter: undefined,
    });

    expect(log).toBe("COMPOSED_LINE_LATEST");

    expect(composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        contextTag: "(module) ",
      }),
      true,
      expect.any(Number),
    );
  });

  it("calls custom formatter if provided", () => {
    const customFormatter = jest.fn(() => "CUSTOM_FORMATTED");

    const result = formatNodeLog({
      id: "id",
      level: "error",
      context: "ctx",
      message: "msg",
      meta: { some: "meta" },
      hideDate: true,
      hideId: true,
      hideContext: true,
      contextSeparator: ".",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: false,
      formatter: customFormatter,
    });

    expect(customFormatter).toHaveBeenCalledWith({
      timestamp: "2025-05-25T12:00:00Z",
      id: "id",
      level: "error",
      context: "app.module",
      message: "msg",
      meta: { some: "meta" },
    });

    expect(result).toBe("CUSTOM_FORMATTED");
  });

  it("omits [id] tag when id is an empty string", () => {
    const output = formatNodeLog({
      id: "",
      level: "info",
      context: "ctx",
      message: "no id",
      meta: {},
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ":",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: false,
    });

    expect(output).not.toContain("[]");
    expect(output).not.toContain("[ ]");
    expect(output).not.toMatch(/\[\s*\]/);
  });

  it("uses DEFAULT_NODE_LEVEL_COLOR_CODE if level is unknown", () => {
    (composeLogLine as jest.Mock).mockReturnValue("MOCK_LINE");

    formatNodeLog({
      id: "123",
      level: "unknown-level" as "error",
      context: "app",
      message: "fallback color",
      meta: {},
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ":",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: true,
    });

    const expectedColorCode = DEFAULT_NODE_LEVEL_COLOR_CODE;

    expect(composeLogLine).toHaveBeenCalledWith(
      expect.any(Object),
      true,
      expectedColorCode,
    );
  });

  it("falls back to useColor: false when undefined", () => {
    const output = formatNodeLog({
      id: "no-color",
      level: "warn",
      context: "test",
      message: "should not be colored",
      meta: {},
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ":",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: undefined as unknown as boolean,
    });

    // eslint-disable-next-line no-control-regex
    expect(output).not.toMatch(/\x1b\[\d+m/);
  });

  it("omits contextTag when context is an empty string", () => {
    (contextEncoder.displayContext as jest.Mock).mockReturnValue({
      fullContext: "",
      lastContext: "",
    });

    (composeLogLine as jest.Mock).mockReturnValue("LINE_WITHOUT_CONTEXT");

    const log = formatNodeLog({
      id: "1",
      level: "info",
      context: "",
      message: "no context",
      meta: null,
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ".",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
      useColor: false,
    });

    expect(log).toBe("LINE_WITHOUT_CONTEXT");

    expect(composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        contextTag: "",
      }),
      false,
      expect.any(Number),
    );
  });
});
