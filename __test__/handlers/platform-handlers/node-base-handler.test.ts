import type { RawPayload } from "@/shared/types/log-payload";
import { NodeHandler } from "@/handlers";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";

jest.mock("@/modules/transporters/node/utils/compose-message", () => ({
  composeMessage: jest.fn(),
}));

class TestNodeHandler extends NodeHandler {
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
  normalizerConfig: { node: configForFields },
  formatterConfig: { node: configForFields },
};

describe("NodeHandler", () => {
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
    it("should normalize, format, and compose the payload into a string", async () => {
      (composeMessage as jest.Mock).mockReturnValue("[composed-log]");

      const handler = new TestNodeHandler(mockConfigs);
      const result = await handler["compose"](rawPayload);

      expect(typeof result).toBe("string");
      expect(composeMessage).toHaveBeenCalled();
      expect(result).toBe("[composed-log]");
    });

    it("should pass useAnsiColor to composeMessage", async () => {
      const handler = new TestNodeHandler(mockConfigs);
      await handler["compose"](rawPayload, true);
      expect(composeMessage).toHaveBeenCalledWith(expect.any(Object), true);
    });
  });
});
