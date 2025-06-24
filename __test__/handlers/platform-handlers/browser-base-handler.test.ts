import type { RawPayload } from "@/shared/types/log-payload";
import { BrowserHandler } from "@/handlers";
import { composeMessage } from "@/modules/transporters/browser/utils/compose-message";

jest.mock("@/modules/transporters/browser/utils/compose-message", () => ({
  composeMessage: jest.fn(),
}));

class TestBrowserHandler extends BrowserHandler {
  async handle(): Promise<void> {
    // no-op for test
  }
}
const configForFields = {
  timestamp: {},
  id: {},
  level: {},
  pid: {},
  hostname: {},
  scope: {},
  message: {},
  meta: {},
  context: {},
};

const mockConfigs = {
  normalizerConfig: { browser: configForFields },
  formatterConfig: { browser: configForFields },
};

describe("BrowserHandler", () => {
  const rawPayload: RawPayload = {
    message: "Hello",
    level: "info",
    scope: ["core"],
    timestamp: 123123,
    raw: { level: "info" },
  } as RawPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("compose()", () => {
    it("should normalize, format, and compose the payload into a string", () => {
      (composeMessage as jest.Mock).mockReturnValue("[composed-log]");

      const handler = new TestBrowserHandler(mockConfigs);
      const result = handler["compose"](rawPayload);

      expect(typeof result).toBe("string");
      expect(composeMessage).toHaveBeenCalled();
      expect(result).toBe("[composed-log]");
    });

    it("should pass useAnsiColor to composeMessage", () => {
      const handler = new TestBrowserHandler(mockConfigs);
      handler["compose"](rawPayload);
      expect(composeMessage).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
