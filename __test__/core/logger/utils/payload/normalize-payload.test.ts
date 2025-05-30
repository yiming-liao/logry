import type { RawPayload } from "@/core/logger/types";
import type { NormalizedPayload } from "@/modules/normalizers";
import { normalizePayload } from "@/core/logger/utils/payload/normalize-payload";
import { internalError } from "@/internal";
import { isBrowser, isNode } from "@/shared/utils/platform";

jest.mock("@/shared/utils/platform", () => ({
  isNode: jest.fn(),
  isBrowser: jest.fn(),
}));

jest.mock("@/internal/internal-error", () => ({
  internalError: jest.fn(() => ({ error: true, message: "Unsupported" })),
}));

const rawPayload: RawPayload = {
  timestamp: 0,
  id: "",
  level: "info",
  scope: [],
  message: "",
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

const normalized: NormalizedPayload = {
  timestamp: 1,
  id: "123",
  level: "info",
  scope: "test",
  message: "Hello",
  normalizerConfig: {},
  formatterConfig: {},
  raw: rawPayload,
};

describe("normalizePayload", () => {
  it("should normalize payload as node when running in Node", () => {
    (isNode as jest.Mock).mockReturnValue(true);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const normalize = jest.fn().mockReturnValue(normalized);
    const result = normalizePayload(normalize, rawPayload);

    expect(normalize).toHaveBeenCalledWith("node", rawPayload);
    expect(result).toBe(normalized);
  });

  it("should normalize payload as browser when running in Browser", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(true);

    const normalize = jest.fn().mockReturnValue(normalized);
    const result = normalizePayload(normalize, rawPayload);

    expect(normalize).toHaveBeenCalledWith("browser", rawPayload);
    expect(result).toBe(normalized);
  });

  it("should return internal error when environment is unsupported", () => {
    (isNode as jest.Mock).mockReturnValue(false);
    (isBrowser as jest.Mock).mockReturnValue(false);

    const normalize = jest.fn();
    const result = normalizePayload(normalize, rawPayload);

    expect(normalize).not.toHaveBeenCalled();
    expect(internalError).toHaveBeenCalledWith({
      message: "Unsupported runtime environment",
    });
    expect(result).toEqual({ error: true, message: "Unsupported" });
  });
});
