import type { RawPayload } from "@/core/logger";
import { BaseHandler } from "@/modules/handlers/base-handler";

class MockHandler extends BaseHandler {
  public lastMessage: string | null = null;

  async handle(rawPayload: RawPayload): Promise<void> {
    this.lastMessage = await this.compose(rawPayload);
  }
}

describe("BaseHandler", () => {
  const rawPayload: RawPayload = {
    timestamp: Date.now(),
    level: "info",
    message: "Hello, world",
    pid: process.pid,
    hostname: "localhost",
    scope: ["test"],
    id: "abc",
    context: {},
    meta: {},
    formatterConfig: {},
    normalizerConfig: { node: { level: { style: "lower" } } },
    raw: { timestamp: 0, id: "", level: "info", message: "", scope: ["test"] },
  };

  it("should compose a formatted message", async () => {
    const handler = new MockHandler();
    const message = await handler["compose"](rawPayload);
    expect(typeof message).toBe("string");
    expect(message).toContain("Hello, world");
  });

  it("should convert payload to JSON", async () => {
    const handler = new MockHandler();
    const json = await handler["toJson"](rawPayload, { space: 2 });
    expect(json).toContain('"message": "Hello, world"');
  });

  it("should normalize payload", async () => {
    const handler = new MockHandler();
    const normalized = await handler["normalize"](rawPayload);
    expect(normalized.message).toBe("Hello, world");
    expect(normalized.level).toBe("info");
  });

  it("should format normalized payload", async () => {
    const handler = new MockHandler();
    const normalized = await handler["normalize"](rawPayload);
    const formatted = handler["format"](normalized);
    expect(formatted.message).toBeDefined();
  });
});
