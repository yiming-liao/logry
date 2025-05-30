import type { NodeFormattedPayload } from "@/modules/formatters";
import { composeConsoleMessage } from "@/modules/transporters/node/utils/compose-console-message";

describe("composeConsoleMessage", () => {
  it("should compose message with all fields present", () => {
    const payload = {
      timestamp: "[2025-06-07T12:00:00Z]",
      id: "[abc123]",
      level: "[INFO]",
      scope: "[app]",
      message: "Server started",
      meta: "[meta-info]",
      context: "[ctx]",
    } as NodeFormattedPayload;

    const result = composeConsoleMessage(payload, "[pid]", "[host]");

    expect(result).toBe(
      "[2025-06-07T12:00:00Z][abc123][INFO][pid][host][app]Server started[meta-info][ctx]\n",
    );
  });

  it("should omit meta if not a string", () => {
    const payload = {
      timestamp: "[t]",
      id: "[id]",
      level: "[L]",
      scope: "[s]",
      message: "m",
      meta: { a: 1 },
      context: "[ctx]",
    } as unknown as NodeFormattedPayload;

    const result = composeConsoleMessage(payload, "[pid]", "[host]");

    expect(result).toBe("[t][id][L][pid][host][s]m[ctx]\n");
  });

  it("should omit context if not a string", () => {
    const payload = {
      timestamp: "[t]",
      id: "[id]",
      level: "[L]",
      scope: "[s]",
      message: "m",
      meta: "[meta]",
      context: { b: 2 },
    } as unknown as NodeFormattedPayload;

    const result = composeConsoleMessage(payload, "[pid]", "[host]");

    expect(result).toBe("[t][id][L][pid][host][s]m[meta]\n");
  });

  it("should compose base parts when meta and context are missing", () => {
    const payload = {
      timestamp: "[t]",
      id: "[id]",
      level: "[L]",
      scope: "[s]",
      message: "m",
    } as NodeFormattedPayload;

    const result = composeConsoleMessage(payload, "[pid]", "[host]");

    expect(result).toBe("[t][id][L][pid][host][s]m\n");
  });
});
