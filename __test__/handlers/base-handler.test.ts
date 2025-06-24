import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { RawPayload, NormalizedPayload } from "@/shared/types/log-payload";
import { BaseHandler } from "@/handlers/base-handler";

class TestHandler extends BaseHandler {
  public platform = "node" as const;
  async handle(): Promise<void> {
    // no-op
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
  normalizerConfig: {
    node: configForFields,
    browser: configForFields,
    edge: configForFields,
  },
  formatterConfig: {
    node: configForFields,
    browser: configForFields,
    edge: configForFields,
  },
} as { normalizerConfig: NormalizerConfig; formatterConfig: FormatterConfig };

describe("BaseHandler", () => {
  const mockRawPayload: RawPayload = {
    message: "test",
    level: "info",
    scope: ["test"],
    timestamp: 123123,
    normalizerConfig: mockConfigs.normalizerConfig,
    formatterConfig: mockConfigs.formatterConfig,
  } as RawPayload;

  describe("normalize()", () => {
    it("should return a normalized payload with given raw payload", async () => {
      const handler = new TestHandler(mockConfigs);
      const normalized = await handler["normalize"](mockRawPayload);
      expect(normalized).toMatchObject({
        message: "test",
        level: "INFO",
        scope: "test",
        timestamp: expect.any(String),
      });
    });
  });

  describe("format()", () => {
    it("should format normalized payload correctly", () => {
      const handler = new TestHandler({
        formatterConfig: {
          node: {
            timestamp: {
              prefix: "[LOG]",
              suffix: "[END]",
            },
          },
        } satisfies FormatterConfig,
      });

      const normalized: NormalizedPayload = {
        id: "abc123",
        timestamp: new Date().toISOString(),
        level: "info",
        pid: 1234,
        hostname: "localhost",
        scope: "test",
        message: "hello",
        meta: {},
        context: undefined,
        normalizerConfig: {},
        formatterConfig: handler["formatterConfig"],
        raw: { level: "info" },
      } as NormalizedPayload;

      const formatted = handler["format"](normalized);
      expect(typeof formatted.message).toBe("string");
      expect(formatted.formatterConfig).toBeDefined();
    });
  });

  describe("toJson()", () => {
    it("should convert raw payload to JSON string without normalization", async () => {
      const handler = new TestHandler();
      const json = await handler["toJson"](mockRawPayload);
      const parsed = JSON.parse(json);

      expect(parsed.message).toBe("test");
      expect(parsed.level).toBe("info");
      expect(parsed.scope).toEqual(["test"]);
    });

    it("should convert payload to JSON with normalization and indentation", async () => {
      const handler = new TestHandler(mockConfigs);
      const json = await handler["toJson"](mockRawPayload, {
        useNormalizer: true,
        space: 2,
      });

      expect(json.startsWith("{\n")).toBe(true);
      expect(json.endsWith("}\n")).toBe(true);
    });
  });
});
