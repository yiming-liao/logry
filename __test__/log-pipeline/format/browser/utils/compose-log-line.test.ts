import { composeLogLine } from "../../../../../src/log-pipeline/format/browser/utils/compose-log-line";

describe("composeLogLine", () => {
  it("should return a formatted log string with line breaks and messagePrefix", () => {
    const log = composeLogLine({
      timestamp: "2025-05-26T12:00:00Z",
      id: "1234",
      level: "info",
      context: "app",
      message: "Server started",
      messagePrefix: "→ ",
      linesBeforeMessage: "\n\n",
    });

    expect(log).toBe(
      `%c2025-05-26T12:00:00Z%c1234%cinfo%capp%c\n\n→ Server started`,
    );
  });

  it("should return correct format with zero line breaks and no messagePrefix", () => {
    const log = composeLogLine({
      timestamp: "2025-05-26T12:00:00Z",
      id: "5678",
      level: "error",
      context: "auth",
      message: "Login failed",
      messagePrefix: "",
      linesBeforeMessage: "",
    });

    expect(log).toBe(`%c2025-05-26T12:00:00Z%c5678%cerror%cauth%cLogin failed`);
  });

  it("should handle multiple line breaks and empty message", () => {
    const log = composeLogLine({
      timestamp: "2025-05-26T12:00:00Z",
      id: "91011",
      level: "warn",
      context: "system",
      message: "",
      messagePrefix: "⚠ ",
      linesBeforeMessage: "\n\n\n",
    });

    expect(log).toBe(`%c2025-05-26T12:00:00Z%c91011%cwarn%csystem%c\n\n\n⚠ `);
  });
});
