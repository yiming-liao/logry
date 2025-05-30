import type { BrowserFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import { BrowserFormatter } from "@/modules/formatters/browser/browser-formatter";

describe("BrowserFormatter", () => {
  it("should format all log parts correctly", () => {
    const formatter = new BrowserFormatter();

    const mockPayload: NormalizedPayload = {
      timestamp: "2025-06-07T10:00:00Z",
      id: "id123",
      level: "info",
      scope: "app",
      message: "test message",
      meta: { user: "alice" },
      context: { session: "xyz" },
      normalizerConfig: {},
      formatterConfig: {
        browser: {
          timestamp: { hide: false },
          id: {},
          level: {},
          scope: {},
          message: {},
          meta: {},
          context: {},
        },
      },
      raw: {
        scope: [],
        timestamp: 0,
        id: "",
        level: "silent",
        message: "",
      },
    };

    const result = formatter.format(mockPayload) as BrowserFormattedPayload;

    expect(result.timestamp).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.level).toBeDefined();
    expect(result.scope).toBeDefined();
    expect(result.message).toBeDefined();
    expect(result.meta).toBeDefined();
    expect(result.context).toBeDefined();
    expect(result.cssStyles).toBeDefined();
  });

  it("should handle missing formatterConfig.browser safely", () => {
    const formatter = new BrowserFormatter();

    const mockPayload: NormalizedPayload = {
      timestamp: "2025-06-07T10:00:00Z",
      id: "id123",
      level: "info",
      scope: "app",
      message: "test message",
      meta: { user: "alice" },
      context: { session: "xyz" },
      normalizerConfig: {},
      formatterConfig: {},
      raw: {
        scope: [],
        timestamp: 0,
        id: "",
        level: "silent",
        message: "",
      },
    };

    expect(() => formatter.format(mockPayload)).not.toThrow();
  });
});
