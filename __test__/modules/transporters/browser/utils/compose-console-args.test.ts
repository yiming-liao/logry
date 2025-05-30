import type { BrowserFormattedPayload } from "@/modules/formatters";
import {
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_META_LINE_BREAKS,
} from "@/modules/formatters/browser/constants";
import { composeConsoleArgs } from "@/modules/transporters/browser/utils/compose-console-args";

const mockPayload: BrowserFormattedPayload = {
  timestamp: "12:00",
  id: "abc123",
  level: "info",
  scope: "app",
  message: "hello world",
  meta: "mock meta",
  context: "mock context",
  cssStyles: {
    timestamp: "style-timestamp",
    id: "style-id",
    level: "style-level",
    scope: "style-scope",
    message: "style-message",
    meta: "style-meta",
    context: "style-context",
  },
  formatterConfig: {
    browser: {
      meta: { lineBreaks: 1 },
      context: { lineBreaks: 2 },
    },
  },
  normalizerConfig: {},
  raw: { timestamp: 0, id: "", level: "info", scope: [], message: "" },
};

describe("composeConsoleArgs", () => {
  it("should return console args with meta and context as strings", () => {
    const result = composeConsoleArgs(mockPayload, "formatted message");

    expect(result).toEqual([
      "formatted message",
      "style-timestamp",
      "style-id",
      "style-level",
      "style-scope",
      "style-message",
      "style-meta",
      "style-context",
    ]);
  });

  it("should return console args with meta and context as objects", () => {
    const payload = {
      ...mockPayload,
      meta: { foo: "bar" },
      context: { baz: "qux" },
    };

    const result = composeConsoleArgs(payload, "formatted message");

    expect(result).toEqual([
      "formatted message",
      "style-timestamp",
      "style-id",
      "style-level",
      "style-scope",
      "style-message",
      "\n", // lineBreaks 1
      { foo: "bar" }, // meta object
      "\n\n", // lineBreaks 2
      { baz: "qux" }, // context object
    ]);
  });

  it("should handle non-string meta", () => {
    const payload = {
      ...mockPayload,
      meta: { foo: "bar" },
    };

    const result = composeConsoleArgs(payload, "msg");
    expect(result).toContainEqual({ foo: "bar" });
  });

  it("should handle missing browser config gracefully", () => {
    const payload = {
      ...mockPayload,
      formatterConfig: {},
      meta: { metaObj: true },
      context: { ctxObj: true },
    };

    const result = composeConsoleArgs(payload, "msg");

    // Default line breaks should be used
    expect(result).toContainEqual("\n".repeat(DEFAULT_META_LINE_BREAKS)); // DEFAULT_META_LINE_BREAKS
    expect(result).toContainEqual("\n".repeat(DEFAULT_CONTEXT_LINE_BREAKS)); // DEFAULT_CONTEXT_LINE_BREAKS
  });
});
