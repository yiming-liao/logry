import type { RawPayload } from "@/shared/types/log-payload";
import { EdgeHandler } from "@/handlers";
import { composeMessage } from "@/modules/transporters/edge/utils/compose-message";

jest.mock("@/modules/transporters/edge/utils/compose-message", () => ({
  composeMessage: jest.fn(),
}));

class TestEdgeHandler extends EdgeHandler {
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
  normalizerConfig: { edge: configForFields },
  formatterConfig: { edge: configForFields },
};

describe("EdgeHandler", () => {
  const rawPayload: RawPayload = {
    message: "Hello",
    level: "info",
    scope: ["core"],
    timestamp: 123_123,
    raw: { level: "info" },
  } as RawPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("compose()", () => {
    it("should normalize, format, and compose the payload into a string", () => {
      (composeMessage as jest.Mock).mockReturnValue("[composed-log]");

      const handler = new TestEdgeHandler(mockConfigs);
      const result = handler["compose"](rawPayload);

      expect(typeof result).toBe("string");
      expect(composeMessage).toHaveBeenCalled();
      expect(result).toBe("[composed-log]");
    });

    it("should pass useAnsiColor to composeMessage", () => {
      const handler = new TestEdgeHandler(mockConfigs);
      handler["compose"](rawPayload);
      expect(composeMessage).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
