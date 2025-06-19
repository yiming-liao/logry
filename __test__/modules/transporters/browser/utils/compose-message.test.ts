import type { BrowserFormattedPayload } from "@/modules/formatters";
import { composeMessage } from "@/modules/transporters/browser/utils/compose-message";

describe("composeMessage", () => {
  it("should return empty string if all fields are empty", () => {
    const payload = {
      timestamp: "",
      id: "",
      level: "",
      scope: "",
      message: "",
      meta: "",
      context: "",
      formatterConfig: {
        browser: {
          lineBreaksBefore: 0,
        },
      },
    } as BrowserFormattedPayload;

    expect(composeMessage(payload)).toBe("");
  });

  it("should apply line breaks before message", () => {
    const payload = {
      timestamp: "2025-06-19 10:00:00",
      id: "",
      level: "",
      scope: "",
      message: "Hello",
      meta: "",
      context: "",
      formatterConfig: {
        browser: {
          lineBreaksBefore: 2,
        },
      },
    } as BrowserFormattedPayload;

    expect(composeMessage(payload)).toBe("\n\n%c2025-06-19 10:00:00%cHello");
  });

  it("should format all non-empty fields with %c prefix", () => {
    const payload = {
      timestamp: "2025-06-19 10:00:00",
      id: "logger",
      level: "INFO",
      scope: "app",
      message: "Loaded",
      meta: "user=123",
      context: "env=prod",
      formatterConfig: {
        browser: {
          lineBreaksBefore: 1,
        },
      },
    } as BrowserFormattedPayload;

    const result = composeMessage(payload);
    expect(result).toBe(
      "\n%c2025-06-19 10:00:00%clogger%cINFO%capp%cLoaded%cuser=123%cenv=prod",
    );
  });

  it("should skip non-string fields", () => {
    const payload = {
      timestamp: "2025-06-19 10:00:00",
      id: 123,
      level: null,
      scope: undefined,
      message: "Test",
      meta: "",
      context: false,
      formatterConfig: {
        browser: { lineBreaksBefore: 0 },
      },
    } as unknown as BrowserFormattedPayload;

    expect(composeMessage(payload)).toBe("%c2025-06-19 10:00:00%cTest");
  });

  it("should skip empty string fields", () => {
    const payload = {
      timestamp: "",
      id: "",
      level: "",
      scope: "",
      message: "",
      meta: "",
      context: "",
      formatterConfig: {
        browser: { lineBreaksBefore: 0 },
      },
    } as BrowserFormattedPayload;

    expect(composeMessage(payload)).toBe("");
  });
});
