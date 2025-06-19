import type { NodeFormattedPayload } from "@/modules/formatters";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";

describe("composeMessage", () => {
  const basePayload: NodeFormattedPayload = {
    timestamp: "",
    id: "",
    level: "",
    pid: "",
    hostname: "",
    scope: "",
    message: "",
    meta: "",
    context: "",
    normalizerConfig: {},
    formatterConfig: {},
    withAnsiStyle: {
      timestamp: "[2025-06-17 12:34:56]",
      id: "[logger-id]",
      level: "[INFO]",
      scope: "[main]",
      message: "Hello world",
      meta: {},
      context: {},
      pid: "[1234@host]",
      hostname: "[host]",
    },
    raw: {
      timestamp: 1,
      id: "",
      level: "debug",
      scope: [],
      message: "",
    },
  };

  it("should compose message with all fields and ANSI color", () => {
    const result = composeMessage(basePayload, true);
    expect(result).toBe(
      "[2025-06-17 12:34:56][logger-id][INFO][main]Hello world\n",
    );
  });

  it("should skip pid and hostname if raw flags are false", () => {
    const payload = {
      ...basePayload,
      withAnsiStyle: {
        ...basePayload.withAnsiStyle,
      },
      raw: {
        ...basePayload.raw,
        pid: 123,
        hostname: "asd",
      },
    };
    const result = composeMessage(payload, true);
    expect(result).toBe(
      "[2025-06-17 12:34:56][logger-id][INFO][1234@host][host][main]Hello world\n",
    );
  });

  it("should include meta and context if they are strings", () => {
    const payload: NodeFormattedPayload = {
      ...basePayload,
      withAnsiStyle: {
        ...basePayload.withAnsiStyle,
        meta: "[meta-info]",
        context: "[context-info]",
      },
    };
    const result = composeMessage(payload, true);
    expect(result).toBe(
      "[2025-06-17 12:34:56][logger-id][INFO][main]Hello world[meta-info][context-info]\n",
    );
  });

  it("should fallback to default payload if withAnsiStyle is false", () => {
    const rawPayload: NodeFormattedPayload = {
      ...basePayload,
      timestamp: "[TS]",
      id: "[ID]",
      level: "[LEVEL]",
      scope: "[scope]",
      message: "message",
      meta: {},
      context: {},
      pid: "[pid]",
      hostname: "[host]",
      raw: {
        ...basePayload.raw,
        pid: 123,
        hostname: "asd",
      },
    };
    const result = composeMessage(rawPayload, false);
    expect(result).toBe("[TS][ID][LEVEL][pid][host][scope]message\n");
  });
});
