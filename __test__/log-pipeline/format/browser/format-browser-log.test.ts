import { LOG_LEVELS_UPPERCASE } from "../../../../src/constants";
import { formatBrowserLog } from "../../../../src/log-pipeline/format/browser";
import * as composeLogLineModule from "../../../../src/log-pipeline/format/browser/utils/compose-log-line";
import * as composeLogStylesModule from "../../../../src/log-pipeline/format/browser/utils/compose-log-styles";
import * as formatScopeModule from "../../../../src/log-pipeline/format/utils/format-scope";
import * as formatTimestampModule from "../../../../src/log-pipeline/format/utils/format-timestamp";

describe("formatBrowserLog", () => {
  const defaultPayload = {
    id: "abc123",
    level: "info" as const,
    scope: ["test"],
    message: "Hello browser",
    meta: { foo: "bar" },
    context: { user: "alice" },
    hideDate: false,
    hideId: false,
    hideScope: false,
    scopeSeparator: ":",
    showOnlyLatestScope: false,
    messagePrefix: ">> ",
    messageLineBreaks: 1,
    formatter: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(formatScopeModule, "formatScope")
      .mockReturnValue({ scopeString: "test", lastScope: "test" });

    jest
      .spyOn(formatTimestampModule, "formatTimestamp")
      .mockImplementation(() => "2025-01-01 00:00:00");

    jest
      .spyOn(composeLogLineModule, "composeLogLine")
      .mockReturnValue("formatted log");

    jest
      .spyOn(composeLogStylesModule, "composeLogStyles")
      .mockReturnValue(["%c style 1", "%c style 2"]);
  });

  it("returns formatted string and styles", () => {
    const result = formatBrowserLog(defaultPayload);

    expect(result[0]).toBe("formatted log");
    expect(result[1]).toBe("%c style 1");
    expect(result[2]).toBe("%c style 2");

    expect(composeLogLineModule.composeLogLine).toHaveBeenCalledWith({
      timestamp: "2025-01-01 00:00:00",
      id: "abc123",
      level: LOG_LEVELS_UPPERCASE.info.padEnd(5),
      scope: "test",
      message: "Hello browser",
      messagePrefix: ">> ",
      linesBeforeMessage: "\n",
    });

    expect(composeLogStylesModule.composeLogStyles).toHaveBeenCalledWith({
      level: "info",
      showId: true,
      showContext: true,
    });
  });

  it("omits id and scope if hidden", () => {
    formatBrowserLog({
      ...defaultPayload,
      hideId: true,
      hideScope: true,
    });

    expect(composeLogLineModule.composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "",
        scope: "",
      }),
    );
  });

  it("uses only latest scope if specified", () => {
    formatBrowserLog({
      ...defaultPayload,
      showOnlyLatestScope: true,
    });

    expect(formatScopeModule.formatScope).toHaveBeenCalledWith(["test"], ":");
  });

  it("respects line breaks before message", () => {
    formatBrowserLog({
      ...defaultPayload,
      messageLineBreaks: 3,
    });

    expect(composeLogLineModule.composeLogLine).toHaveBeenCalledWith(
      expect.objectContaining({
        linesBeforeMessage: "\n\n\n",
      }),
    );
  });

  it("uses custom formatter when provided", () => {
    const mockFormatter = jest.fn().mockReturnValue(["custom result"]);
    const result = formatBrowserLog({
      ...defaultPayload,
      formatter: mockFormatter,
    });

    expect(mockFormatter).toHaveBeenCalledWith(
      expect.objectContaining({
        timestamp: "2025-01-01 00:00:00",
        id: "abc123",
        level: "info",
        scope: "test",
        message: "Hello browser",
        meta: { foo: "bar" },
        context: { user: "alice" },
      }),
    );
    expect(result).toEqual(["custom result"]);
  });
});
