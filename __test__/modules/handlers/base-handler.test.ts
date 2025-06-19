import type { RawPayload } from "@/core/logger";
import type { AdditionOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import type { Platform } from "@/index";
import { BaseHandler } from "@/index";

class MockHandler extends BaseHandler {
  platform: Platform = "node";
  public lastNormalized?: unknown;

  async handle(rawPayload: RawPayload): Promise<void> {
    this.lastNormalized = await this.normalize(rawPayload);
  }

  public getBaseConfig(): unknown {
    return this.getNormalizerConfig();
  }

  public async callNormalize(rawPayload: RawPayload) {
    return this.normalize(rawPayload);
  }

  public async callToJson(
    rawPayload: RawPayload,
    options?: { space?: number },
  ) {
    return this.toJson(rawPayload, options);
  }

  public mergeTestOptions(additions?: AdditionOptions) {
    return this.mergeInheritedOptions(additions);
  }
}

const mockPayload = {
  level: "info",
  message: "Test message",
  context: { service: "unit-test" },
  timestamp: Date.now(),
  scope: [],
  raw: {},
} as unknown as RawPayload;

describe("BaseHandler", () => {
  it("should normalize raw payload", async () => {
    const handler = new MockHandler();
    const result = await handler.callNormalize(mockPayload);
    expect(result.level).toBe("INFO");
    expect(result.message).toBe("Test message");
  });

  it("should convert raw payload to JSON", async () => {
    const handler = new MockHandler();
    const json = await handler.callToJson(mockPayload, { space: 2 });
    expect(json).toContain('"message": "Test message"');
  });

  it("should normalize with custom normalizer config", async () => {
    const handler = new MockHandler({
      normalizerConfig: {
        node: { level: { style: "title" } },
      },
    });

    const result = await handler.callNormalize(mockPayload);
    expect(result.level).toBe("Info");
  });

  it("should fallback to default options when undefined is passed to toJson", async () => {
    const handler = new MockHandler();
    const result = await handler.callToJson(mockPayload, undefined);
    expect(typeof result).toBe("string");
    expect(result).toMatch(/"message":\s*"Test message"/);
  });

  it("should return base normalizer config from getter", () => {
    const handler = new MockHandler({
      normalizerConfig: { node: { level: { style: "upper" } } },
    });

    const config = handler.getBaseConfig() as {
      node: { level: { style: string } };
    };
    expect(config?.node?.level?.style).toBe("upper");
  });
});
