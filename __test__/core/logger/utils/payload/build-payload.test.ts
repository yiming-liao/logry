import type { BuildPayloadOptions } from "@/core/logger/utils/payload/build-payload";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { internalError } from "@/internal";

jest.mock("@/internal/internal-error", () => ({
  internalError: jest.fn(() => ({ __error: true })),
}));

describe("buildPayload", () => {
  const base: BuildPayloadOptions = {
    level: "info" as const,
    id: "abc123",
    message: "Hello world",
    scope: ["core"],
    normalizerConfig: {},
    formatterConfig: {},
  };

  it("should return valid payload with required fields", () => {
    const payload = buildPayload(base);
    expect(payload).toMatchObject({
      level: "info",
      id: "abc123",
      message: "Hello world",
      scope: ["core"],
      normalizerConfig: {},
      formatterConfig: {},
      raw: expect.objectContaining({
        level: "info",
        id: "abc123",
        message: "Hello world",
        scope: ["core"],
      }),
    });
    expect(typeof payload.timestamp).toBe("number");
  });

  it("should use provided timestamp if given", () => {
    const payload = buildPayload({ ...base, timestamp: 9999 });
    expect(payload.timestamp).toBe(9999);
  });

  it("should call internalError if message is empty", () => {
    const payload = buildPayload({ ...base, message: "   " });
    expect(internalError).toHaveBeenCalledWith({
      message: "Message is required and cannot be empty.",
    });
    expect(payload).toEqual({ __error: true });
  });

  it("should handle optional meta and context", () => {
    const payload = buildPayload({
      ...base,
      meta: { foo: "bar" },
      context: { user: "123" },
    });
    expect(payload.meta).toEqual({ foo: "bar" });
    expect(payload.context).toEqual({ user: "123" });
  });
});
