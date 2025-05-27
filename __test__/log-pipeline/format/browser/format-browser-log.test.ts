import { formatBrowserLog } from "../../../../src/log-pipeline/format/browser/format-browser-log";
import { composeLogLine } from "../../../../src/log-pipeline/format/browser/utils/compose-log-line";
import { composeLogStyles } from "../../../../src/log-pipeline/format/browser/utils/compose-log-styles";

jest.mock("../../../../src/log-pipeline/format/utils/format-timestamp", () => ({
  formatTimestamp: (hideDate: boolean) =>
    hideDate ? "" : "2025-01-01 12:00:00",
}));

jest.mock(
  "../../../../src/log-pipeline/format/browser/utils/compose-log-line",
  () => ({
    composeLogLine: jest.fn(
      () => "%c2025-01-01 12:00:00%cID123%cINFO %capp%cHello World",
    ),
  }),
);

jest.mock(
  "../../../../src/log-pipeline/format/browser/utils/compose-log-styles",
  () => ({
    composeLogStyles: jest.fn(() => [
      "style1",
      "style2",
      "style3",
      "style4",
      "style5",
    ]),
  }),
);

jest.mock("../../../../src/utils/context-encoder", () => ({
  contextEncoder: {
    displayContext: (context: string, separator: string) => ({
      fullContext: context,
      lastContext: context.split(separator).pop() || "",
    }),
  },
}));

describe("formatBrowserLog", () => {
  it("should use custom formatter if provided", () => {
    const formatter = jest.fn(() => ["custom log"]);
    const result = formatBrowserLog({
      id: "ID123",
      level: "info",
      context: "app>main",
      message: "Hello",
      meta: {},
      formatter,
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ">",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
    });

    expect(formatter).toHaveBeenCalled();
    expect(result).toEqual(["custom log"]);
  });

  it("should return default formatted log line and styles", () => {
    const result = formatBrowserLog({
      id: "ID123",
      level: "info",
      context: "app>main",
      message: "Hello World",
      meta: {},
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ">",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 0,
    });

    expect(composeLogLine).toHaveBeenCalledWith({
      timestamp: "2025-01-01 12:00:00",
      id: "ID123",
      level: "INFO ",
      context: "app>main",
      message: "Hello World",
      messagePrefix: "",
      linesBeforeMessage: "",
    });

    expect(composeLogStyles).toHaveBeenCalledWith({
      level: "info",
      showId: true,
      showContext: true,
    });
    expect(result[0]).toBe(
      "%c2025-01-01 12:00:00%cID123%cINFO %capp%cHello World",
    );
    expect(result.slice(1)).toEqual([
      "style1",
      "style2",
      "style3",
      "style4",
      "style5",
    ]);
  });

  it("should hide ID and context when specified", () => {
    formatBrowserLog({
      id: "ID123",
      level: "debug",
      context: "debug>context",
      message: "Message",
      meta: {},
      hideDate: false,
      hideId: true,
      hideContext: true,
      contextSeparator: ">",
      showOnlyLatestContext: false,
      messagePrefix: "",
      messageLineBreaks: 1,
    });

    expect(composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "",
        messagePrefix: "",
        linesBeforeMessage: "\n",
      }),
    );

    expect(composeLogStyles).toHaveBeenCalledWith({
      level: "debug",
      showId: false,
      showContext: false,
    });
  });

  it("should use last context only when showOnlyLatestContext is true", () => {
    formatBrowserLog({
      id: "ID456",
      level: "warn",
      context: "main>sub>inner",
      message: "Context test",
      meta: {},
      hideDate: false,
      hideId: false,
      hideContext: false,
      contextSeparator: ">",
      showOnlyLatestContext: true,
      messagePrefix: "",
      messageLineBreaks: 0,
    });

    expect(composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        context: "inner",
      }),
    );
  });
});
