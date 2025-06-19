import type { RawPayload } from "@/core/logger";
import type { AdditionOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { BrowserBaseHandler, type NormalizedPayload } from "@/index";

class MockNodeHandler extends BrowserBaseHandler {
  public lastFormatted?: unknown;

  async handle(rawPayload: RawPayload): Promise<void> {
    this.lastFormatted = await this.compose(rawPayload);
  }

  async callNormalize(rawPayload: RawPayload) {
    return this.normalize(rawPayload);
  }

  public async callMergeOptions(additions?: AdditionOptions) {
    return this.mergeInheritedOptions(additions);
  }

  async callFormat(normalized: NormalizedPayload) {
    return this.format(normalized);
  }

  public async callCompose(rawPayload: RawPayload) {
    return this.compose(rawPayload);
  }
}

const mockPayload = {
  level: "info",
  message: "Node test message",
  context: { service: "unit-test" },
  timestamp: Date.now(),
  scope: [],
  raw: { level: "info" },
} as unknown as RawPayload;

describe("BrowserBaseHandler", () => {
  it("should merge inherited options with overrides", async () => {
    const handler = new MockNodeHandler({
      formatterConfig: { node: { id: { prefix: "[Test]" } } },
    });

    const merged = await handler.callMergeOptions({
      formatterConfig: { node: { id: { suffix: "[End]" } } },
    });

    expect(merged.formatterConfig?.node?.id?.suffix).toBe("[End]");
    expect(merged.formatterConfig?.node?.id?.prefix).toBeUndefined();
  });

  it("should format normalized payload correctly", async () => {
    const handler = new MockNodeHandler();

    const normalized = await handler.callCompose(mockPayload);
    expect(typeof normalized).toBe("string");
    expect(normalized).toContain("Node test message");
  });

  it("should compose log message string", async () => {
    const handler = new MockNodeHandler();
    const output = await handler.callCompose(mockPayload);
    expect(typeof output).toBe("string");
    expect(output).toContain("Node test message");
  });

  it("should format normalized payload correctly", async () => {
    const handler = new MockNodeHandler();
    const normalizedPayload = await handler.callNormalize(mockPayload);
    const formatted = await handler.callFormat(normalizedPayload);
    expect(typeof formatted).toBe("object");
    expect(formatted.level).toBe("INFO ");
  });
});
