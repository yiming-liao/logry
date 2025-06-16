import type { BrowserFormattedPayload } from "@/modules/formatters";
import { composeMessage } from "@/modules/transporters/browser/utils/compose-message";

describe("composeMessage", () => {
  it("should return base message with meta and context if both are strings", () => {
    const payload: BrowserFormattedPayload = {
      timestamp: "12:00",
      id: "abc123",
      level: "info",
      scope: "app",
      message: "hello world",
      meta: " [meta]",
      context: " [ctx]",
      formatterConfig: {},
      normalizerConfig: {},
      raw: { timestamp: 0, id: "", level: "info", scope: [], message: "" },
      cssStyles: {
        timestamp: "",
        id: "",
        level: "",
        scope: "",
        message: "",
        meta: "",
        context: "",
      },
    };

    const result = composeMessage(payload);
    expect(result).toBe("%c12:00%cabc123%cinfo%capp%chello world [meta] [ctx]");
  });

  it("should exclude meta if it is not a string", () => {
    const payload: BrowserFormattedPayload = {
      timestamp: "12:00",
      id: "abc123",
      level: "info",
      scope: "app",
      message: "hello world",
      meta: { foo: "bar" },
      context: " [ctx]",
      formatterConfig: {},
      normalizerConfig: {},
      raw: { timestamp: 0, id: "", level: "info", scope: [], message: "" },
      cssStyles: {
        timestamp: "",
        id: "",
        level: "",
        scope: "",
        message: "",
        meta: "",
        context: "",
      },
    };

    const result = composeMessage(payload);
    expect(result).toBe("%c12:00%cabc123%cinfo%capp%chello world [ctx]");
  });

  it("should exclude context if it is not a string", () => {
    const payload: BrowserFormattedPayload = {
      timestamp: "12:00",
      id: "abc123",
      level: "info",
      scope: "app",
      message: "hello world",
      meta: " [meta]",
      context: { a: 123 },
      formatterConfig: {},
      normalizerConfig: {},
      raw: { timestamp: 0, id: "", level: "info", scope: [], message: "" },
      cssStyles: {
        timestamp: "",
        id: "",
        level: "",
        scope: "",
        message: "",
        meta: "",
        context: "",
      },
    };

    const result = composeMessage(payload);
    expect(result).toBe("%c12:00%cabc123%cinfo%capp%chello world [meta]");
  });

  it("should exclude both meta and context if neither are strings", () => {
    const payload: BrowserFormattedPayload = {
      timestamp: "12:00",
      id: "abc123",
      level: "info",
      scope: "app",
      message: "hello world",
      meta: { asd: 123 },
      context: { a: 123 },
      formatterConfig: {},
      normalizerConfig: {},
      raw: { timestamp: 0, id: "", level: "info", scope: [], message: "" },
      cssStyles: {
        timestamp: "",
        id: "",
        level: "",
        scope: "",
        message: "",
        meta: "",
        context: "",
      },
    };

    const result = composeMessage(payload);
    expect(result).toBe("%c12:00%cabc123%cinfo%capp%chello world");
  });
});
