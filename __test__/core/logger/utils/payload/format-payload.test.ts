import type {
  NodeFormattedPayload,
  BrowserFormattedPayload,
} from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import { formatPayload } from "@/core/logger/utils/payload/format-payload";
import { isNode, isBrowser } from "@/shared/utils/platform";

jest.mock("@/shared/utils/platform", () => ({
  isNode: jest.fn(),
  isBrowser: jest.fn(),
}));

describe("formatPayload", () => {
  const normalizedPayload: NormalizedPayload = {
    level: "info",
    id: "123",
    message: "Test message",
    scope: "test",
    timestamp: Date.now(),
    normalizerConfig: {},
    formatterConfig: {},
    raw: {
      timestamp: 0,
      id: "",
      level: "info",
      scope: [],
      message: "",
    },
  };

  const formattedNode = {
    formatted: "node",
  } as unknown as NodeFormattedPayload;
  const formattedBrowser = {
    formatted: "browser",
  } as unknown as BrowserFormattedPayload;

  const nodeFormatter = {
    platform: "node" as Platform,
    format: jest.fn(() => formattedNode),
  };

  const browserFormatter = {
    platform: "browser" as Platform,
    format: jest.fn(() => formattedBrowser),
  };

  it("should return formatted node payload if in Node and node formatting is enabled", () => {
    (isNode as jest.Mock).mockReturnValue(true);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const result = formatPayload({
      normalizedPayload,
      formatterConfig: { node: { disabled: false } },
      nodeFormatter,
      browserFormatter,
    });

    expect(result).toBe(formattedNode);
    expect(nodeFormatter.format).toHaveBeenCalledWith(normalizedPayload);
  });

  it("should return formatted browser payload if in Browser and browser formatting is enabled", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(true);

    const result = formatPayload({
      normalizedPayload,
      formatterConfig: { browser: { disabled: false } },
      nodeFormatter,
      browserFormatter,
    });

    expect(result).toBe(formattedBrowser);
    expect(browserFormatter.format).toHaveBeenCalledWith(normalizedPayload);
  });

  it("should default to raw payload if no formatter matches the environment", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const result = formatPayload({
      normalizedPayload,
      formatterConfig: {},
      nodeFormatter,
      browserFormatter,
    });

    expect(result).toBe(normalizedPayload);
  });
});
